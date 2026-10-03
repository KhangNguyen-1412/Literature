@echo off
chcp 65001 > nul
title VĂN UYỂN — Máy chủ & Phòng đọc Văn học
cls
echo ===================================================================
echo     VĂN UYỂN — HỆ THỐNG PHÒNG ĐỌC ^& QUẢN TRỊ NỘI DUNG VĂN HỌC
echo ===================================================================
echo.
echo [*] Dang khoi dong may chu backend Node.js tai http://127.0.0.1:3000/ ...
echo [*] Dang tu dong mo trang quan tri tren trinh duyet...
echo.
start http://127.0.0.1:3000/admin.html
node server.js
pause
