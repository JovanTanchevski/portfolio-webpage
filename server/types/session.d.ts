import 'express-session';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

declare module 'express-session' {
  interface SessionData {
    history?: ChatMessage[];
  }
}
