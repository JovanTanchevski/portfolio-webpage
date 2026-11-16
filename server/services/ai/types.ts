export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Anything that can answer a question, given the conversation so far.
// Implement this to plug in a new backend (OpenAI, Anthropic, local model, ...).
export interface AnswerProvider {
  readonly name: string;
  answer(message: string, history: ChatMessage[]): Promise<string>;
}

export interface FaqItem {
  question: string;
  answer: string;
}
