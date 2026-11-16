import session from 'express-session';
import { randomBytes } from 'crypto';

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in production.');
}

// Cookie-based session with secure defaults. Uses the in-memory store,
// which is fine for a single instance; swap in a persistent store when scaling out.
export const sessionMiddleware = session({
  name: 'faq.sid',
  secret: process.env.SESSION_SECRET || randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
  },
});
