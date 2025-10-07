@echo off
REM Helper to push this project to a GitHub repository.
REM Requires Git to be installed and available in PATH.

SETLOCAL ENABLEDELAYEDEXPANSION
cd /d "%~dp0"

echo This helper will push the current folder to a GitHub repository.
echo If you don't have a remote yet, enter the repository clone URL (e.g. https://github.com/username/repo.git).
set /p REPO_URL=Enter GitHub repository URL (or leave empty to only show git status): 

git --version >nul 2>&1 || (
  echo Git not found in PATH. Install Git (https://git-scm.com/) and try again.
  pause
  exit /b 1
)

if "%REPO_URL%"=="" (
  echo Showing git status...
  git status
  pause
  exit /b 0
)

if not exist .git (
  echo Initializing git repository...
  git init
)

echo Adding files...
git add -A

echo Creating commit...
git commit -m "Initial commit: desktop-app" 2>nul || (
  echo Nothing to commit or commit failed; continuing...
)

echo Setting remote origin to %REPO_URL%
git remote remove origin 2>nul || (rem ignore)
git remote add origin %REPO_URL%

echo Pushing to origin main (creating branch if needed)...
git push -u origin main || (
  echo First push to 'main' failed. Trying 'master' branch...
  git push -u origin master
)

echo Done. If GitHub asks for credentials, authenticate in the popup or command line.
pause
