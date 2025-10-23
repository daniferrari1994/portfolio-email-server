#!/bin/bash

# 🧪 Test del Sistema de Email - Script de Prueba

echo "🧪 Probando Sistema de Email del Portfolio"
echo "=========================================="
echo ""

# Verificar que el servidor esté ejecutándose
echo "📡 Verificando servidor..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Servidor respondiendo en puerto 3001"
else
    echo "❌ Servidor no responde. ¿Está ejecutándose?"
    echo "💡 Ejecuta: cd server && npm run dev"
    exit 1
fi

echo ""
echo "📧 Enviando email de prueba..."
echo ""

# Datos de prueba
EMAIL_DATA='{
  "firstName": "Test",
  "lastName": "Usuario", 
  "email": "test@example.com",
  "phoneNumber": "+54 9 11 1234-5678",
  "message": "Este es un mensaje de prueba del sistema de email del portfolio. ¡Funciona perfectamente!",
  "language": "es"
}'

# Enviar email de prueba
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$EMAIL_DATA" \
  http://localhost:3001/api/send-email)

# Verificar respuesta
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "🎉 ¡EMAIL ENVIADO EXITOSAMENTE!"
    echo ""
    echo "✅ Verifica tu email (el configurado como OWNER_EMAIL)"
    echo "✅ El usuario test@example.com debería recibir confirmación"
    echo ""
    echo "📋 Respuesta del servidor:"
    echo "$RESPONSE" | python -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo "❌ Error al enviar email"
    echo ""
    echo "📋 Respuesta del servidor:"
    echo "$RESPONSE"
    echo ""
    echo "💡 Verifica la configuración de Gmail App Password"
fi

echo ""
echo "🔚 Prueba completada"