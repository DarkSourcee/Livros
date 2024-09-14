@echo off
rem Inicia o servidor da API
start "" /b cmd /c "cd /d %~dp0api && node app.js"
rem Inicia o front-end usando npm
start "" /b cmd /c "cd /d %~dp0front && npm run dev"
