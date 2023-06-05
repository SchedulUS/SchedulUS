#Lancement des dockers
Set-Location .\Docker
docker compose up -d

#Ouverture du navigateur au site (serveur dev)
Start-Process "http://localhost:8000/"

#Démarrage du serveur dev
Set-Location ..\Front
npm run dev
Set-Location ..