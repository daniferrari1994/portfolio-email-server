#!/bin/bash

# 🚀 Script de Configuración Completa del Sistema de Email
# Ejecuta este script después de configurar Gmail App Password

echo "🔧 Configurando Sistema de Email del Portfolio..."
echo ""

# Función para mostrar pasos
show_step() {
    echo "📋 $1"
    echo "----------------------------------------"
}

# Paso 1: Verificar estructura de archivos
show_step "Verificando estructura de archivos"

if [ ! -f "server/.env" ]; then
    echo "❌ Falta archivo server/.env"
    echo "💡 Copia server/.env.example a server/.env y configura tus datos de Gmail"
    exit 1
else
    echo "✅ Archivo server/.env encontrado"
fi

if [ ! -f ".env.local" ]; then
    echo "❌ Falta archivo .env.local"
    echo "💡 Copia .env.example a .env.local"
    exit 1
else
    echo "✅ Archivo .env.local encontrado"
fi

# Paso 2: Verificar configuración del servidor
show_step "Verificando configuración del servidor"

cd server

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del servidor..."
    npm install
else
    echo "✅ Dependencias del servidor instaladas"
fi

# Verificar variables de entorno críticas
if grep -q "tu-email@gmail.com" .env; then
    echo "⚠️  IMPORTANTE: Debes configurar tus datos reales en server/.env"
    echo ""
    echo "📝 Edita server/.env con:"
    echo "   EMAIL_USER=tu-email-real@gmail.com"
    echo "   EMAIL_PASS=tu-app-password-de-16-caracteres"
    echo "   OWNER_EMAIL=tu-email-personal@gmail.com"
    echo ""
    echo "🔗 Guía completa en: GMAIL_SETUP.md"
    echo ""
    read -p "¿Ya configuraste Gmail App Password? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "👆 Configura Gmail primero, luego ejecuta este script de nuevo"
        exit 1
    fi
fi

# Paso 3: Probar servidor
show_step "Iniciando servidor de email"

echo "🚀 Iniciando servidor en puerto 3001..."
echo "   Para detener: Ctrl+C"
echo "   Logs del servidor:"
echo ""

# Iniciar servidor
npm run dev

echo ""
echo "🎉 ¡Sistema configurado!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Configura tu frontend para usar el nuevo sistema"
echo "   2. Prueba enviando un email desde el formulario de contacto"
echo "   3. Verifica que recibes el email y el usuario recibe confirmación"
echo ""
echo "🔗 Documentación completa en: EMAIL_SETUP.md"