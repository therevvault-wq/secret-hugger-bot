-- =====================================================
-- Manual Fix for Product Table Columns
-- Run this in Supabase SQL Editor to fix admin "add product" errors
-- =====================================================

-- 1. Add missing columns (Safe to run if they already exist)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS images TEXT[],
ADD COLUMN IF NOT EXISTS compatible_vehicles TEXT,
ADD COLUMN IF NOT EXISTS delivery_timeline TEXT,
ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'in_stock',
ADD COLUMN IF NOT EXISTS shipping_cost NUMERIC(10,2) DEFAULT NULL;

-- 2. Add comments for clarity
COMMENT ON COLUMN public.products.images IS 'Gallery images for the product';
COMMENT ON COLUMN public.products.compatible_vehicles IS 'Comma-separated list of compatible vehicles';
COMMENT ON COLUMN public.products.delivery_timeline IS 'Estimated delivery timeline';
COMMENT ON COLUMN public.products.stock_status IS 'Product stock status (in_stock, out_of_stock, pre_order)';
COMMENT ON COLUMN public.products.shipping_cost IS 'Shipping cost override for the product';

-- 3. Verify Product Type column (just in case)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS product_type TEXT;

COMMENT ON COLUMN public.products.product_type IS 'Product type categorization: Aesthetics or Performance';

-- DONE!
