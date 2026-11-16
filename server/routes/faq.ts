import express from 'express';
import { askRateLimiter } from '../middleware/rateLimit.js';
import { sanitizeMessage } from '../middleware/sanitize.js';
import { getAnswer } from '../services/ai/index.js';

const router = express.Router();

const MAX_HISTORY = 20;

// POST endpoint to handle FAQ questions
router.post('/ask', askRateLimiter, sanitizeMessage, async (req, res) => {
  try {
    const { message } = req.body;
    const history = req.session.history ?? [];

    const answer = await getAnswer(message, history);

    // Keep a short per-session transcript
    history.push({ role: 'user', content: message }, { role: 'assistant', content: answer });
    req.session.history = history.slice(-MAX_HISTORY);

    res.json({ answer });
  } catch (error) {
    console.error('Error processing FAQ request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Returns the current session's conversation so the chat can be restored after a reload
router.get('/history', (req, res) => {
  res.json({ history: req.session.history ?? [] });
});

// Starts a fresh conversation
router.delete('/history', (req, res) => {
  req.session.history = [];
  res.status(204).end();
});

export default router;
