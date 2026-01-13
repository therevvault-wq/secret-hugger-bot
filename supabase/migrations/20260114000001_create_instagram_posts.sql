-- Create instagram_posts table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view instagram posts" ON instagram_posts
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage instagram posts" ON instagram_posts
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('instagram-thumbnails', 'instagram-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'instagram-thumbnails');

CREATE POLICY "Admins can upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'instagram-thumbnails' AND
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete thumbnails" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'instagram-thumbnails' AND
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Trigger for updated_at
CREATE TRIGGER instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at(); -- Reusing existing function if available, or create generic one
