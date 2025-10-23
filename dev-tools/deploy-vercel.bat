@echo off
REM 🚀 Deploy a Vercel - Script de Despliegue (Windows)

echo 🚀 Desplegando Portfolio Email Server a Vercel...
echo =============================================
echo.

REM Verificar que Vercel CLI esté disponible
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Instalando Vercel CLI...
    npm install -g vercel
)

echo 🔧 Preparando despliegue...
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
npm install

echo.
echo ⚠️  IMPORTANTE: Configura estas variables de entorno en Vercel:
echo.
echo EMAIL_SERVICE=gmail
echo EMAIL_USER=tu-email@gmail.com
echo EMAIL_PASS=tu-app-password-de-16-caracteres  
echo OWNER_EMAIL=tu-email-personal@gmail.com
echo FRONTEND_URL=https://tu-portfolio.github.io
echo.

set /p config="¿Ya configuraste las variables de entorno en Vercel? (y/N): "
if /i not "%config%"=="y" (
    echo 👆 Configura las variables primero en https://vercel.com
    echo    Proyecto → Settings → Environment Variables
    pause
    exit /b 1
)

echo.
echo 🚀 Iniciando despliegue...
echo.

REM Deploy a producción
vercel --prod

echo.
echo 🎉 ¡Despliegue completado!
echo.
echo 📋 Próximos pasos:
echo    1. Copia la URL que te dio Vercel
echo    2. Actualiza VITE_API_URL en tu frontend  
echo    3. Prueba enviando un email desde tu portfolio
echo.
echo 🔗 Tu servidor estará disponible en:
echo    https://tu-proyecto.vercel.app/api/send-email

pause