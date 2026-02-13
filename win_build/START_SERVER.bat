@echo off
echo ========================================
echo   BCM Connect - TUIO Server
echo ========================================
echo.

cd /d "%~dp0server"

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting TUIO + WebSocket server...
echo Press Ctrl+C to stop.
echo.
node server.js
pause
