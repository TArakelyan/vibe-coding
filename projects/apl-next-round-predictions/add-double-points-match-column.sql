-- Добавление поля double_points_match в таблицу predictions
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Добавляем колонку double_points_match
ALTER TABLE public.predictions
ADD COLUMN IF NOT EXISTS double_points_match TEXT;

-- Добавляем комментарий к колонке
COMMENT ON COLUMN public.predictions.double_points_match IS 'ID матча, выбранного для удвоения очков (match-1, match-2, и т.д.)';

