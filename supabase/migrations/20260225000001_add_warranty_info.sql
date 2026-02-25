-- Add warranty_info column to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS warranty_info TEXT;
