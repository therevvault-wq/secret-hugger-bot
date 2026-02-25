-- Add whatsapp_enabled column to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN DEFAULT false;
