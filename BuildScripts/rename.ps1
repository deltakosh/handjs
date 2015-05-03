# To be called after minifying regenerated hand.js

$version = "1.4.0"

Function Ensure-Directory($path) {
  If (!$(Test-Path $path)) {
	New-Item $path -Type Directory
  }  
}
Function Zip-Directory($zipfilename, $sourcedir) {
  Write-Host $zipfilename
  Write-Host $sourcedir
  Add-Type -Assembly System.IO.Compression.FileSystem
  $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
  [System.IO.Compression.ZipFile]::CreateFromDirectory($sourcedir,
    $zipfilename, $compressionLevel, $false)
}
$addVersion = New-Object System.Text.RegularExpressions.Regex "\."
Function Add-Version($jsname) {
  Return $addVersion.Replace($jsname, $('-' + $version + '.'), 1)
}
Function Package($files, $packagename) {
  Ensure-Directory ./buildresults/$packagename
  $files | Foreach-Object { Copy-Item $_.name ./buildresults/$packagename/$(Add-Version $_.name) }
  Zip-Directory $(join-path $(resolve-path ./buildresults) "$packagename.zip") $(resolve-path ./buildresults/$packagename)
  Remove-Item ./buildresults/$packagename -Recurse
}


pushd ../
Ensure-Directory ./buildresults

# min.js set
Package $(Get-Item hand*.min.*) $("hand-" + $version + ".min")
# unminified set
Package $(Get-Item hand*.js | Where-Object { $_.name -match "^(?!.*?min).*$" }) $("hand-" + $version)
popd