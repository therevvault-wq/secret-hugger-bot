-- Create user_vehicles table
CREATE TABLE IF NOT EXISTS user_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  nickname TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_user_vehicles_user_id ON user_vehicles(user_id);

-- Enable Row Level Security
ALTER TABLE user_vehicles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own vehicles" ON user_vehicles;
DROP POLICY IF EXISTS "Users can insert their own vehicles" ON user_vehicles;
DROP POLICY IF EXISTS "Users can update their own vehicles" ON user_vehicles;
DROP POLICY IF EXISTS "Users can delete their own vehicles" ON user_vehicles;

-- Policy: Users can view their own vehicles
CREATE POLICY "Users can view their own vehicles"
  ON user_vehicles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own vehicles
CREATE POLICY "Users can insert their own vehicles"
  ON user_vehicles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own vehicles
CREATE POLICY "Users can update their own vehicles"
  ON user_vehicles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own vehicles
CREATE POLICY "Users can delete their own vehicles"
  ON user_vehicles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS user_vehicles_updated_at ON user_vehicles;
DROP FUNCTION IF EXISTS update_user_vehicles_updated_at();

CREATE OR REPLACE FUNCTION update_user_vehicles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_vehicles_updated_at
  BEFORE UPDATE ON user_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_vehicles_updated_at();
