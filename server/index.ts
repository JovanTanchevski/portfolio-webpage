import express from 'express';
import cors from 'cors';
import faqRoutes from './routes/faq.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express app setup with CORS for frontend communication
const app = express();
// Trust the first proxy so rate limiting sees the real client IP when deployed
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// API routes
app.use('/api', faqRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Malformed JSON or oversized payloads return a clean JSON error instead of crashing
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err?.status && err.status >= 400 && err.status < 500 ? err.status : 500;
  res.status(status).json({ error: status === 500 ? 'Internal server error' : 'Invalid request body.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

