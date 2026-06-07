#!/bin/bash

# Portfolio Deployment Script
# Deploys frontend to Firebase and backend to Vercel

set -e

echo "========================================="
echo "  Portfolio Deployment Helper"
echo "========================================="
echo ""

# Check if required tools are installed
check_tools() {
  if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install it:"
    echo "   npm install -g vercel"
    exit 1
  fi

  if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Install it:"
    echo "   npm install -g firebase-tools"
    exit 1
  fi

  echo "✅ All required tools found"
  echo ""
}

# Build and deploy frontend
deploy_frontend() {
  echo "========================================="
  echo "  Deploying Frontend to Firebase"
  echo "========================================="
  cd frontend

  echo "📦 Building frontend..."
  npm run build

  echo "🚀 Deploying to Firebase..."
  firebase deploy --only hosting

  echo "✅ Frontend deployed successfully!"
  cd ..
  echo ""
}

# Deploy backend
deploy_backend() {
  echo "========================================="
  echo "  Deploying Backend to Vercel"
  echo "========================================="
  cd backend

  echo "🚀 Deploying to Vercel..."
  vercel --prod

  echo "✅ Backend deployed successfully!"
  cd ..
  echo ""
}

# Main menu
main_menu() {
  echo "What would you like to deploy?"
  echo "1) Frontend only (Firebase)"
  echo "2) Backend only (Vercel)"
  echo "3) Both (Frontend + Backend)"
  echo "4) Exit"
  echo ""
  read -p "Enter choice [1-4]: " choice

  case $choice in
    1)
      deploy_frontend
      ;;
    2)
      deploy_backend
      ;;
    3)
      deploy_frontend
      deploy_backend
      ;;
    4)
      echo "Exiting..."
      exit 0
      ;;
    *)
      echo "Invalid choice. Please try again."
      main_menu
      ;;
  esac
}

# Run checks and main menu
check_tools
main_menu

echo "========================================="
echo "  Deployment Complete! 🎉"
echo "========================================="
echo ""
echo "Frontend URL: https://portfolio-xxxxx.web.app"
echo "Backend URL: https://portfolio-backend.vercel.app/api"
echo ""
echo "Check DEPLOYMENT_GUIDE.md for more details."
