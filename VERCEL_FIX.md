# Vercel Deployment Fix 🚀

## Problem
Your backend was throwing a `500: INTERNAL_SERVER_ERROR` with `FUNCTION_INVOCATION_FAILED` when deployed to Vercel.

## Root Cause
Vercel serverless functions work differently than traditional Node.js servers. Your backend was configured to start a server with `app.listen()`, but Vercel needs to directly invoke an Express app handler function.

## What Was Fixed

### 1. Created Vercel API Handler
**New file**: `backend/api/index.js`
- Wraps the Express app for Vercel serverless functions
- Handles database and Firebase initialization on first request
- Properly exports async handler function

### 2. Updated vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

### 3. Fixed Import Issues
- Removed incorrect `app` import from `routes/index.js`
- Cleaned up Express app configuration in `app.js`

### 4. Improved Error Handling
- Added try-catch for Firebase initialization
- Added fallback for MongoDB connection failures
- Better logging for debugging

## How It Works Now

```
Request → api/index.js (Vercel handler)
  ↓
Initialize (one-time):
  - Connect to MongoDB
  - Seed database if needed
  - Initialize Firebase
  ↓
app() → Express routes
  ↓
Response
```

## Local Development
- Still runs normally with `npm run dev`
- Uses `src/server.js` which starts an HTTP server on port 5000
- No changes needed to your local workflow

## Environment Variables Required

### Essential (Vercel Dashboard)
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
```

### Optional (for Firebase features)
```
FIREBASE_PROJECT_ID=your-project
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email
```

### Optional (for email notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-app-password
```

## How to Deploy

### Step 1: Ensure All Environment Variables Are Set
Go to Vercel Dashboard → Project Settings → Environment Variables

Required:
- `MONGODB_URI`
- `NODE_ENV=production`

Optional:
- Firebase variables (if using auth)
- SMTP variables (if using email)

### Step 2: Deploy
```bash
cd backend
vercel --prod
```

### Step 3: Verify
```bash
# Health check - should return 200 OK
curl https://your-backend.vercel.app/

# API check - should list projects
curl https://your-backend.vercel.app/api/projects
```

## Troubleshooting

### Still getting 500 error?
1. **Check logs**: Go to Vercel dashboard → Deployments → click your deployment → Logs
2. **Common issues**:
   - `MONGODB_URI` not set → Add to environment variables
   - MongoDB connection timeout → Wait for Atlas to warm up
   - Firebase key format → Ensure `\n` in key is properly formatted

### Getting timeout errors?
- Increase MongoDB serverSelectionTimeoutMS in `src/config/db.js`
- Check MongoDB Atlas whitelist (allow Vercel IPs)

### API returning 404?
- Ensure routes are at `/api/...` (e.g., `/api/projects`)
- Check routes are properly exported

## Files Modified

| File | Change |
|------|--------|
| `backend/api/index.js` | ✅ CREATED (Vercel handler) |
| `backend/vercel.json` | ✅ UPDATED (new build path) |
| `backend/src/app.js` | ✅ FIXED (cleaned up) |
| `backend/src/server.js` | ✅ UPDATED (better logging) |
| `backend/src/routes/index.js` | ✅ FIXED (removed bad import) |

## Testing Locally
```bash
cd backend

# Development server
npm run dev

# Should see:
# Database and seed initialized
# Firebase initialized
# Server running on port 5000
```

## Next Steps

1. ✅ Push these changes to GitHub
2. ✅ Go to Vercel dashboard
3. ✅ Set environment variables
4. ✅ Trigger redeploy (or push again)
5. ✅ Check deployment logs
6. ✅ Test API endpoints

## Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] `NODE_ENV=production` is set
- [ ] `MONGODB_URI` is valid
- [ ] MongoDB Atlas allows Vercel IPs (or use IP whitelist)
- [ ] Vercel redeploy successful
- [ ] Health check endpoint returns 200
- [ ] API endpoints return data
- [ ] No errors in Vercel logs

## Success Indicators

After deployment, you should see:
```
✅ GET / returns { success: true, message: "Portfolio API is running" }
✅ GET /api/projects returns array of projects
✅ GET /api/skills returns array of skills
✅ POST /api/messages accepts contact form
✅ No 500 errors in logs
```

## Questions?

If deployment still fails:
1. Check Vercel logs for specific error message
2. Verify MongoDB connection string
3. Ensure all required env vars are set
4. Try redeploying after 2-3 minutes

Your backend should now work perfectly on Vercel! 🚀
