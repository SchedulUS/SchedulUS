Set-Location .\Docker
docker compose down
docker compose up -d
Set-Location ..\Front
Start-Process "http://localhost:8000/"
npm run dev
Set-Location ..