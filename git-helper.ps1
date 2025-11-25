# Git Helper Script for Extimer
# This script makes it easier to run Git commands until PATH is updated

$gitPath = "C:\Program Files\Git\bin\git.exe"

function Run-Git {
    param([Parameter(ValueFromRemainingArguments=$true)]$args)
    & $gitPath $args
}

Write-Host "Git Helper Loaded!" -ForegroundColor Green
Write-Host "Usage: Run-Git <command>" -ForegroundColor Yellow
Write-Host "Example: Run-Git status" -ForegroundColor Cyan
Write-Host ""

# Set alias for convenience
Set-Alias -Name git -Value Run-Git -Scope Global

Write-Host "You can now use 'git' commands directly!" -ForegroundColor Green
Write-Host "Example: git status" -ForegroundColor Cyan
