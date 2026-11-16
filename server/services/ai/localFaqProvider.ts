import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { AnswerProvider, ChatMessage, FaqItem } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const FAQ_DATA: FaqItem[] = JSON.parse(
  readFileSync(join(__dirname, '../../data/faqData.json'), 'utf-8')
);

export const FALLBACK_ANSWER =
  "I'm not sure how to answer that. Try asking about who I am, what I do, or my technologies.";

// Keyword matching against faqData.json. Works fully offline.
function findBestAnswer(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  for (const item of FAQ_DATA) {
    const lowerQuestion = item.question.toLowerCase();
    const questionWords = lowerQuestion.split(/\s+/);
    const matchCount = questionWords.filter(
      (word: string) => word.length > 3 && lowerMessage.includes(word)
    ).length;

    if (
      matchCount >= 2 ||
      lowerMessage.includes(lowerQuestion) ||
      lowerQuestion.includes(lowerMessage)
    ) {
      return item.answer;
    }
  }

  return null;
}

export class LocalFaqProvider implements AnswerProvider {
  readonly name = 'local';

  async answer(message: string, _history: ChatMessage[]): Promise<string> {
    return findBestAnswer(message) ?? FALLBACK_ANSWER;
  }
}
