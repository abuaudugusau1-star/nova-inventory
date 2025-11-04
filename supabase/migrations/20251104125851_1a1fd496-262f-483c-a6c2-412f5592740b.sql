-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on items
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Items policies - users can only manage their own items
CREATE POLICY "Users can view their own items"
  ON public.items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own items"
  ON public.items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items"
  ON public.items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items"
  ON public.items FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to items table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert seed data for demo items
INSERT INTO public.items (user_id, name, quantity, price, category, image_url)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  item_data.name,
  item_data.quantity,
  item_data.price,
  item_data.category,
  item_data.image_url
FROM (VALUES
  ('Golden Apple', 245, 12.99, 'Premium', '/placeholder.svg'),
  ('Purple Grape', 189, 8.50, 'Fresh', '/placeholder.svg'),
  ('Crystal Berry', 56, 24.99, 'Exotic', '/placeholder.svg'),
  ('Solar Orange', 320, 6.75, 'Citrus', '/placeholder.svg'),
  ('Emerald Lime', 150, 5.25, 'Citrus', '/placeholder.svg'),
  ('Ruby Strawberry', 280, 9.99, 'Fresh', '/placeholder.svg'),
  ('Sapphire Blueberry', 195, 11.50, 'Premium', '/placeholder.svg'),
  ('Diamond Pear', 110, 15.75, 'Premium', '/placeholder.svg'),
  ('Amber Peach', 165, 7.99, 'Fresh', '/placeholder.svg'),
  ('Jade Kiwi', 90, 13.25, 'Exotic', '/placeholder.svg')
) AS item_data(name, quantity, price, category, image_url)
WHERE NOT EXISTS (SELECT 1 FROM public.items LIMIT 1);