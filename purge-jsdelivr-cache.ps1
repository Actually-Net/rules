param(
    [string]$RepoOwner = 'Actually-Net',
    [string]$RepoName = 'rules',
    [string]$Branch = 'main',
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

$repoRoot = 'D:\Coding\Project\Github\rules'
$targets = @(
    @{ LocalDir = 'assets\icons'; UrlDir = 'assets/icons' },
    @{ LocalDir = 'rule-providers'; UrlDir = 'rule-providers' },
    @{ LocalDir = 'overrides\dev'; UrlDir = 'overrides/dev' }
)

function Get-PurgeTargets {
    param(
        [string]$Root,
        [object[]]$Items,
        [string]$Owner,
        [string]$Name,
        [string]$Ref
    )

    $results = New-Object System.Collections.Generic.List[object]

    foreach ($item in $Items) {
        $dirPath = Join-Path $Root $item.LocalDir
        if (-not (Test-Path -LiteralPath $dirPath)) {
            Write-Warning "目录不存在，已跳过: $dirPath"
            continue
        }

        Get-ChildItem -LiteralPath $dirPath -File | Sort-Object Name | ForEach-Object {
            $relativeUrlPath = ($item.UrlDir.TrimEnd('/') + '/' + $_.Name)
            $cdnUrl = "https://fastly.jsdelivr.net/gh/$Owner/$Name@$Ref/$relativeUrlPath"
            $purgeUrl = "https://purge.jsdelivr.net/gh/$Owner/$Name@$Ref/$relativeUrlPath"

            $results.Add([pscustomobject]@{
                Name       = $_.Name
                LocalPath   = $_.FullName
                RelativeDir = $item.LocalDir
                RelativeUrl = $relativeUrlPath
                CdnUrl      = $cdnUrl
                PurgeUrl    = $purgeUrl
            }) | Out-Null
        }
    }

    return $results
}

function Invoke-PurgeItem {
    param(
        [pscustomobject]$Item,
        [int]$Attempt
    )

    try {
        $response = Invoke-WebRequest -Uri $Item.PurgeUrl -Method Get -UseBasicParsing -TimeoutSec 30
        return [pscustomobject]@{
            Success    = $true
            StatusCode = [int]$response.StatusCode
            Message    = '刷新成功'
            Attempt    = $Attempt
        }
    }
    catch {
        $statusCode = $null
        if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        return [pscustomobject]@{
            Success    = $false
            StatusCode = $statusCode
            Message    = $_.Exception.Message
            Attempt    = $Attempt
        }
    }
}

function Run-PurgeBatch {
    param(
        [System.Collections.Generic.List[object]]$Batch,
        [string]$PhaseLabel,
        [int]$StartOffset,
        [int]$TotalOverall
    )

    $results = New-Object System.Collections.Generic.List[object]

    for ($i = 0; $i -lt $Batch.Count; $i++) {
        $item = $Batch[$i]
        $current = $StartOffset + $i + 1
        $percent = [math]::Floor(($current / [math]::Max($TotalOverall, 1)) * 100)

        Write-Progress -Activity '刷新 jsDelivr CDN 缓存' -Status "$PhaseLabel [$current/$TotalOverall] $($item.RelativeUrl)" -PercentComplete $percent

        $result = Invoke-PurgeItem -Item $item -Attempt ($(if ($PhaseLabel -eq '首次刷新') { 1 } else { 2 }))
        $results.Add([pscustomobject]@{
            Item       = $item
            Success    = $result.Success
            StatusCode = $result.StatusCode
            Message    = $result.Message
            Attempt    = $result.Attempt
        }) | Out-Null

        if ($result.Success) {
            Write-Host ("[成功][第{0}次] {1}" -f $result.Attempt, $item.RelativeUrl) -ForegroundColor Green
        }
        else {
            $codeText = if ($null -ne $result.StatusCode) { "HTTP $($result.StatusCode)" } else { '无状态码' }
            Write-Host ("[失败][第{0}次] {1} -> {2} | {3}" -f $result.Attempt, $item.RelativeUrl, $codeText, $result.Message) -ForegroundColor Yellow
        }
    }

    return $results
}

Write-Host '开始整理需要刷新的自定义文件...' -ForegroundColor Cyan
$targetsToPurge = Get-PurgeTargets -Root $repoRoot -Items $targets -Owner $RepoOwner -Name $RepoName -Ref $Branch

if (-not $targetsToPurge -or $targetsToPurge.Count -eq 0) {
    Write-Host '未找到任何可刷新的自定义文件。' -ForegroundColor Yellow
    Write-Host '按任意键退出...'
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 0
}

Write-Host ("共找到 {0} 个需要刷新的文件。" -f $targetsToPurge.Count) -ForegroundColor Cyan

if ($WhatIf) {
    Write-Host '当前为 WhatIf 模式，仅列出目标，不执行刷新。' -ForegroundColor Yellow
    $targetsToPurge | ForEach-Object { Write-Host $_.PurgeUrl }
    Write-Host '按任意键退出...'
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 0
}

$allResults = New-Object System.Collections.Generic.List[object]
$firstPass = Run-PurgeBatch -Batch $targetsToPurge -PhaseLabel '首次刷新' -StartOffset 0 -TotalOverall $targetsToPurge.Count
$firstPass | ForEach-Object { $allResults.Add($_) | Out-Null }

$failedItems = @($firstPass | Where-Object { -not $_.Success } | ForEach-Object { $_.Item })

if ($failedItems.Count -gt 0) {
    Write-Host ''
    Write-Host ("首次刷新失败 {0} 个，开始二次重试，仅重试失败项。" -f $failedItems.Count) -ForegroundColor Yellow
    $retryBatch = New-Object System.Collections.Generic.List[object]
    foreach ($item in $failedItems) { $retryBatch.Add($item) | Out-Null }
    $retryResults = Run-PurgeBatch -Batch $retryBatch -PhaseLabel '二次重试' -StartOffset 0 -TotalOverall $retryBatch.Count
    $retryResults | ForEach-Object { $allResults.Add($_) | Out-Null }
}

Write-Progress -Activity '刷新 jsDelivr CDN 缓存' -Completed

$latestByFile = $allResults |
    Group-Object { $_.Item.RelativeUrl } |
    ForEach-Object { $_.Group | Sort-Object Attempt -Descending | Select-Object -First 1 }

$successCount = @($latestByFile | Where-Object { $_.Success }).Count
$finalFailed = @($latestByFile | Where-Object { -not $_.Success })

Write-Host ''
Write-Host '===== 刷新结果汇总 =====' -ForegroundColor Cyan
Write-Host ("总文件数: {0}" -f $targetsToPurge.Count)
Write-Host ("成功数量: {0}" -f $successCount) -ForegroundColor Green
Write-Host ("失败数量: {0}" -f $finalFailed.Count) -ForegroundColor $(if ($finalFailed.Count -eq 0) { 'Green' } else { 'Yellow' })

if ($finalFailed.Count -gt 0) {
    Write-Host ''
    Write-Host '以下文件最终仍刷新失败：' -ForegroundColor Yellow
    foreach ($entry in $finalFailed) {
        $codeText = if ($null -ne $entry.StatusCode) { "HTTP $($entry.StatusCode)" } else { '无状态码' }
        Write-Host ("- {0} -> {1} | {2}" -f $entry.Item.RelativeUrl, $codeText, $entry.Message) -ForegroundColor Yellow
    }
}
else {
    Write-Host '所有文件刷新成功。' -ForegroundColor Green
}

Write-Host ''
Write-Host '按任意键退出...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
