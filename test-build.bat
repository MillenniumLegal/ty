@echo off
echo Testing Vercel build process...
echo.

echo Step 1: Navigate to client directory
cd client

echo Step 2: Install dependencies
npm install

echo Step 3: Build the application
npm run build

echo Step 4: Check if dist folder exists
if exist "dist" (
    echo ✅ Build successful! dist folder created.
    echo.
    echo Files in dist:
    dir dist
) else (
    echo ❌ Build failed! dist folder not found.
)

echo.
echo Build test completed.
pause
