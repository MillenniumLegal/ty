# 🔧 Vercel Deployment Troubleshooting Guide

## ❌ Current Issue: Import Resolution Error

**Error:** `Rollup failed to resolve import "/src/main.tsx" from "/vercel/path0/index.html"`

## ✅ Solutions Applied:

### 1. **Fixed Import Path in index.html**
```html
<!-- BEFORE (causing error) -->
<script type="module" src="/src/main.tsx"></script>

<!-- AFTER (fixed) -->
<script type="module" src="./src/main.tsx"></script>
```

### 2. **Updated Vercel Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

### 3. **Added .vercelignore**
```
server/
node_modules/
*.log
.env
.env.local
.env.production
.env.development
```

## 🧪 Test Build Locally

Run this command to test the build:
```bash
cd client
npm run build
```

**Expected Output:**
```
✓ 1379 modules transformed.
dist/index.html                   0.48 kB │ gzip:  0.31 kB
dist/assets/index-83796658.css   27.54 kB │ gzip:  5.05 kB
dist/assets/index-00e22fc8.js   376.97 kB │ gzip: 86.67 kB
✓ built in 1m 4s
```

## 🚀 Alternative Deployment Strategy

If the current approach still fails, try this **client-only deployment**:

### Option 1: Create Client-Only Repository

1. **Create new folder:**
   ```bash
   mkdir millennium-legal-crm-client
   cd millennium-legal-crm-client
   ```

2. **Copy client files:**
   ```bash
   # Copy all client files
   cp -r ../client/* .
   cp ../client/vercel.json .
   ```

3. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Client-only deployment"
   git remote add origin https://github.com/yourusername/millennium-legal-crm-client.git
   git push -u origin main
   ```

4. **Deploy to Vercel:**
   - Import the new repository
   - Vercel will auto-configure everything

### Option 2: Manual Vercel Configuration

1. **Go to Vercel Dashboard**
2. **Import Project**
3. **Manual Configuration:**
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## 🔍 Debug Steps

### Check Build Logs:
1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on failed deployment
5. Check "Build Logs" section

### Common Issues & Solutions:

#### Issue 1: "Cannot resolve import"
**Solution:** Ensure all import paths are relative, not absolute

#### Issue 2: "Permission denied"
**Solution:** Check file permissions and Node.js version

#### Issue 3: "Module not found"
**Solution:** Verify all dependencies are in package.json

#### Issue 4: "Build timeout"
**Solution:** Optimize build process, remove unnecessary files

## 📋 Pre-Deployment Checklist

- [ ] ✅ Local build works (`npm run build`)
- [ ] ✅ All dependencies installed
- [ ] ✅ Import paths are relative
- [ ] ✅ Vercel configuration is correct
- [ ] ✅ .vercelignore excludes server files
- [ ] ✅ Git repository is ready

## 🆘 If All Else Fails

### Emergency Deployment:
1. **Create new Vercel project**
2. **Upload client folder directly**
3. **Use Vercel CLI:**
   ```bash
   npm i -g vercel
   cd client
   vercel
   ```

### Contact Support:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Include build logs and error messages
- Mention this is a Vite + React project

## 🎯 Success Indicators

When deployment succeeds, you should see:
- ✅ Build completes without errors
- ✅ All assets are generated
- ✅ Application loads in browser
- ✅ All routes work correctly
- ✅ Sample data displays properly

---

## 🚀 Ready to Deploy!

The import resolution issue has been fixed. Your CRM should now deploy successfully to Vercel!
