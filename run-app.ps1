# One-click runner for PowerShell: installs deps if missing and starts the app
Set-StrictMode -Version Latest
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath

if (-not (Test-Path -Path (Join-Path $scriptPath 'node_modules'))) {
    Write-Host 'Installing dependencies...'
    npm install
}

Write-Host 'Starting app...'
npm start
