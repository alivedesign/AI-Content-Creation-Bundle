# Vercel Environment Variables Setup

## Required Environment Variables

Add these environment variables to your Vercel project to enable Supabase integration:

### 1. VITE_SUPABASE_URL
```
https://iqammqiqrhrhqryntzne.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxYW1tcWlxcmhyaHFyeW50em5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNDk0NzUsImV4cCI6MjA3NzYyNTQ3NX0.9IaRh3f0VOSi05pJrtAjkZWt7auiiHh10y1wwnfmX_A
```

## How to Add Environment Variables to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **AI content creation Bundle**
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter the variable name (e.g., `VITE_SUPABASE_URL`)
   - Enter the value
   - Select all environments: **Production**, **Preview**, and **Development**
   - Click **Save**
5. Repeat for the second variable
6. **Redeploy** your project:
   - Go to the **Deployments** tab
   - Click the three dots (⋯) next to the latest deployment
   - Click **Redeploy**

### Method 2: Via Vercel CLI

```bash
# Login to Vercel
npx vercel login

# Link your project
npx vercel link

# Add environment variables
npx vercel env add VITE_SUPABASE_URL production
# When prompted, paste: https://iqammqiqrhrhqryntzne.supabase.co

npx vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, paste the anon key above

# Repeat for preview and development environments
npx vercel env add VITE_SUPABASE_URL preview
npx vercel env add VITE_SUPABASE_URL development
npx vercel env add VITE_SUPABASE_ANON_KEY preview
npx vercel env add VITE_SUPABASE_ANON_KEY development

# Deploy
npx vercel --prod
```

## Why This Is Needed

- The `.env` file is only used for local development and is **not** pushed to GitHub (it's in `.gitignore`)
- Vercel needs these environment variables to build and run your app in production
- Without these variables:
  - The Supabase client will fail to initialize
  - Form submissions will fail silently
  - The confirmation modal won't appear
  - No emails will be saved to the database

## Verification

After adding the environment variables and redeploying:

1. Visit your production site
2. Submit an email via the form
3. You should see the confirmation modal
4. Check your Supabase dashboard to verify the email was saved to `email_submissions` table

## Troubleshooting

If the form still doesn't work after adding environment variables:

1. Make sure you **redeployed** after adding the variables
2. Check the browser console for errors (F12 → Console tab)
3. Verify the environment variable names are exactly:
   - `VITE_SUPABASE_URL` (with VITE_ prefix)
   - `VITE_SUPABASE_ANON_KEY` (with VITE_ prefix)
4. Ensure you selected all environments when adding variables

## Project Information

- **GitHub Repository**: https://github.com/alivedesign/AI-Content-Creation-Bundle
- **Supabase Project ID**: iqammqiqrhrhqryntzne
- **Database Table**: email_submissions
