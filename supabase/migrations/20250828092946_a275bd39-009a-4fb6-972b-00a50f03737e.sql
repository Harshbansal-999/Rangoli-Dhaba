-- Create storage bucket for offer banners
INSERT INTO storage.buckets (id, name, public) VALUES ('offer-banners', 'offer-banners', true);

-- Create storage policies for offer banner uploads
CREATE POLICY "Offer banner images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'offer-banners');

CREATE POLICY "Authenticated users can upload offer banners" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'offer-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update offer banners" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'offer-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete offer banners" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'offer-banners' AND auth.uid() IS NOT NULL);