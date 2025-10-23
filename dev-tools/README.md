# 🛠️ Herramientas de Desarrollo - Email Server

Esta carpeta contiene herramientas útiles para configurar, probar y mantener el servidor de email.

## 📋 Archivos Disponibles

### 🔧 **Scripts de Configuración**

#### `setup-email.bat` (Windows)
Script completo para configurar el sistema de email en Windows:
- Verifica archivos de configuración
- Instala dependencias si faltan
- Valida configuración de Gmail
- Inicia el servidor

**Uso:**
```bash
./setup-email.bat
```

#### `setup-email.sh` (Linux/Mac)
Mismo script para sistemas Unix/Linux/MacOS:

**Uso:**
```bash
chmod +x setup-email.sh
./setup-email.sh
```

### 🧪 **Scripts de Prueba**

#### `test-email-script.bat` (Windows)
Prueba automática del envío de emails en Windows:
- Verifica que el servidor esté ejecutándose
- Envía un email de prueba
- Muestra la respuesta del servidor

**Uso:**
```bash
./test-email-script.bat
```

#### `test-email-script.sh` (Linux/Mac)
Mismo script de prueba para sistemas Unix:

**Uso:**
```bash
chmod +x test-email-script.sh
./test-email-script.sh
```

### 🌐 **Página de Prueba**

#### `test-email.html`
Página web interactiva para probar el sistema de email:
- Formulario de contacto visual
- Envío AJAX al servidor
- Respuestas en tiempo real
- Interfaz con el estilo del portfolio

**Uso:**
1. Asegúrate que el servidor esté ejecutándose
2. Abre el archivo en tu navegador
3. Llena el formulario y envía

## 🚀 **Flujo de Trabajo Recomendado**

### **Primera vez (configuración):**
```bash
# 1. Configurar todo el sistema
./setup-email.bat
```

### **Desarrollo/Testing:**
```bash
# 1. Iniciar servidor manualmente
cd ..
npm run dev

# 2. En otra terminal, probar
cd dev-tools
./test-email-script.bat
```

### **Prueba visual:**
```bash
# Con servidor ejecutándose
start test-email.html  # Windows
open test-email.html   # Mac
```

## 📝 **Configuración Previa Necesaria**

Antes de usar estas herramientas:

1. **Gmail App Password configurada** (ver documentación principal)
2. **Archivo `.env` configurado** con tus datos
3. **Dependencias instaladas** (`npm install`)

## 🆘 **Troubleshooting**

### Error: "Servidor no responde"
```bash
# Verificar que el servidor esté ejecutándose
cd ..
npm run dev
```

### Error: "Authentication failed"
- Verificar Gmail App Password en `.env`
- Comprobar que 2FA esté activada en Gmail

### Error: "CORS"
- Verificar `FRONTEND_URL` en `.env`
- Comprobar que coincida con la URL del frontend

## 🔗 **Enlaces Útiles**

- **Servidor principal:** `../server.js`
- **Configuración:** `../.env`
- **Documentación Gmail:** Buscar guías online de App Password
- **Logs del servidor:** Se muestran en la terminal donde ejecutas `npm run dev`

---

**💡 Tip:** Estas herramientas son solo para desarrollo. En producción solo necesitas `server.js`, `package.json` y `.env`.