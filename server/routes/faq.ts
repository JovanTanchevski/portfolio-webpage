import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { askRateLimiter } from '../middleware/rateLimit.js';
import { sanitizeMessage } from '../middleware/sanitize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load FAQ data from JSON file
const faqDataPath = join(__dirname, '../data/faqData.json');
const faqData = JSON.parse(readFileSync(faqDataPath, 'utf-8'));

// Simple keyword matching function to find the best answer
function findBestAnswer(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Try to find exact or partial match
  for (const item of faqData) {
    const lowerQuestion = item.question.toLowerCase();
    // Check if message contains key words from question
    const questionWords = lowerQuestion.split(/\s+/);
    const matchCount = questionWords.filter(word => 
      word.length > 3 && lowerMessage.includes(word)
    ).length;
    
    if (matchCount >= 2 || lowerMessage.includes(lowerQuestion) || lowerQuestion.includes(lowerMessage)) {
      return item.answer;
    }
  }
  
  // Default fallback answer
  return "I'm not sure how to answer that. Try asking about who I am, what I do, or my technologies.";
}

// POST endpoint to handle FAQ questions
router.post('/ask', askRateLimiter, sanitizeMessage, (req, res) => {
  try {
    const { message } = req.body;
    const answer = findBestAnswer(message);

    // Keep a short per-session transcript (last 20 messages)
    const history = req.session.history ?? [];
    history.push({ role: 'user', content: message }, { role: 'assistant', content: answer });
    req.session.history = history.slice(-20);

    res.json({ answer });
  } catch (error) {
    console.error('Error processing FAQ request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

