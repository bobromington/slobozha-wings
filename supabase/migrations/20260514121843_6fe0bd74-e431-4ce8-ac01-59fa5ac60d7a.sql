-- Create a public storage bucket for resume uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Allow anyone to upload files to the resumes bucket
CREATE POLICY "Allow anonymous uploads to resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow public read access so email recipients can download resumes
CREATE POLICY "Allow public read of resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');
