export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnswerProvider {
  readonly name: string;
  answer(message: string, history: ChatMessage[]): Promise<string>;
}

export interface FaqItem {
  question: string;
  answer: string;
  keywords?: string[];
}
