-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#10b981',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dishes table
CREATE TABLE public.dishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  rating DECIMAL(2,1) DEFAULT 4.5,
  is_available BOOLEAN DEFAULT true,
  is_special BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dish_tags junction table
CREATE TABLE public.dish_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dish_id UUID REFERENCES public.dishes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  UNIQUE(dish_id, tag_id)
);

-- Create admin_users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dish_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for menu display)
CREATE POLICY "Categories are publicly readable" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Tags are publicly readable" 
ON public.tags FOR SELECT 
USING (true);

CREATE POLICY "Dishes are publicly readable" 
ON public.dishes FOR SELECT 
USING (true);

CREATE POLICY "Dish tags are publicly readable" 
ON public.dish_tags FOR SELECT 
USING (true);

-- Create policies for admin users (only authenticated users can read admin data)
CREATE POLICY "Admin users can read their own data" 
ON public.admin_users FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Admin can manage all data (will implement proper admin check later)
CREATE POLICY "Authenticated users can manage categories" 
ON public.categories FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage tags" 
ON public.tags FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage dishes" 
ON public.dishes FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage dish tags" 
ON public.dish_tags FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dishes_updated_at
  BEFORE UPDATE ON public.dishes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name_en, name_hi, slug, display_order) VALUES
('All', 'सभी', 'all', 0),
('Starters', 'स्टार्टर', 'starters', 1),
('Thali', 'थाली', 'thali', 2),
('Tandoor', 'तंदूर', 'tandoor', 3),
('Curries', 'करी', 'curries', 4),
('Rice & Bread', 'चावल रोटी', 'rice-bread', 5),
('Drinks', 'ड्रिंक्स', 'drinks', 6),
('Sweets', 'मिठाई', 'sweets', 7);

-- Insert default tags
INSERT INTO public.tags (name, color) VALUES
('Veg', '#10b981'),
('Non-Veg', '#ef4444'),
('Spicy', '#f59e0b'),
('Mild', '#06b6d4'),
('Popular', '#8b5cf6'),
('New', '#f97316');

-- Create storage bucket for dish images
INSERT INTO storage.buckets (id, name, public) VALUES ('dish-images', 'dish-images', true);

-- Create storage policies
CREATE POLICY "Dish images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'dish-images');

CREATE POLICY "Authenticated users can upload dish images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'dish-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update dish images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'dish-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete dish images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'dish-images' AND auth.uid() IS NOT NULL);