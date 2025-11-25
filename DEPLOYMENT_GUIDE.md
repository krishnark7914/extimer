# Deployment Guide for Extimer

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `extimer`
4. Keep it **Public** (required for free hosting)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Initialize Git and Push (Run these commands after Git is installed)

```bash
# Navigate to your project
cd c:\Users\ramki\.gemini\antigravity\scratch\extimer

# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Extimer webapp"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/extimer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel (Recommended - Easiest)

### 2.1 Sign Up & Deploy
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "Import Project"
5. Select your `extimer` repository
6. Vercel will auto-detect Vite settings
7. Click "Deploy"
8. Wait 1-2 minutes - Done!

Your app will be live at: `https://extimer-YOUR_USERNAME.vercel.app`

### 2.2 Automatic Updates
Every time you push to GitHub, Vercel will automatically rebuild and deploy your app!

---

## Alternative: Deploy to Netlify

### 3.1 Sign Up & Deploy
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up" → "GitHub"
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select `extimer`
5. Build settings (should auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

Your app will be live at: `https://random-name.netlify.app`

You can customize the domain in Site settings.

---

## Alternative: Deploy to GitHub Pages

### 4.1 Install gh-pages package
```bash
npm install --save-dev gh-pages
```

### 4.2 Update package.json
Add these scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 4.3 Update vite.config.js
Create this file if it doesn't exist:
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/extimer/'
})
```

### 4.4 Deploy
```bash
npm run deploy
```

### 4.5 Enable GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Click Save

Your app will be live at: `https://YOUR_USERNAME.github.io/extimer`

---

## Recommended Choice

**Use Vercel** - It's the easiest and fastest option:
- Zero configuration needed
- Automatic deployments on every push
- Free SSL certificate
- Lightning-fast global CDN
- Custom domain support (free)

---

## Next Steps After Deployment

1. Test your live app on mobile devices
2. Share the URL with friends
3. Add a custom domain (optional)
4. Monitor analytics (Vercel provides free analytics)

---

## Troubleshooting

### Build fails on Vercel/Netlify
- Check that `package.json` has all dependencies
- Ensure Node version is compatible (add `"engines": {"node": ">=14"}` to package.json)

### App shows blank page
- Check browser console for errors
- Verify the base path in vite.config.js matches your deployment URL

### Need help?
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Netlify Support: [answers.netlify.com](https://answers.netlify.com)
