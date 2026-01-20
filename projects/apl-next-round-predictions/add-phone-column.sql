-- Добавление поля phone в таблицу predictions
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Добавляем колонку phone
ALTER TABLE public.predictions
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Добавляем комментарий к колонке
COMMENT ON COLUMN public.predictions.phone IS 'Номер телефона, к которому привязан аккаунт в БК БЕТСИТИ';

-- Опционально: добавить ограничение на формат телефона (если нужно)
-- ALTER TABLE public.predictions
-- ADD CONSTRAINT phone_format_check 
-- CHECK (phone ~* '^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$');

