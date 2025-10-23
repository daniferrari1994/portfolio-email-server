# 📧 Portfolio Email Server

Servidor backend personalizado para manejo de emails de contacto en portfolios. Reemplaza servicios como EmailJS con una solución propia más segura y personalizable.

## 🎯 Características

- ✅ **Envío dual de emails**: Notificación al propietario + confirmación al usuario
- ✅ **Templates HTML personalizados** en español e inglés
- ✅ **Seguridad robusta**: Rate limiting, validaciones, CORS
- ✅ **Compatible con Gmail** mediante App Password
- ✅ **Sin dependencias externas** como EmailJS

## 🚀 Tecnologías

- **Node.js** + **Express**
- **Nodemailer** 7.0.9 (sin vulnerabilidades)
- **Helmet** para seguridad
- **Express Rate Limit** para protección contra spam

## 🔧 Configuración Rápida

### 1. Clonar e instalar
```bash
git clone <tu-repo>
cd portfolio-email-server
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus datos reales
```

### 3. Configurar Gmail App Password
Ver [documentación detallada](./dev-tools/README.md#configuración-gmail)

### 4. Iniciar servidor
```bash
npm run dev  # Desarrollo
npm start    # Producción
```

## 📋 Variables de Entorno

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-16-caracteres
OWNER_EMAIL=tu-email-personal@gmail.com
NODE_ENV=development
```

## 📡 API Endpoints

### `POST /api/send-email`
Envía emails de contacto.

**Request:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com", 
  "phoneNumber": "+54 9 11 1234-5678",
  "message": "Mensaje de contacto",
  "language": "es"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emails enviados correctamente"
}
```

### `GET /api/health`
Health check del servidor.

### `GET /api/test`
Test de conectividad.

## 🛠️ Herramientas de Desarrollo

La carpeta `dev-tools/` contiene scripts útiles:

- **setup-email.bat/.sh** - Configuración automática
- **test-email-script.bat/.sh** - Prueba de envío
- **test-email.html** - Página de prueba visual

Ver [documentación completa](./dev-tools/README.md).

## 🔒 Seguridad

### Medidas implementadas:
- **Rate limiting**: 5 emails/hora por IP
- **Validación de entrada**: Sanitización y formato
- **CORS configurado**: Solo orígenes autorizados
- **Headers de seguridad**: Helmet middleware
- **Variables de entorno**: Credenciales nunca en código

### Configuración segura:
```javascript
// Ejemplo de uso de variables de entorno
const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🌐 Despliegue

### Plataformas recomendadas:
- **Railway** (más fácil)
- **Heroku**
- **DigitalOcean App Platform**
- **Vercel** (con serverless functions)

### Variables para producción:
```env
NODE_ENV=production
FRONTEND_URL=https://tu-dominio.com
# Resto de variables igual
```

## 🎨 Templates de Email

### Para el propietario:
- Información completa del contacto
- Diseño profesional y legible
- Email del usuario clickeable
- Timestamp con zona horaria

### Para el usuario:
- Confirmación personalizada
- Branding consistente con el portfolio
- Información de contacto
- Soporte multiidioma

## 📈 Monitoring

El servidor registra automáticamente:
- ✅ Emails enviados exitosamente
- ❌ Errores de autenticación
- 🚫 Rate limit hits
- ⚠️ Requests malformados

## 🆘 Troubleshooting

### Error: "Authentication failed"
- Verificar Gmail App Password
- Comprobar verificación en 2 pasos

### Error: "CORS"
- Verificar `FRONTEND_URL` en .env
- Actualizar dominio en producción

### Error: "Rate limit exceeded"
- Comportamiento normal de protección
- Ajustar límites si necesario

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📧 Contacto

Si tienes preguntas o sugerencias sobre este proyecto, no dudes en contactarme.

---

**⚠️ Nota de Seguridad:** Nunca subas tus archivos `.env` con datos reales a repositorios públicos. Siempre usa variables de entorno en producción.