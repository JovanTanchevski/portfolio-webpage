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

  async answer(message: string, history: ChatMessage[]): Promise<string> {
    const direct = findBestAnswer(message);
    if (direct) return direct;

    // Follow-ups like "and where?" or "tell me more" have no keywords of their own,
    // so retry with the previous user question as context.
    const lastQuestion = [...history].reverse().find((m) => m.role === 'user');
    if (lastQuestion) {
      if (/\b(more|else|another|elaborate|details?)\b/i.test(message)) {
        const lastAnswer = [...history].reverse().find((m) => m.role === 'assistant');
        if (lastAnswer) {
          return `${lastAnswer.content} You can find more on the Info page, or reach out via the Contact page.`;
        }
      }

      const contextual = findBestAnswer(`${lastQuestion.content} ${message}`);
      if (contextual) return contextual;
    }

    return FALLBACK_ANSWER;
  }
}
