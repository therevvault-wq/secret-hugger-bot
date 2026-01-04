-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link TEXT DEFAULT '/shop',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Enable RLS on offers
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Blogs policies
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can view all blogs" 
ON public.blogs FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create blogs" 
ON public.blogs FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blogs" 
ON public.blogs FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blogs" 
ON public.blogs FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Offers policies
CREATE POLICY "Anyone can view active offers" 
ON public.offers FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all offers" 
ON public.offers FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create offers" 
ON public.offers FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update offers" 
ON public.offers FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete offers" 
ON public.offers FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
BEFORE UPDATE ON public.offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('offer-images', 'offer-images', true);

-- Storage policies for blog images
CREATE POLICY "Anyone can view blog images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for offer images
CREATE POLICY "Anyone can view offer images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'offer-images');

CREATE POLICY "Admins can upload offer images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'offer-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update offer images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'offer-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete offer images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'offer-images' AND has_role(auth.uid(), 'admin'::app_role));