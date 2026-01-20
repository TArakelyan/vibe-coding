-- Исправление колонки betsity_id в таблице predictions
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Убираем ограничение NOT NULL с колонки betsity_id (теперь используется phone)
ALTER TABLE public.predictions
ALTER COLUMN betsity_id DROP NOT NULL;

-- Опционально: можно добавить комментарий, что поле устарело
COMMENT ON COLUMN public.predictions.betsity_id IS 'Устаревшее поле. Используйте phone вместо этого.';

