// Figma API Helper
// Использование: node figma-helper.js [fileId] [nodeId]

const https = require('https');
const fs = require('fs');

const FIGMA_TOKEN = 'figd_KuMWwJhQFHbvwuqjVMaG_F0Eo1shno_fAPpOWf-N';

async function getFigmaFile(fileId, nodeId = null) {
    return new Promise((resolve, reject) => {
        const url = nodeId 
            ? `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`
            : `https://api.figma.com/v1/files/${fileId}`;
            
        const options = {
            headers: {
                'X-Figma-Token': FIGMA_TOKEN
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function exportFigmaImage(fileId, nodeId, format = 'png', scale = 2) {
    return new Promise((resolve, reject) => {
        const url = `https://api.figma.com/v1/images/${fileId}?ids=${nodeId}&format=${format}&scale=${scale}`;
        
        const options = {
            headers: {
                'X-Figma-Token': FIGMA_TOKEN
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Основная функция
async function main() {
    const args = process.argv.slice(2);
    const fileId = args[0] || 'xMgRBJN5wvmvB7s0miwHmM';
    const nodeId = args[1];

    try {
        console.log('🔍 Получаем данные из Figma...');
        
        if (nodeId) {
            // Получаем конкретный узел
            const nodeData = await getFigmaFile(fileId, nodeId);
            console.log('📄 Данные узла:', JSON.stringify(nodeData, null, 2));
            
            // Экспортируем изображение
            console.log('🖼️  Экспортируем изображение...');
            const imageData = await exportFigmaImage(fileId, nodeId);
            console.log('🔗 Ссылка на изображение:', imageData.images[nodeId]);
        } else {
            // Получаем весь файл
            const fileData = await getFigmaFile(fileId);
            console.log('📁 Структура файла:');
            console.log('- Название:', fileData.name);
            console.log('- Версия:', fileData.version);
            console.log('- Страницы:', fileData.document.children.map(page => ({
                name: page.name,
                id: page.id,
                children: page.children?.length || 0
            })));
        }
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }
}

if (require.main === module) {
    main();
}

module.exports = { getFigmaFile, exportFigmaImage };














































































