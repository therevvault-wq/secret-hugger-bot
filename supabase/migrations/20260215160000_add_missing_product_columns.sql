-- Add missing columns to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS images TEXT[],
ADD COLUMN IF NOT EXISTS compatible_vehicles TEXT,
ADD COLUMN IF NOT EXISTS delivery_timeline TEXT;

-- Add comments
COMMENT ON COLUMN public.products.images IS 'Gallery images for the product';
COMMENT ON COLUMN public.products.compatible_vehicles IS 'Comma-separated list of compatible vehicles';
COMMENT ON COLUMN public.products.delivery_timeline IS 'Estimated delivery timeline';
