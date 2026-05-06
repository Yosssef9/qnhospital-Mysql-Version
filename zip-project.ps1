$destination = "project-context.zip"
$tempFolder = "_chatgpt_zip_temp"

Write-Host "Cleaning old zip/temp files..."

Remove-Item $destination -Force -ErrorAction SilentlyContinue
Remove-Item $tempFolder -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Creating temp folder..."

New-Item -ItemType Directory -Path $tempFolder | Out-Null

Write-Host "Copying React and Strapi project files..."

robocopy . $tempFolder /E `
  /XD node_modules .git dist build coverage .vite .next out .cache .strapi tmp temp logs uploads public\uploads $tempFolder `
  /XF .env .env.local .env.production .env.development *.zip *.log package-lock.json yarn.lock pnpm-lock.yaml `
  /NFL /NDL /NJH /NJS /nc /ns /np

Write-Host "Zipping using 7-Zip..."

$sevenZipPath = "C:\Program Files\7-Zip\7z.exe"

if (!(Test-Path $sevenZipPath)) {
    $sevenZipPath = "C:\Program Files (x86)\7-Zip\7z.exe"
}

if (!(Test-Path $sevenZipPath)) {
    Write-Host "❌ 7-Zip not found. Please check installation path."
    exit 1
}

& $sevenZipPath a -tzip $destination "$tempFolder\*" -mx=5

Write-Host "Cleaning temp folder..."

Remove-Item $tempFolder -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Project zipped successfully: $destination"