import nodemailer from 'nodemailer';

// Configuración del transportador de email
const createTransporter = () => {
  const config = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    secure: process.env.EMAIL_SERVICE === 'gmail',
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransporter(config);
};

// Template para email de confirmación al usuario
const getUserEmailTemplate = (firstName, lastName, language = 'es') => {
  const templates = {
    es: {
      subject: '¡Gracias por contactarme! - Dan Ferrari',
      html: `
        <div style="font-family: 'Roboto Mono', monospace; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffffea; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5ad3bd; margin-bottom: 10px;">¡Hola ${firstName}!</h1>
            <p style="color: #ffffffea; font-size: 16px;">Gracias por contactarme</p>
          </div>
          
          <div style="background-color: #2d2d2d; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #5ad3bd; margin-bottom: 15px;">Tu mensaje ha sido recibido</h2>
            <p style="line-height: 1.6; margin-bottom: 15px;">
              Hola <strong>${firstName} ${lastName}</strong>,
            </p>
            <p style="line-height: 1.6; margin-bottom: 15px;">
              He recibido tu mensaje y me pondré en contacto contigo lo antes posible. 
              Generalmente respondo dentro de las próximas 24-48 horas.
            </p>
            <p style="line-height: 1.6;">
              Mientras tanto, puedes revisar algunos de mis proyectos en mi portfolio 
              o conectar conmigo en LinkedIn.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; border-top: 1px solid #459c8c;">
            <p style="margin-bottom: 10px;">
              <strong style="color: #5ad3bd;">Dan Ferrari</strong><br>
              Desarrollador Full Stack
            </p>
            <p style="font-size: 14px; color: #b0b0b0;">
              Este es un email automático, por favor no respondas a este mensaje.
            </p>
          </div>
        </div>
      `
    },
    en: {
      subject: 'Thanks for contacting me! - Dan Ferrari',
      html: `
        <div style="font-family: 'Roboto Mono', monospace; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffffea; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5ad3bd; margin-bottom: 10px;">Hello ${firstName}!</h1>
            <p style="color: #ffffffea; font-size: 16px;">Thanks for reaching out</p>
          </div>
          
          <div style="background-color: #2d2d2d; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #5ad3bd; margin-bottom: 15px;">Your message has been received</h2>
            <p style="line-height: 1.6; margin-bottom: 15px;">
              Hi <strong>${firstName} ${lastName}</strong>,
            </p>
            <p style="line-height: 1.6; margin-bottom: 15px;">
              I've received your message and will get back to you as soon as possible. 
              I typically respond within the next 24-48 hours.
            </p>
            <p style="line-height: 1.6;">
              In the meantime, feel free to check out some of my projects in my portfolio 
              or connect with me on LinkedIn.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; border-top: 1px solid #459c8c;">
            <p style="margin-bottom: 10px;">
              <strong style="color: #5ad3bd;">Dan Ferrari</strong><br>
              Full Stack Developer
            </p>
            <p style="font-size: 14px; color: #b0b0b0;">
              This is an automated email, please do not reply to this message.
            </p>
          </div>
        </div>
      `
    }
  };
  
  return templates[language] || templates.es;
};

// Template para el email que recibes tú
const getOwnerEmailTemplate = (formData) => {
  return {
    subject: `Nuevo mensaje de contacto - ${formData.firstName} ${formData.lastName}`,
    html: `
      <div style="font-family: 'Roboto Mono', monospace; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px; background-color: #1a1a1a; padding: 20px; border-radius: 8px;">
          <h1 style="color: #5ad3bd; margin-bottom: 10px;">Nuevo mensaje de contacto</h1>
          <p style="color: #ffffffea; font-size: 16px;">Portfolio - Dani Ferrari</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #5ad3bd; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #5ad3bd; padding-bottom: 10px;">
            Información del contacto
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #459c8c;">Nombre:</strong> 
            <span style="color: #333;">${formData.firstName} ${formData.lastName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #459c8c;">Email:</strong> 
            <a href="mailto:${formData.email}" style="color: #007bff; text-decoration: none;">${formData.email}</a>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #459c8c;">Teléfono:</strong> 
            <span style="color: #333;">${formData.phoneNumber}</span>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 15px;">
            <strong style="color: #459c8c; display: block; margin-bottom: 10px;">Mensaje:</strong>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6; white-space: pre-wrap;">${formData.message}</div>
          </div>
        </div>
        
        <div style="text-align: center; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
          <p style="margin: 0;">
            Recibido el ${new Date().toLocaleString('es-ES', { 
              timeZone: 'America/Argentina/Buenos_Aires',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    `
  };
};

// Rate limiting simple para Vercel
const rateLimitMap = new Map();

const rateLimit = (identifier, limit = 5, windowMs = 60 * 60 * 1000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }
  
  const requests = rateLimitMap.get(identifier);
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true;
};

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!rateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        error: 'Demasiadas solicitudes. Intenta de nuevo en una hora.'
      });
    }

    const { firstName, lastName, email, phoneNumber, message, language } = req.body;

    // Validación básica
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos requeridos deben estar completos'
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'El formato del email no es válido'
      });
    }

    // Validación adicional para prevenir interpretación de dominios conflictivos
    const sanitizedEmail = email.toLowerCase().trim();
    if (sanitizedEmail !== email) {
      return res.status(400).json({
        success: false,
        error: 'El email contiene caracteres no válidos'
      });
    }

    // Lista básica de dominios bloqueados
    const blockedDomains = ['example.com', 'test.com', 'localhost'];
    const emailDomain = sanitizedEmail.split('@')[1];
    if (blockedDomains.includes(emailDomain)) {
      return res.status(400).json({
        success: false,
        error: 'Dominio de email no permitido'
      });
    }

    const transporter = createTransporter();

    // Verificar conexión con el servidor de email
    await transporter.verify();

    const formData = { firstName, lastName, email: sanitizedEmail, phoneNumber, message };

    // Email para ti (el dueño del portfolio)
    const ownerEmailTemplate = getOwnerEmailTemplate(formData);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: ownerEmailTemplate.subject,
      html: ownerEmailTemplate.html,
      headers: {
        'X-Mailer': 'Portfolio Contact Form',
        'X-Priority': '3'
      }
    });

    // Email de confirmación para el usuario
    const userEmailTemplate = getUserEmailTemplate(firstName, lastName, language);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sanitizedEmail,
      subject: userEmailTemplate.subject,
      html: userEmailTemplate.html,
      headers: {
        'X-Mailer': 'Portfolio Contact Form',
        'X-Priority': '3'
      }
    });

    console.log(`Email enviado exitosamente desde ${sanitizedEmail}`);

    res.status(200).json({
      success: true,
      message: 'Emails enviados correctamente'
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor al enviar el email'
    });
  }
}