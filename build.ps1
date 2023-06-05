Set-Location .\Front
npm run build
Get-ChildItem "..\Docker\webserver\html" -Recurse| Remove-Item -Force -Recurse
Copy-Item -Path ".\dist\*" -Destination "..\Docker\webserver\html" -Recurse
Set-Location ..\Docker
docker compose up -d
Set-Location ..
Start-Process "http://localhost/"