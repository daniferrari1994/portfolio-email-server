import { jest } from '@jest/globals';

// Mock de nodemailer - versión final corregida
const mockSendMail = jest.fn();
const mockVerify = jest.fn();

// Mock del transportador
const mockTransporter = {
  sendMail: mockSendMail,
  verify: mockVerify
};

// Mock de nodemailer con la función createTransporter
const mockNodemailer = {
  createTransporter: jest.fn().mockReturnValue(mockTransporter)
};

// Mock completo del módulo nodemailer
jest.unstable_mockModule('nodemailer', () => ({
  default: mockNodemailer
}));

const originalEnv = process.env;

describe('Portfolio Email Server - Unit Tests', () => {
  let sendEmailHandler;

  beforeAll(async () => {
    // Configurar variables de entorno para testing
    process.env = {
      ...originalEnv,
      EMAIL_SERVICE: 'gmail',
      EMAIL_USER: 'test@gmail.com',
      EMAIL_PASS: 'test-password',
      OWNER_EMAIL: 'owner@gmail.com',
      NODE_ENV: 'test'
    };

    // Importar el handler después de configurar mocks
    const module = await import('../api/send-email.js');
    sendEmailHandler = module.default;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockVerify.mockResolvedValue(true);
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    mockNodemailer.createTransporter.mockReturnValue(mockTransporter);
  });

  // Helper para crear request/response mock con IPs únicas
  const createMockContext = (body = {}, method = 'POST') => {
    const uniqueIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const req = {
      method,
      body,
      headers: {
        'x-forwarded-for': uniqueIP,
        'content-type': 'application/json'
      },
      connection: {
        remoteAddress: uniqueIP
      }
    };

    const res = {
      setHeader: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      end: jest.fn(() => res)
    };

    return { req, res };
  };

  describe('Basic API Tests', () => {
    test('should handle OPTIONS request (CORS preflight)', async () => {
      const { req, res } = createMockContext({}, 'OPTIONS');
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    test('should reject GET requests', async () => {
      const { req, res } = createMockContext({}, 'GET');
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Método no permitido'
      });
    });

    test('should require all required fields', async () => {
      const { req, res } = createMockContext({
        firstName: 'John'
        // Faltan otros campos requeridos
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Todos los campos requeridos deben estar completos'
      });
    });

    test('should validate email format', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email-format',
        message: 'Test message'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'El formato del email no es válido'
      });
    });

    test('should reject blocked domains', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com', // Dominio bloqueado
        message: 'Test message'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Dominio de email no permitido'
      });
    });

    test('should set CORS headers correctly', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@validcompany.com',
        message: 'Test message'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Credentials', true);
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'Content-Type');
    });
  });

  describe('Email Functionality Tests', () => {
    test('should send emails successfully with valid data', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@validcompany.com',
        phoneNumber: '+1234567890',
        message: 'This is a test message'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Emails enviados correctamente'
      });
      
      // Verificar que se llamó a verify y sendMail
      expect(mockVerify).toHaveBeenCalled();
      expect(mockSendMail).toHaveBeenCalledTimes(2); // Owner + User email
    });

    test('should handle email service errors', async () => {
      // Simular error en el servicio de email
      mockVerify.mockRejectedValue(new Error('SMTP Authentication failed'));
      
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@validcompany.com',
        message: 'Test message'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Error interno del servidor al enviar el email'
      });
    });

    test('should use English template when specified', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@validcompany.com',
        message: 'Test message',
        language: 'en'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockSendMail).toHaveBeenCalledTimes(2);
      
      // Verificar que se usó el template en inglés
      const userEmailCall = mockSendMail.mock.calls.find(call => 
        call[0].to === 'john@validcompany.com'
      );
      
      expect(userEmailCall).toBeDefined();
      expect(userEmailCall[0].subject).toContain('Thanks for contacting me');
    });

    test('should create owner notification email', async () => {
      const { req, res } = createMockContext({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@validcompany.com',
        phoneNumber: '+1987654321',
        message: 'Hello from the tests!'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      
      // Verificar email al propietario
      const ownerEmailCall = mockSendMail.mock.calls.find(call => 
        call[0].to === 'owner@gmail.com'
      );
      
      expect(ownerEmailCall).toBeDefined();
      expect(ownerEmailCall[0]).toEqual(
        expect.objectContaining({
          from: 'test@gmail.com',
          to: 'owner@gmail.com',
          subject: expect.stringContaining('Nuevo mensaje de contacto - Jane Smith'),
          html: expect.stringContaining('Jane Smith')
        })
      );
    });

    test('should create user confirmation email', async () => {
      const { req, res } = createMockContext({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@validcompany.com',
        message: 'Hello from the tests!'
      });
      
      await sendEmailHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      
      // Verificar email de confirmación al usuario
      const userEmailCall = mockSendMail.mock.calls.find(call => 
        call[0].to === 'jane@validcompany.com'
      );
      
      expect(userEmailCall).toBeDefined();
      expect(userEmailCall[0]).toEqual(
        expect.objectContaining({
          from: 'test@gmail.com',
          to: 'jane@validcompany.com',
          subject: expect.stringContaining('Gracias por contactarme'),
          html: expect.stringContaining('Jane')
        })
      );
    });
  });

  describe('Health Check Tests', () => {
    let healthHandler;

    beforeAll(async () => {
      const healthModule = await import('../api/health.js');
      healthHandler = healthModule.default;
    });

    test('should return health status', async () => {
      const { req, res } = createMockContext({}, 'GET');
      
      await healthHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'OK',
        service: 'portfolio-email-server',
        timestamp: expect.any(String),
        version: '2.0.0-vercel'
      });
    });
  });

  describe('Configuration Tests', () => {
    test('should use correct transporter configuration', async () => {
      const { req, res } = createMockContext({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@validcompany.com',
        message: 'Test message'
      });
      
      await sendEmailHandler(req, res);
      
      // Verificar que se llamó createTransporter con la configuración correcta
      expect(mockNodemailer.createTransporter).toHaveBeenCalledWith({
        service: 'gmail',
        auth: {
          user: 'test@gmail.com',
          pass: 'test-password'
        },
        secure: true,
        tls: {
          rejectUnauthorized: false
        }
      });
    });
  });
});