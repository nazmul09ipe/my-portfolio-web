# Deployment Guide

This guide covers deploying your portfolio backend to Vercel and frontend to Firebase.

## Prerequisites

### For Vercel (Backend)
- Vercel account (sign up at https://vercel.com)
- Vercel CLI: `npm install -g vercel`
- MongoDB Atlas account (for database)

### For Firebase (Frontend)
- Firebase account (sign up at https://firebase.google.com)
- Firebase CLI: `npm install -g firebase-tools`

## Backend Deployment (Vercel)

### Step 1: Prepare Environment Variables

Your backend needs these environment variables on Vercel:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-cert-url
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 2: Deploy Backend to Vercel

```bash
cd backend

# Login to Vercel (if not already logged in)
vercel login

# Deploy (first time)
vercel

# Answer the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account/organization
# - Link to existing project? No (for first deployment)
# - Project name: portfolio-backend
# - Which directory: ./
# - Modify vercel.json? No

# Add environment variables
vercel env add MONGODB_URI
vercel env add NODE_ENV
# ... add other environment variables

# Redeploy with environment variables
vercel
```

**Your backend URL will be something like:** `https://portfolio-backend.vercel.app`

### Step 3: Update Frontend API URL

Update `frontend/src/services/api.js` or environment variables:

```bash
VITE_API_URL=https://portfolio-backend.vercel.app/api
```

---

## Frontend Deployment (Firebase)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Create Project"
3. Enter project name: "portfolio"
4. Continue through setup
5. Enable Hosting:
   - Go to "Hosting" in left sidebar
   - Click "Get Started"
   - Install Firebase CLI: `npm install -g firebase-tools`

### Step 2: Prepare Frontend Environment Variables

Create `.env.production` in the frontend directory:

```
VITE_API_URL=https://portfolio-backend.vercel.app/api
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=portfolio-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=portfolio-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

Get these values from Firebase Console > Project Settings > Your apps.

### Step 3: Initialize Firebase in Frontend Directory

```bash
cd frontend

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Answer the prompts:
# - Use existing project? Yes
# - Select project: portfolio
# - What do you want to use as your public directory? dist
# - Configure as single-page app? Yes
# - Overwrite firebase.json? No
# - Enable automatic builds and deploys? No (or Yes if using GitHub)
```

### Step 4: Build and Deploy Frontend

```bash
cd frontend

# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Or from root with both environments:
firebase deploy
```

**Your frontend URL will be:** `https://portfolio-xxxxx.web.app`

---

## Continuous Deployment (Optional)

### GitHub Integration for Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

### GitHub Integration for Firebase

1. Connect Firebase to your GitHub repo via Firebase Console
2. Set up automatic deploys on push to main branch

---

## Monitoring & Debugging

### Vercel Backend
```bash
# View logs
vercel logs portfolio-backend

# View environment variables
vercel env list

# Redeploy
vercel --prod
```

### Firebase Frontend
```bash
# View deployment history
firebase hosting:channel:list

# View logs
firebase hosting:log

# Rollback to previous version
firebase hosting:channel:deploy preview-channel
```

---

## Troubleshooting

### Backend Issues
- **503 Service Unavailable**: MongoDB connection issue - check `MONGODB_URI`
- **404 API routes**: Ensure routes are properly configured in `vercel.json`
- **CORS errors**: Check CORS middleware in `backend/src/app.js`

### Frontend Issues
- **Blank page**: Check `VITE_API_URL` environment variable
- **API calls failing**: Verify backend URL is accessible
- **Firebase auth not working**: Check Firebase config and credentials

---

## Project URLs After Deployment

- **Frontend:** https://portfolio-xxxxx.web.app
- **Backend API:** https://portfolio-backend.vercel.app/api
- **Contact Form:** Uses Firebase Authentication + MongoDB

---

## Additional Notes

- Use `vercel --prod` and `firebase deploy --only hosting` for production deployments
- Keep `.env` files in `.gitignore` (they already are)
- Monitor your Vercel and Firebase usage quotas
- Set up monitoring/alerting for API errors
