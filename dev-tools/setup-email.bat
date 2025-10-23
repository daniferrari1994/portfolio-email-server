@echo off
REM 🚀 Script de Configuración Completa del Sistema de Email (Windows)
REM Ejecuta este script después de configurar Gmail App Password

echo 🔧 Configurando Sistema de Email del Portfolio...
echo.

REM Paso 1: Verificar estructura de archivos
echo 📋 Verificando estructura de archivos
echo ----------------------------------------

if not exist ".env" (
    echo ❌ Falta archivo .env
    echo 💡 Copia .env.example a .env y configura tus datos de Gmail
    pause
    exit /b 1
) else (
    echo ✅ Archivo .env encontrado
)

if not exist "..\\.env.local" (
    echo ❌ Falta archivo .env.local en el directorio raíz
    echo 💡 Copia ..\.env.example a ..\.env.local
    pause
    exit /b 1
) else (
    echo ✅ Archivo .env.local encontrado
)

REM Paso 2: Verificar configuración del servidor
echo.
echo 📋 Verificando configuración del servidor
echo ----------------------------------------

REM Ya estamos en el directorio server

REM Verificar que las dependencias estén instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependencias del servidor...
    npm install
) else (
    echo ✅ Dependencias del servidor instaladas
)

REM Verificar variables de entorno críticas
findstr "tu-email@gmail.com" .env >nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ⚠️  IMPORTANTE: Debes configurar tus datos reales en .env
    echo.
    echo 📝 Edita .env con:
    echo    EMAIL_USER=tu-email-real@gmail.com
    echo    EMAIL_PASS=tu-app-password-de-16-caracteres
    echo    OWNER_EMAIL=tu-email-personal@gmail.com
    echo.
    echo 🔗 Guía completa en la documentación
    echo.
    set /p config="¿Ya configuraste Gmail App Password? (y/N): "
    if /i not "%config%"=="y" (
        echo 👆 Configura Gmail primero, luego ejecuta este script de nuevo
        pause
        exit /b 1
    )
)

REM Paso 3: Probar servidor
echo.
echo 📋 Iniciando servidor de email
echo ----------------------------------------

echo 🚀 Iniciando servidor en puerto 3001...
echo    Para detener: Ctrl+C
echo    Logs del servidor:
echo.

REM Iniciar servidor
npm run dev

echo.
echo 🎉 ¡Sistema configurado!
echo.
echo 📋 Próximos pasos:
echo    1. Configura tu frontend para usar el nuevo sistema
echo    2. Prueba enviando un email desde el formulario de contacto
echo    3. Verifica que recibes el email y el usuario recibe confirmación
echo.
echo 🔗 Documentación completa en: EMAIL_SETUP.md

pause