Write-Host "🔥🔥🔥 START CRUSHED THIS WORLD 🔥🔥🔥"

$portPattern = ":3000\s.+LISTENING\s+\d+$"

function Get-PidNumber() {
	$pidNumberPattern = "\d+$"

	$foundProcesses = netstat -ano | findstr :"3000"
	$processes = $foundProcesses | Select-String -Pattern $portPattern
	$firstMatch = $processes.Matches.Get(0).Value

	return [regex]::match($firstMatch, $pidNumberPattern).Value
}

$codePath = (Get-Location).ToString()

$dotnetSolutionPath = $codePath + '\StudCity.Backend'
$backendApp = '.\StudCity.Backend\StudCity.API\StudCity.API'
$reactAppPath = $codePath + "\StudCity.Frontend"

# Build dotnet app
dotnet build $dotnetSolutionPath

if ($LASTEXITCODE -ne 0) {
	Write-Host "Build .NET APP Finished with error."
	exit 1
}

Write-Host "*************************🔥 Starting StudCity API 🔥*************************"
Write-Host "$($backendApp).csproj"
$dotnetProcess = Start-Process -FilePath dotnet -ArgumentList "watch run --verbosity m --project $($backendApp).csproj" -PassThru
Start-Sleep -Seconds 2

# check to see if the UI is still running, and if so, don't launch another one.
$foundUI = netstat -ano | findstr :"3000"
Write-Host "*************************🔥 Starting StudCity UI 🔥*************************"

If ($foundUI | Select-String -Pattern $portPattern -Quiet) {
	Write-Host "UI is already running on port 3000..."
	$pidNumber = Get-PidNumber
	$npm = Get-Process -Id $pidNumber
}
Else {
	Write-Host "starting React UI on http://localhost:3000"
	Set-Location $reactAppPath
	Start-Process -FilePath npm -ArgumentList "run start" -PassThru

	Start-Sleep -Seconds 25
	Start-Process "http://localhost:3000" -PassThru
	Set-Location $codePath

	$pidNumber = Get-PidNumber

	$npm = Get-Process -Id $pidNumber
}

Write-Host "💀 We can do this! 💀"

Read-Host -Prompt '🔥🛑 Press the <ANY> key to quit and kill all services'

# Stop all process
$dotnetProcess | Stop-Process -Force -ErrorAction SilentlyContinue
$npm | Stop-Process -Force