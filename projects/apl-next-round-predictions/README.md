# Прогноз на точный счёт - АПЛ

## Описание

Интерактивная форма для сбора прогнозов на точный счёт матчей следующего тура Английской Премьер-лиги (АПЛ). Пользователи могут сделать прогноз на точный счёт для 5 матчей тура, указать свой никнейм и ID в букмекерской конторе БЕТСИТИ.

Форма выполнена в стилистике Sports.ru и готова к встраиванию через iframe на любом сайте.

## Особенности

- **Интерактивная форма** с выбором точного счёта для каждого матча
- **Валидация данных** в реальном времени
- **Интеграция с Supabase** для сохранения прогнозов
- **Адаптивный дизайн** в стилистике Sports.ru
- **Встраивание через iframe** для использования на внешних сайтах
- **Автоматическое изменение размера** iframe при изменении содержимого

## Технические детали

### Поля формы:

1. **Никнейм пользователя** - текстовое поле (обязательное, до 50 символов)
2. **Прогноз на точный счёт** - выбор из предустановленных вариантов для каждого из 5 матчей
3. **ID в БЕТСИТИ** - числовое поле (обязательное, только цифры)

### Возможные счета:

- 0:0, 0:1, 0:2, 0:3
- 1:0, 1:1, 1:2, 1:3
- 2:0, 2:1, 2:2, 2:3
- 3:0, 3:1, 3:2, 3:3
- 4:0, 4:1, 4:2
- 5:0, 5:1
- 6:0

### Настройка Supabase:

**ВАЖНО:** Перед использованием формы необходимо создать таблицу в Supabase.

1. Откройте ваш проект в Supabase Dashboard (https://supabase.com/dashboard)
2. Перейдите в раздел **SQL Editor**
3. Выполните следующий SQL скрипт:

```sql
-- Создание таблицы predictions
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    betsity_id TEXT NOT NULL,
    match_1_score TEXT,
    match_2_score TEXT,
    match_3_score TEXT,
    match_4_score TEXT,
    match_5_score TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_predictions_username ON public.predictions(username);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON public.predictions(created_at);

-- Включение Row Level Security
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Политика для разрешения вставки данных (INSERT) для всех пользователей
CREATE POLICY "Allow public insert" ON public.predictions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Политика для разрешения чтения данных (SELECT) для всех пользователей
CREATE POLICY "Allow public select" ON public.predictions
    FOR SELECT
    TO anon, authenticated
    USING (true);
```

### Структура данных в Supabase:

Таблица `predictions` содержит следующие поля:
- `id` (uuid, primary key) - уникальный идентификатор записи
- `username` (text) - никнейм пользователя
- `email` (text) - email пользователя для связи с победителями
- `betsity_id` (text) - ID в БЕТСИТИ
- `match_1_score` (text) - счёт первого матча (формат: X:Y)
- `match_2_score` (text) - счёт второго матча
- `match_3_score` (text) - счёт третьего матча
- `match_4_score` (text) - счёт четвёртого матча
- `match_5_score` (text) - счёт пятого матча
- `created_at` (timestamp) - дата и время создания записи

### Добавление поля email:

Если таблица уже создана без поля email, выполните SQL скрипт из файла `add-email-column.sql` в SQL Editor Supabase.

## Использование

### Обновление данных о матчах:

Данные о матчах хранятся в файле `data/matches.js`. Для обновления списка матчей необходимо отредактировать этот файл.

### Встраивание формы:

Форма готова к встраиванию через iframe. Используйте следующий код:

```html
<iframe 
  class="auto-height" 
  height="668" 
  id="special-project-apl-next-round-predictions" 
  src="https://vibe-coding-blush.vercel.app/projects/apl-next-round-predictions/index.html" 
  style="border: 0px;" 
  width="100%">
</iframe>
<iframe 
  class="iframe-video" 
  height="0" 
  src="/picker/resize/" 
  style="height: 0px; display:none;" 
  width="730">
</iframe>
```

## Конфигурация

Форма использует следующие настройки Supabase:
- **URL**: `https://bmhsphumoyxoftuevwkr.supabase.co`
- **API Key**: указан в файле `script.js`

