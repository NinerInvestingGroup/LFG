# Manual Email Verification Guide

If you need to manually verify a user's email address in Supabase (for testing or if there are issues with the automated verification), here are the steps:

## Method 1: Using Supabase Dashboard

1. **Log into Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Sign in to your project
   - Navigate to your LFG project

2. **Access Authentication Users**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab
   - Find the user by email address

3. **Edit User Record**
   - Click on the user you want to verify
   - In the user details, look for the "email_confirmed_at" field
   - If it's `null`, this means the email is not verified
   - Set `email_confirmed_at` to the current timestamp
   - Format: `2024-01-XX XX:XX:XX.XXXXXX+00` (current UTC timestamp)
   - Click "Save" to apply changes

## Method 2: Using SQL Editor

1. **Open SQL Editor**
   - In Supabase Dashboard, click "SQL Editor"
   - Create a new query

2. **Run Verification Query**
   ```sql
   -- Replace 'user@example.com' with the actual email
   UPDATE auth.users 
   SET email_confirmed_at = NOW()
   WHERE email = 'user@example.com';
   ```

3. **Verify the Update**
   ```sql
   -- Check if the user is now verified
   SELECT id, email, email_confirmed_at 
   FROM auth.users 
   WHERE email = 'user@example.com';
   ```

## Method 3: Programmatic Update (Development Only)

⚠️ **Warning: Only use this in development environments**

```javascript
import { createClient } from '@supabase/supabase-js'

// This requires service role key (not anon key)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key, not anon key
)

async function manuallyVerifyUser(email) {
  const { data, error } = await supabase.auth.admin.updateUserById(
    'user-id-here', // Get this from auth.users table
    { email_confirm: true }
  )
  
  if (error) {
    console.error('Error verifying user:', error)
  } else {
    console.log('User verified successfully:', data)
  }
}
```

## Current User Verification Issue

**Problem**: User signed up but email verification failed due to missing callback handler
**Solution Applied**: 
1. ✅ Fixed `/auth/callback` route
2. ✅ Added resend verification email functionality  
3. ✅ Created verification page at `/auth/verify-email`

**To resolve for existing user**:
1. Use Method 1 or 2 above to manually verify the user
2. Or have the user try the "Resend Verification Email" feature on the login page
3. The new verification email will use the fixed callback handler

## Testing the Fix

After manually verifying a user OR after they complete email verification:

1. **Test Login Flow**:
   - User goes to `/auth/login`
   - Enters verified email and password
   - Should successfully log in and redirect to `/dashboard`

2. **Test Signup Flow** (for new users):
   - User goes to `/auth/signup`  
   - Fills out form and submits
   - Redirected to `/auth/verify-email?email=...`
   - Receives verification email
   - Clicks link → Goes to `/auth/callback` → Redirected to `/dashboard?confirmed=true`
   - Sees success banner: "Welcome to LFG! Your email has been confirmed successfully. 🎉"

## Verification Flow URLs

- **Signup** → `/auth/verify-email?email=user@example.com`
- **Email Link** → `/auth/callback?code=...` → `/dashboard?confirmed=true`
- **Login with unverified** → Shows verification helper with link to `/auth/verify-email`
- **Resend verification** → Uses `resendVerificationEmail()` function

## Troubleshooting

**If verification emails still don't work**:
1. Check Supabase email settings in Authentication > Settings
2. Verify Site URL and Redirect URLs are correct
3. Check email templates in Supabase
4. Look at Supabase logs for email delivery issues

**If callback still fails**:
1. Check browser network tab for `/auth/callback` requests
2. Verify the callback route is working: `app/auth/callback/route.ts`
3. Check for any console errors
4. Verify environment variables are set correctly