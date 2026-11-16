import 'express-session';
import type { ChatMessage } from '../services/ai/types.js';

declare module 'express-session' {
  interface SessionData {
    history?: ChatMessage[];
  }
}
