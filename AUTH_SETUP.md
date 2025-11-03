# Authentication Setup Guide

This guide helps you set up Google OAuth and email/password authentication for CreatorKit.

## Email/Password Authentication

Email and password authentication is enabled by default. Users can sign up with any email and password.

### In Production
For production use, you should:
1. Add a database to store user credentials
2. Hash passwords using bcrypt
3. Implement proper user validation
4. Add email verification

## Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web Application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

### Step 2: Add Credentials to Environment

Add these to your `.env.local`:

\`\`\`bash
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000  # or your production URL
\`\`\`

### Step 3: Generate NEXTAUTH_SECRET

Generate a random secret for production:

\`\`\`bash
openssl rand -base64 32
\`\`\`

## Authentication Flow

1. Users can sign up with email/password or Google OAuth
2. JWT tokens are stored in secure httpOnly cookies
3. Sessions expire after 30 days
4. Protected routes redirect to login if not authenticated
5. Dashboard is only accessible to authenticated users

## Protected Routes

The following routes are protected and require authentication:
- `/dashboard`
- `/tools/*`

## Callback URL

After authentication, users are redirected to:
- `/dashboard` for successful login
- `/login` (with error message) for failed login

## Development vs Production

### Development
- Use `http://localhost:3000`
- Credentials can be stored in `.env.local`
- Email/password auth works without database

### Production
- Use HTTPS with your domain
- Set `NEXTAUTH_URL` to your production domain
- Integrate with a real database for user storage
- Keep secrets in environment variables (never commit to git)

## Troubleshooting

### "Callback URL mismatch"
- Ensure redirect URIs in Google Console exactly match your application's callback URLs
- Check `NEXTAUTH_URL` environment variable

### "Session not found"
- Clear browser cookies
- Ensure `NEXTAUTH_SECRET` is set
- Check that NextAuth is properly configured

### Users not persisting
- For email/password: implement database integration
- For Google OAuth: users are created automatically on first login
