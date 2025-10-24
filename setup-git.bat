@echo off
echo Setting up Git repository for Millennium Legal CRM...

REM Initialize Git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Millennium Legal CRM System"

echo Git repository initialized successfully!
echo Next steps:
echo 1. Create GitHub repository at https://github.com
echo 2. Add remote origin
echo 3. Push to GitHub
echo 4. Connect to Vercel

pause
