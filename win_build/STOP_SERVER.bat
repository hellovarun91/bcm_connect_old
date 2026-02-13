@echo off
echo Stopping BCM Connect server...
taskkill /f /im node.exe 2>nul
echo Server stopped.
pause
