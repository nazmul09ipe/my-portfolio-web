# Md. Nazmul Haque — Portfolio

A world-class, production-ready full-stack developer portfolio built with React, Vite, Tailwind CSS, Express, and MongoDB.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, GSAP, Swiper, React CountUp, React Icons, Axios, React Router, React Hot Toast, Lottie React, Firebase Auth |
| **Backend** | Node.js, Express, MongoDB, Firebase Admin, Helmet, CORS, Rate Limiting |
| **Deployment** | Firebase Hosting (Frontend), Vercel (Backend), MongoDB Atlas |

## Project Structure

```
my-portfolio-web/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/   # UI, layout, sections
│   │   ├── context/      # Theme & Auth
│   │   ├── hooks/        # Custom hooks
│   │   ├── layouts/      # Page layouts
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API layer
│   │   ├── data/         # Static portfolio content
│   │   └── config/       # Firebase client
│   ├── firebase.json     # Firebase hosting config
│   └── .firebaserc       # Firebase project ID
├── backend/           # Express REST API
│   ├── src/
│   │   ├── config/       # DB & Firebase
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/      # Seed data
│   │   └── server.js
│   ├── vercel.json       # Vercel config
│   └── .vercelignore
├── DEPLOYMENT_GUIDE.md      # Detailed deployment steps
├── DEPLOYMENT_CHECKLIST.md  # Pre-deployment checklist
├── deploy.sh                # Deployment helper script
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Firebase account (for hosting)
- Vercel account (for backend)

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and Firebase credentials

npm install
npm run dev
```

Seed sample projects and skills:

```bash
npm run seed
```

API runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env
# Add Firebase config and API URL (http://localhost:5000/api for dev)

npm install
npm run dev
```

App runs at `http://localhost:5173`

## Development

### Available Scripts

**Root directory:**
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
npm run build            # Build frontend
npm run build:frontend   # Build frontend
npm run seed             # Seed backend database
```

**Frontend:**
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

**Backend:**
```bash
npm run dev      # Nodemon dev server
npm run start    # Production server
npm run seed     # Seed database
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| GET | `/api/projects` | No | List projects |
| GET | `/api/skills` | No | List skills |
| POST | `/api/messages` | No | Submit contact form |
| POST/PATCH/DELETE | `/api/*` | Firebase token | Admin CRUD |

## Features

- ✨ Fully responsive design
- 🌓 Dark / light mode with persistence
- 💎 Glassmorphism & gradient UI
- ✏️ GSAP scroll animations & Framer Motion micro-interactions
- 🎨 Animated gradient background
- 📱 SEO meta tags
- 🚀 Lazy-loaded routes
- 💬 Contact form with MongoDB storage
- 🔐 Firebase Authentication for admin
- 📊 Dynamic projects and skills from database
- ⚡ Optimized with Vite

## Deployment

### Quick Deploy

```bash
bash deploy.sh
```

Then follow the interactive menu to deploy frontend, backend, or both.

### Firebase (Frontend)

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

See `DEPLOYMENT_GUIDE.md` for detailed Firebase setup instructions.

### Vercel (Backend)

```bash
cd backend
vercel --prod
```

See `DEPLOYMENT_GUIDE.md` for detailed Vercel setup instructions.

### Environment Variables

**Frontend** (`.env.production`):
```
VITE_API_URL=https://portfolio-backend.vercel.app/api
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Backend** (Vercel Dashboard):
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_CLIENT_ID=...
FIREBASE_AUTH_URI=...
FIREBASE_TOKEN_URI=...
FIREBASE_AUTH_PROVIDER_CERT_URL=...
FIREBASE_CLIENT_CERT_URL=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete step-by-step deployment instructions
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification checklist
- **[deploy.sh](./deploy.sh)** - Automated deployment helper script

## Code Quality

- ESLint configured (9 lint errors fixed ✅)
- Vite for fast development and optimized builds
- Tailwind CSS for utility-first styling
- Responsive design tested on mobile, tablet, desktop

## Production Build

```bash
# Frontend
cd frontend && npm run build
# Output: frontend/dist/

# Backend runs on Vercel with npm start
```

## License

MIT © Md. Nazmul Haque

## Support

For deployment issues, see:
- `DEPLOYMENT_GUIDE.md` - Troubleshooting section
- `DEPLOYMENT_CHECKLIST.md` - Prerequisites checklist
- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs/hosting
