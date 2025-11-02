-- ============================================
-- Email Signups Table Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor:
-- https://app.supabase.com/project/YOUR_PROJECT/sql
-- ============================================

-- Create the email_signups table
CREATE TABLE IF NOT EXISTS email_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);

-- Add index on created_at for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);

-- Enable Row Level Security
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all records
-- (Optional: only if you want to view the data from authenticated sessions)
CREATE POLICY "Allow authenticated reads"
  ON email_signups
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the table was created successfully:
-- SELECT * FROM email_signups LIMIT 10;
-- ============================================
