Set-Location .\Front
npm run build
Get-ChildItem -Path "..\Docker\webserver\html" -Include * -File -Recurse | foreach { $_.Delete()}
Copy-Item -Path ".\dist\*" -Destination "..\Docker\webserver\html" -Recurse
Set-Location ..\Docker
docker compose up -d
Set-Location ..