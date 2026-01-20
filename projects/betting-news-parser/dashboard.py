"""
Веб-дашборд для мониторинга парсера новостей
"""
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import plotly.graph_objs as go
import plotly.utils
import json
from datetime import datetime, timedelta
from database import db
from loguru import logger

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    """Главная страница дашборда"""
    return render_template('dashboard.html')


@app.route('/api/stats')
def get_stats():
    """API: Получить общую статистику"""
    try:
        stats = db.get_news_stats()
        top_sources = db.get_top_sources(10)
        
        # Получаем общее количество новостей
        with db.get_cursor() as cursor:
            cursor.execute("SELECT COUNT(*) as total FROM news WHERE created_at > NOW() - INTERVAL '24 hours'")
            total_24h = cursor.fetchone()['total']
            
            cursor.execute("SELECT COUNT(*) as total FROM news")
            total_all = cursor.fetchone()['total']
            
            cursor.execute("SELECT COUNT(*) as total FROM sources WHERE is_active = true")
            active_sources = cursor.fetchone()['total']
        
        return jsonify({
            'total_news_24h': total_24h,
            'total_news_all': total_all,
            'active_sources': active_sources,
            'news_by_category': [dict(row) for row in stats],
            'top_sources': [dict(row) for row in top_sources]
        })
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/news')
def get_news():
    """API: Получить список новостей"""
    try:
        limit = int(request.args.get('limit', 50))
        category = request.args.get('category', None)
        
        with db.get_cursor() as cursor:
            if category:
                cursor.execute("""
                    SELECT n.*, s.domain as source_domain
                    FROM news n
                    JOIN sources s ON n.source_id = s.id
                    WHERE n.category = %s
                    ORDER BY n.created_at DESC
                    LIMIT %s
                """, (category, limit))
            else:
                cursor.execute("""
                    SELECT n.*, s.domain as source_domain
                    FROM news n
                    JOIN sources s ON n.source_id = s.id
                    ORDER BY n.created_at DESC
                    LIMIT %s
                """, (limit,))
            
            news = cursor.fetchall()
            
            # Преобразуем datetime в строки
            for item in news:
                if item['published_date']:
                    item['published_date'] = item['published_date'].isoformat()
                if item['created_at']:
                    item['created_at'] = item['created_at'].isoformat()
        
        return jsonify([dict(row) for row in news])
    except Exception as e:
        logger.error(f"Error getting news: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/chart/timeline')
def get_timeline_chart():
    """API: График новостей по времени"""
    try:
        with db.get_cursor() as cursor:
            cursor.execute("""
                SELECT 
                    DATE_TRUNC('hour', created_at) as hour,
                    category,
                    COUNT(*) as count
                FROM news
                WHERE created_at > NOW() - INTERVAL '48 hours'
                GROUP BY hour, category
                ORDER BY hour
            """)
            
            data = cursor.fetchall()
        
        # Группируем по категориям
        categories = {}
        for row in data:
            cat = row['category']
            if cat not in categories:
                categories[cat] = {'x': [], 'y': []}
            
            categories[cat]['x'].append(row['hour'].isoformat())
            categories[cat]['y'].append(row['count'])
        
        # Создаем график
        traces = []
        for cat, vals in categories.items():
            traces.append(go.Scatter(
                x=vals['x'],
                y=vals['y'],
                mode='lines+markers',
                name=cat
            ))
        
        layout = go.Layout(
            title='Новости по времени (последние 48 часов)',
            xaxis={'title': 'Время'},
            yaxis={'title': 'Количество новостей'},
            hovermode='closest'
        )
        
        fig = go.Figure(data=traces, layout=layout)
        return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        
    except Exception as e:
        logger.error(f"Error creating timeline chart: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/chart/categories')
def get_categories_chart():
    """API: Круговая диаграмма по категориям"""
    try:
        stats = db.get_news_stats()
        
        labels = [row['category'] for row in stats]
        values = [row['count'] for row in stats]
        
        fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
        fig.update_layout(title='Распределение новостей по категориям (24ч)')
        
        return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        
    except Exception as e:
        logger.error(f"Error creating categories chart: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/chart/sources')
def get_sources_chart():
    """API: График топ источников"""
    try:
        top_sources = db.get_top_sources(15)
        
        domains = [row['domain'] for row in top_sources]
        counts = [row['news_count'] for row in top_sources]
        
        fig = go.Figure(data=[
            go.Bar(x=domains, y=counts, marker_color='lightblue')
        ])
        fig.update_layout(
            title='Топ-15 источников по количеству новостей',
            xaxis={'title': 'Источник'},
            yaxis={'title': 'Количество новостей'},
            xaxis_tickangle=-45
        )
        
        return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        
    except Exception as e:
        logger.error(f"Error creating sources chart: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/keywords')
def get_keywords():
    """API: Получить топ ключевых слов"""
    try:
        with db.get_cursor() as cursor:
            cursor.execute("""
                SELECT 
                    UNNEST(keywords) as keyword,
                    COUNT(*) as count
                FROM news
                WHERE created_at > NOW() - INTERVAL '24 hours'
                GROUP BY keyword
                ORDER BY count DESC
                LIMIT 30
            """)
            
            keywords = cursor.fetchall()
        
        return jsonify([dict(row) for row in keywords])
    except Exception as e:
        logger.error(f"Error getting keywords: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    logger.info("Starting dashboard on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)



























