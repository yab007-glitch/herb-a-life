-- Create storage bucket for herb images
INSERT INTO storage.buckets (id, name, public)
VALUES ('herb-images', 'herb-images', true);

-- Anyone can view herb images
CREATE POLICY "Herb images are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'herb-images');

-- Only admins can upload herb images
CREATE POLICY "Admins can upload herb images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'herb-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can update herb images
CREATE POLICY "Admins can update herb images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'herb-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can delete herb images
CREATE POLICY "Admins can delete herb images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'herb-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
