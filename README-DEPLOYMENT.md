# 📧 Portfolio Email Server

Servidor de email serverless para formularios de contacto de portfolio, desplegado en Vercel.

## 🚀 URLs de Deployment

- **🌐 Producción**: https://portfolio-email-server-kprulsz0p-dan-leons-projects-9fc65c34.vercel.app
- **🔍 Preview**: https://portfolio-email-server-ocwz3h6vs-dan-leons-projects-9fc65c34.vercel.app

## 📋 APIs Disponibles

### GET `/api/health`
Endpoint de health check para verificar que el servicio esté funcionando.

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-23T05:17:20.937Z",
  "service": "portfolio-email-server",
  "version": "2.0.0-vercel"
}
```

### POST `/api/send-email`
Envía emails de contacto desde el formulario del portfolio.

**Body requerido:**
```json
{
  "firstName": "Nombre",
  "lastName": "Apellido", 
  "email": "usuario@ejemplo.com",
  "phoneNumber": "+123456789",
  "message": "Mensaje de contacto",
  "language": "es" // opcional: "es" o "en"
}
```

## ⚙️ Configuración

### Variables de Entorno Requeridas

Ejecuta `setup-env-vars.bat` (Windows) o `setup-env-vars.sh` (Linux/Mac) para ver las instrucciones completas.

Variables necesarias:
- `EMAIL_SERVICE`: Servicio de email (gmail, outlook, etc.)
- `EMAIL_USER`: Tu email para enviar
- `EMAIL_PASS`: App password (NO tu contraseña normal)
- `OWNER_EMAIL`: Email donde recibes los mensajes
- `FRONTEND_URL`: URL de tu portfolio frontend

### Configurar Variables en Vercel

```bash
vercel env add EMAIL_SERVICE production
vercel env add EMAIL_USER production  
vercel env add EMAIL_PASS production
vercel env add OWNER_EMAIL production
vercel env add FRONTEND_URL production
```

Después de configurar las variables:
```bash
vercel --prod
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo local con Express
npm run dev

# Desarrollo local con Vercel
npm run vercel-dev
```

## 📧 Configuración de Gmail

Para usar Gmail como servicio de email:

1. Habilita la verificación en 2 pasos
2. Ve a **Cuenta de Google** > **Seguridad** > **Verificación en 2 pasos**
3. Busca **Contraseñas de aplicaciones**
4. Genera una nueva contraseña para "Correo"
5. Usa esa contraseña de 16 caracteres como `EMAIL_PASS`

## 🔧 Scripts Disponibles

- `npm start` - Servidor Express local
- `npm run dev` - Desarrollo con nodemon
- `npm run vercel-dev` - Desarrollo con Vercel CLI
- `npm run deploy` - Deploy a producción

## 📁 Estructura del Proyecto

```
├── api/
│   ├── health.js           # Health check endpoint
│   └── send-email.js       # Email sending function
├── public/
│   └── index.html          # API documentation page
├── dev-tools/              # Herramientas de desarrollo
├── server.js               # Servidor Express local
├── vercel.json             # Configuración de Vercel
└── package.json
```

## 🔒 Seguridad

- Rate limiting: máximo 5 emails por hora por IP
- Validación de email con regex
- Sanitización de inputs
- Headers de seguridad con Helmet
- CORS configurado

## 🌐 CORS

Por defecto configurado para aceptar requests desde cualquier origen (`*`). 
Para producción, configura `FRONTEND_URL` con la URL específica de tu portfolio.

## 📱 Uso desde el Frontend

```javascript
const response = await fetch('https://portfolio-email-server-kprulsz0p-dan-leons-projects-9fc65c34.vercel.app/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@ejemplo.com',
    phoneNumber: '+123456789',
    message: 'Hola, me interesa tu trabajo',
    language: 'es'
  })
});

const result = await response.json();
console.log(result);
```

## 🚀 Deployment a Vercel

### Estado Actual
✅ **Deploy exitoso** - El proyecto está funcionando en Vercel

### Configuración Realizada
- Corregido `vercel.json` para funciones serverless
- Creado directorio `public/` con documentación de API
- Configurado `.vercelignore` para optimizar deployment
- Scripts de configuración de variables de entorno

### Próximos Pasos
1. Configura las variables de entorno usando los scripts proporcionados
2. Redeploy después de configurar las variables: `vercel --prod`
3. Conecta con tu frontend portfolio

### URLs de Desarrollo
- Preview deployments se generan automáticamente en cada push
- Production URL es estable y se puede usar en el frontend

---

**⚠️ Importante:** Configura las variables de entorno antes de usar en producción. Sin ellas, el envío de emails fallará.