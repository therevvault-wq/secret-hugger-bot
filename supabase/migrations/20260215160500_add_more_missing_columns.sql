-- Add stock_status and shipping_cost columns if they don't exist
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'in_stock',
ADD COLUMN IF NOT EXISTS shipping_cost NUMERIC(10,2) DEFAULT NULL;

COMMENT ON COLUMN public.products.stock_status IS 'Product stock status (in_stock, out_of_stock, pre_order)';
COMMENT ON COLUMN public.products.shipping_cost IS 'Shipping cost override for the product';
