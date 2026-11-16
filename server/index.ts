import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { sessionMiddleware } from './middleware/session.js';
import faqRoutes from './routes/faq.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express app setup with CORS for frontend communication
const app = express();
if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);
const PORT = process.env.PORT || 3001;

app.use(helmet());

const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(Object.assign(new Error('Not allowed by CORS'), { status: 403 }));
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(sessionMiddleware);

// API routes
app.use('/api', faqRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err?.status && err.status >= 400 && err.status < 500 ? err.status : 500;
  const error =
    status === 500 ? 'Internal server error' : status === 403 ? 'Origin not allowed.' : 'Invalid request body.';
  res.status(status).json({ error });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

