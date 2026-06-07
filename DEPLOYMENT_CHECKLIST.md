# Deployment Checklist ✅

Complete this checklist before deploying to production.

## Pre-Deployment

### Code Quality
- [x] All lint errors fixed (9 errors resolved)
- [x] Frontend builds successfully
- [x] No console errors in development
- [x] Backend syntax validated
- [x] ESLint passes (zero errors)

### Configuration Files Created
- [x] `firebase.json` - Firebase hosting configuration
- [x] `.firebaserc` - Firebase project configuration
- [x] `.firebaseignore` - Firebase ignore rules
- [x] `.vercelignore` - Vercel ignore rules
- [x] `vercel.json` - Vercel backend configuration (already existed)
- [x] `DEPLOYMENT_GUIDE.md` - Comprehensive deployment instructions
- [x] `deploy.sh` - Helper script for deployments

## Backend Deployment (Vercel)

### Before Deploying
- [ ] Create Vercel account at https://vercel.com
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a MongoDB database and get connection string
- [ ] Create Firebase service account (for email notifications)
- [ ] Get Firebase service account credentials (JSON file)
- [ ] Prepare SMTP credentials for email notifications

### Environment Variables to Set on Vercel
```
MONGODB_URI              # MongoDB connection string
NODE_ENV                 # Set to "production"
FIREBASE_TYPE            # From service account JSON
FIREBASE_PROJECT_ID      # Your Firebase project ID
FIREBASE_PRIVATE_KEY_ID  # From service account JSON
FIREBASE_PRIVATE_KEY     # From service account JSON
FIREBASE_CLIENT_EMAIL    # From service account JSON
FIREBASE_CLIENT_ID       # From service account JSON
FIREBASE_AUTH_URI        # From service account JSON
FIREBASE_TOKEN_URI       # From service account JSON
FIREBASE_AUTH_PROVIDER_CERT_URL  # From service account JSON
FIREBASE_CLIENT_CERT_URL # From service account JSON
SMTP_HOST                # e.g., smtp.gmail.com
SMTP_PORT                # e.g., 587
SMTP_USER                # Your email address
SMTP_PASS                # App password (not regular password)
```

### Deployment Steps
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Navigate to backend: `cd backend`
- [ ] Deploy: `vercel` (first time) or `vercel --prod` (production)
- [ ] Set all environment variables in Vercel dashboard
- [ ] Test API endpoints after deployment
- [ ] Save backend URL (e.g., https://portfolio-backend.vercel.app)

### Post-Backend Deployment
- [ ] Test API health check: `GET /api/health` or similar
- [ ] Verify MongoDB connection
- [ ] Check CORS settings allow frontend domain
- [ ] Monitor Vercel logs for errors

## Frontend Deployment (Firebase)

### Before Deploying
- [ ] Create Firebase account at https://firebase.google.com
- [ ] Create Firebase project called "portfolio"
- [ ] Enable Firebase Hosting
- [ ] Get Firebase configuration (API keys, project ID, etc.)
- [ ] Update `.firebaserc` with your Firebase project ID
- [ ] Update `frontend/.env.production` or similar with:
  - Firebase config values
  - Backend API URL: `https://portfolio-backend.vercel.app/api`

### Environment Variables for Frontend
```
VITE_API_URL                    # https://portfolio-backend.vercel.app/api
VITE_FIREBASE_API_KEY           # From Firebase Console
VITE_FIREBASE_AUTH_DOMAIN       # Your Firebase domain
VITE_FIREBASE_PROJECT_ID        # Your Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET    # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID  # From Firebase Console
VITE_FIREBASE_APP_ID            # From Firebase Console
```

### Deployment Steps
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login to Firebase: `firebase login`
- [ ] Navigate to frontend: `cd frontend`
- [ ] Build: `npm run build`
- [ ] Deploy: `firebase deploy --only hosting`
- [ ] Save frontend URL (e.g., https://portfolio-xxxxx.web.app)

### Post-Frontend Deployment
- [ ] Visit deployed URL and verify it loads
- [ ] Test navigation between sections
- [ ] Test contact form (should communicate with backend)
- [ ] Test API calls (projects, skills, etc.)
- [ ] Check dark/light theme toggle
- [ ] Test on mobile devices
- [ ] Check console for errors

## Integration Testing

- [ ] Contact form submission works end-to-end
- [ ] API calls from frontend reach backend successfully
- [ ] Email notifications send correctly
- [ ] Database queries return correct data
- [ ] Authentication works if implemented
- [ ] All images load correctly
- [ ] CSS and animations display properly
- [ ] No CORS errors in browser console

## Performance & Security

- [ ] Frontend Lighthouse score > 90
- [ ] Gzip compression enabled
- [ ] Security headers set (Firebase/Vercel default)
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly used
- [ ] HTTPS enforced on both domains
- [ ] Cross-site scripting (XSS) prevention in place

## Monitoring & Maintenance

- [ ] Set up Vercel alerts for 5xx errors
- [ ] Set up Firebase alerts for high traffic
- [ ] Monitor MongoDB quota usage
- [ ] Monitor Firebase Hosting quota usage
- [ ] Check logs weekly for errors
- [ ] Keep dependencies updated

## Rollback Plan

If something goes wrong:
- [ ] Use `vercel rollback` to revert backend
- [ ] Use `firebase hosting:channel:deploy preview-channel` for frontend
- [ ] Keep previous deployment URLs documented
- [ ] Test rollback before going live

## Domain Configuration (Optional)

- [ ] Buy custom domain (e.g., yourname.com)
- [ ] Connect domain to Firebase Hosting
- [ ] Connect subdomain to Vercel (e.g., api.yourname.com)
- [ ] Update `VITE_API_URL` to use custom domain
- [ ] Test SSL certificates are valid
- [ ] Verify redirects work (www → non-www)

## Documentation

- [ ] Update README with deployment instructions
- [ ] Document any custom configurations
- [ ] Create runbook for common issues
- [ ] Record deployment dates and versions

## Final Steps

- [ ] Share deployed URLs with stakeholders
- [ ] Create backup of `.env` files (keep secure)
- [ ] Set up monitoring dashboard
- [ ] Schedule post-deployment review meeting

---

## Quick Deployment Command

Once everything is set up, you can use:

```bash
bash deploy.sh
```

Or deploy manually:

```bash
# Frontend
cd frontend
npm run build
firebase deploy --only hosting

# Backend
cd backend
vercel --prod
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Firebase Docs**: https://firebase.google.com/docs/hosting
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **DEPLOYMENT_GUIDE.md**: See detailed deployment guide in project root

---

**Last Updated**: 2026-06-07
**Status**: Ready for Deployment ✅
