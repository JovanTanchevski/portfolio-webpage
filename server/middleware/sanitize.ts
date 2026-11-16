import type { NextFunction, Request, Response } from 'express';

export const MAX_MESSAGE_LENGTH = 500;

// Strips HTML tags, control characters and collapses whitespace
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>?/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Validates and cleans req.body.message before it reaches the route handler
export function sanitizeMessage(req: Request, res: Response, next: NextFunction) {
  const raw = req.body?.message;

  if (typeof raw !== 'string') {
    return res.status(400).json({ error: 'Message must be a string.' });
  }

  const message = sanitizeText(raw);

  if (!message) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res
      .status(400)
      .json({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` });
  }

  req.body.message = message;
  next();
}
