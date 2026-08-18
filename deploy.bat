@echo off
chcp 65001 >nul
title 🚀 一键部署个人主页到 GitHub Pages

echo ======================================================================
echo           🚀 正在准备部署 Zhiyang Li 的个人网站到 GitHub
echo ======================================================================
echo.

cd /d "%~dp0"

:: 检查是否配置了远程仓库
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [1/3] 正在绑定远程仓库: https://github.com/etonsalmon160-source/etonsalmon160-source.github.io.git ...
    git remote add origin https://github.com/etonsalmon160-source/etonsalmon160-source.github.io.git
) else (
    git remote set-url origin https://github.com/etonsalmon160-source/etonsalmon160-source.github.io.git
    echo [1/3] 远程仓库已连接。
)

echo.
echo [2/3] 正在将全新个人主页推送到 GitHub (强制覆盖旧内容以更新为新主页)...
echo (如果弹出 GitHub 登录窗口，请点击【Sign in with your browser】授权登录即可)
echo.

git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ======================================================================
    echo           🎉 恭喜！最新个人主页代码已成功推送到 GitHub！
    echo ======================================================================
    echo.
    echo [3/3] 正在为你自动打开 GitHub Pages 设置页面...
    start https://github.com/etonsalmon160-source/etonsalmon160-source.github.io/settings/pages
    echo.
    echo 💡 页面打开后最后一步确认：
    echo 1. 在【Branch】选择 main 分支并点击【Save】。
    echo 2. 在【Custom domain】输入 eto-1024.me 点击【Save】。
    echo 3. 勾选【Enforce HTTPS】。
    echo.
) else (
    echo.
    echo ❌ 推送遇到问题，请检查网络或授权。
)

echo.
pause
