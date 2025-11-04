# CreatorKit Deployment Guide

## Quick Start - Vercel Deployment

### 1. Prerequisites
- GitHub account with your CreatorKit repo
- Vercel account (free tier available)
- Google Cloud project with OAuth credentials

### 2. Deploy to Vercel

\`\`\`bash
# 1. Push your code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com and import your repository
# 3. Configure environment variables (see below)
# 4. Click Deploy
\`\`\`

### 3. Environment Variables in Vercel

Add these in Vercel Project Settings → Environment Variables:

\`\`\`
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<your-generated-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
OPENROUTER_API_KEY=<your-openrouter-key>
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### 4. Update Google OAuth Redirect URIs

In Google Cloud Console:
1. Go to APIs & Services → Credentials
2. Find your OAuth 2.0 Client ID
3. Click Edit
4. Add authorized redirect URI:
   \`https://your-domain.com/api/auth/callback/google\`
5. Save

### 5. Deploy

Click the Deploy button and wait for build to complete. Your app will be live!

## Production Checklist

- [ ] NEXTAUTH_SECRET is set (strong random value)
- [ ] NEXTAUTH_URL matches your domain
- [ ] Google OAuth credentials are valid
- [ ] Redirect URIs are updated in Google Console
- [ ] AI API keys are configured
- [ ] Environment variables marked as sensitive in Vercel
- [ ] Custom domain is configured (optional)
- [ ] SSL certificate is valid (automatic with Vercel)

## Monitoring & Debugging

### Check Deployment Status
- Visit your Vercel dashboard
- Click on deployment to see logs
- Check for any build errors

### Debug Production Issues
1. Check Vercel Function logs (Vercel Dashboard → Deployments → Logs)
2. Check browser console for client-side errors
3. Look for auth errors: Navigate to `/api/auth/signin` to test endpoint
4. Verify environment variables are set in Vercel

### Common Production Issues

**Issue**: "Internal Server Error" on login
- **Fix**: Ensure NEXTAUTH_SECRET is set in Vercel
- **Debug**: Check Function logs for errors

**Issue**: Google OAuth not working
- **Fix**: Verify redirect URI in Google Console matches production domain
- **Debug**: Check browser console for error details

**Issue**: Dashboard not accessible after login
- **Fix**: Clear browser cookies and try again
- **Debug**: Check Vercel Function logs for session errors

## Scaling & Performance

- Vercel automatically scales based on traffic
- Edge caching is enabled for static assets
- Database queries are optimized
- No additional configuration needed for small traffic

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Next-Auth Production](https://next-auth.js.org/deployment)
