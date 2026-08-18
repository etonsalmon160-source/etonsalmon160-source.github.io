@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Pushing latest website changes to GitHub...
git push -u origin main
echo Done! Opening Pages settings...
start https://github.com/etonsalmon160-source/etonsalmon160-source.github.io/settings/pages
