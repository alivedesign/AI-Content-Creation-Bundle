# Supabase Setup Instructions

## Quick Setup (2 minutes)

### Step 1: Create the Table

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/iqammqiqrhrhqryntzne/sql/new

2. **Copy and paste this SQL**:

```sql
-- Create the email_signups table
CREATE TABLE IF NOT EXISTS email_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);

-- Enable Row Level Security
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow public to insert emails
CREATE POLICY "Allow public inserts"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view emails
CREATE POLICY "Allow authenticated reads"
  ON email_signups
  FOR SELECT
  TO authenticated
  USING (true);
```

3. **Click "Run"** (or press Cmd/Ctrl + Enter)

4. **Verify**: You should see "Success. No rows returned"

### Step 2: Test Your Setup

After creating the table, restart your dev server:

```bash
npm run dev
```

Then test the form on your website. Submitted emails will appear in your Supabase table!

### View Your Data

Go to: https://supabase.com/dashboard/project/iqammqiqrhrhqryntzne/editor (Table Editor)

Select `email_signups` table to see all submitted emails.

---

## ✅ What's Already Done

- ✅ Supabase client installed
- ✅ Environment variables configured
- ✅ Form submission code updated
- ✅ Source tracking implemented (hero vs solution form)

## 🔄 What You Need to Do

- ⏳ Run the SQL above to create the table (takes 10 seconds)
- ⏳ Restart dev server
- ⏳ Test the forms!
