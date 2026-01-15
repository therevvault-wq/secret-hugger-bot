-- Add product_type column to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS product_type TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN public.products.product_type IS 'Product type categorization: Aesthetics or Performance';
