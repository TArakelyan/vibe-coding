-- Добавление поля email в таблицу predictions
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Добавляем колонку email
ALTER TABLE public.predictions
ADD COLUMN IF NOT EXISTS email TEXT;

-- Добавляем комментарий к колонке
COMMENT ON COLUMN public.predictions.email IS 'Email или Telegram пользователя для связи с победителями';

-- Опционально: добавить ограничение на формат email (если нужно)
-- ALTER TABLE public.predictions
-- ADD CONSTRAINT email_format_check 
-- CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

