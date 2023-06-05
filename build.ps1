#Contruction des fichiers du site
Set-Location .\Front
npm install
npm run build
Get-ChildItem "..\Docker\webserver\html" -Recurse| Remove-Item -Force -Recurse
Copy-Item -Path ".\dist\*" -Destination "..\Docker\webserver\html" -Recurse

#Lancement des dockers
Set-Location ..\Docker
docker compose up -d
Set-Location ..

#Ouverture du navigateur au site
Start-Process "http://localhost/"