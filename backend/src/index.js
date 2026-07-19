import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Importar rutas
import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import suppliersRoutes from './routes/suppliers.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middlewares globales ──────────────────────────────────────────────────────

app.use(cors({
  // En desarrollo permitimos el origen del frontend de Vite
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Seguridad en cabeceras HTTP
app.use(helmet());

// Límite de peticiones (100 peticiones cada 15 minutos por IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas peticiones. Por favor, inténtalo más tarde.' }
});
app.use('/api/', apiLimiter);

app.use(express.json());

// ─── Ruta de salud ────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Control Stock API corriendo correctamente',
  });
});

// ─── Rutas de la API ──────────────────────────────────────────────────────────

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/auth', authRoutes);

// ─── Ruta no encontrada (404) ─────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` });
});

// ─── Manejador global de errores ──────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ─── Iniciar servidor ─────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 Control Stock API corriendo en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/api/categories`);
  console.log(`   GET  http://localhost:${PORT}/api/suppliers`);
  console.log(`\n⚙️  CORS habilitado para: http://localhost:5173\n`);
});
