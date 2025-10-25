@echo off
echo Setting up client-only deployment for Vercel...
echo.

echo Step 1: Create new directory
if not exist "millennium-legal-crm-client" mkdir millennium-legal-crm-client
cd millennium-legal-crm-client

echo Step 2: Copy client files
echo Copying files from client directory...
xcopy /E /I /Y "..\client\*" "."

echo Step 3: Create simple vercel.json
echo Creating vercel.json...
echo { > vercel.json
echo   "version": 2, >> vercel.json
echo   "buildCommand": "npm run build", >> vercel.json
echo   "outputDirectory": "dist", >> vercel.json
echo   "installCommand": "npm install", >> vercel.json
echo   "framework": "vite" >> vercel.json
echo } >> vercel.json

echo Step 4: Test build
echo Testing build...
npm install
npm run build

if exist "dist" (
    echo ✅ Build successful! Ready for deployment.
    echo.
    echo Next steps:
    echo 1. Initialize Git: git init
    echo 2. Add files: git add .
    echo 3. Commit: git commit -m "Client-only deployment"
    echo 4. Create GitHub repository
    echo 5. Push to GitHub: git push -u origin main
    echo 6. Deploy to Vercel
) else (
    echo ❌ Build failed! Check for errors.
)

echo.
echo Setup completed. Check the millennium-legal-crm-client folder.
pause
