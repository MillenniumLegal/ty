# Deploy Client-Only to Vercel

## Quick Solution: Separate Repository

### Step 1: Create New GitHub Repository
1. Go to [github.com](https://github.com)
2. Create new repository: `millennium-crm-frontend`
3. Make it public

### Step 2: Copy Client Folder
1. Copy the entire `client` folder to a new location
2. Rename it to `millennium-crm-frontend`
3. Upload to GitHub

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import the new repository
3. Vercel will auto-detect it's a Vite project
4. Deploy automatically

## Alternative: Fix Current Repository

### Update package.json in client folder
```json
{
  "scripts": {
    "build": "vite build --mode production"
  }
}
```

### Update Vercel settings manually:
- Framework: Vite
- Root Directory: client
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm install
