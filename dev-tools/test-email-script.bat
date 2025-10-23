@echo off
REM 🧪 Test del Sistema de Email - Script de Prueba (Windows)

echo 🧪 Probando Sistema de Email del Portfolio
echo ==========================================
echo.

REM Verificar que el servidor esté ejecutándose
echo 📡 Verificando servidor...

REM Crear archivo temporal con datos de prueba
echo { > temp_email_data.json
echo   "firstName": "Test", >> temp_email_data.json
echo   "lastName": "Usuario", >> temp_email_data.json
echo   "email": "test@example.com", >> temp_email_data.json
echo   "phoneNumber": "+54 9 11 1234-5678", >> temp_email_data.json
echo   "message": "Este es un mensaje de prueba del sistema de email del portfolio. ¡Funciona perfectamente!", >> temp_email_data.json
echo   "language": "es" >> temp_email_data.json
echo } >> temp_email_data.json

echo.
echo 📧 Enviando email de prueba...
echo.

REM Intentar enviar email usando PowerShell
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/send-email' -Method Post -ContentType 'application/json' -Body (Get-Content temp_email_data.json -Raw); Write-Host '🎉 ¡EMAIL ENVIADO EXITOSAMENTE!' -ForegroundColor Green; Write-Host ''; Write-Host '✅ Verifica tu email (el configurado como OWNER_EMAIL)' -ForegroundColor Yellow; Write-Host '✅ El usuario test@example.com debería recibir confirmación' -ForegroundColor Yellow; Write-Host ''; Write-Host '📋 Respuesta del servidor:' -ForegroundColor Cyan; $response | ConvertTo-Json } catch { Write-Host '❌ Error al enviar email' -ForegroundColor Red; Write-Host ''; Write-Host '📋 Error:' -ForegroundColor Cyan; Write-Host $_.Exception.Message -ForegroundColor Red; Write-Host ''; Write-Host '💡 Verifica la configuración de Gmail App Password' -ForegroundColor Yellow }"

REM Limpiar archivo temporal
del temp_email_data.json 2>nul

echo.
echo 🔚 Prueba completada
pause