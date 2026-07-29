@echo off
title Femcart Full-Stack Runner
echo ===================================================
echo 🚀 Launching Femcart Full-Stack E-Commerce Platform
echo ===================================================
echo.
echo Starting Backend API Server (Port 5006)...
start "Femcart Backend API" cmd /k "cd femcart-api && npm run dev"
echo.
echo Starting Frontend Client (Port 3006)...
start "Femcart Frontend Client" cmd /k "cd femcart-web && npm run dev"
echo.
echo ===================================================
echo 🎉 Both servers launched in separate terminal windows!
echo backend: http://localhost:5006
echo frontend: http://localhost:3006
echo ===================================================
pause
