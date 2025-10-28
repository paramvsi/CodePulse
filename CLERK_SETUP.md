# Clerk Authentication Setup Guide

## Step 1: Create Clerk Account

1. Visit https://clerk.com
2. Sign up for a free account
3. Click "Create Application"
4. Name: `CodePulse`
5. Choose sign-in options (recommended: Email + Google + GitHub)

## Step 2: Get API Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy both keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_`)

## Step 3: Create .env.local File

1. In the project root (`codepulse/`), create `.env.local`
2. Paste your keys:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 4: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Step 5: Test Authentication

Visit these URLs:
- **Sign In**: http://localhost:3002/sign-in
- **Sign Up**: http://localhost:3002/sign-up

You should see beautiful Clerk auth pages with CodePulse branding!

## Features Configured

✅ Custom CodePulse theme (Electric Indigo + Soft Cyan colors)
✅ Protected routes (dashboard, session, analytics, settings)
✅ Public routes (landing page, demo, sign-in, sign-up)
✅ Automatic redirects after authentication
✅ Dark mode matching CodePulse design

## Customization

The Clerk theme is configured in `src/config/clerk-theme.ts` with:
- Electric Indigo (#635BFF) primary color
- Soft Cyan (#35E2D1) for links and accents
- Deep Space (#0E1116) background
- Graphite (#1A1D24) for cards

## Troubleshooting

**Error: Missing API keys**
- Make sure `.env.local` exists in the root (`codepulse/` folder)
- Restart the dev server after adding keys

**Auth pages not styled**
- Check that `clerkTheme` is imported correctly
- Verify dark theme is active in `globals.css`

**Protected routes not working**
- Check `middleware.ts` is in the `src/` folder
- Verify Clerk API keys are correct
