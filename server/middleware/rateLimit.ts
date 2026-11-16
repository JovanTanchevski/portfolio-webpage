import rateLimit from 'express-rate-limit';

// Limits each IP to 20 FAQ requests per minute
export const askRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute before asking again.' },
});
