@echo off
REM One-click runner: installs deps if needed and starts the Electron app
SET APP_DIR=%~dp0
cd /d "%APP_DIR%"

IF NOT EXIST node_modules (
  echo Installing dependencies...
  npm install || pause
)

echo Starting app...
npm start
