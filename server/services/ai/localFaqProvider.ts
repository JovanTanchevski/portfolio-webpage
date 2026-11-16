import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import info from '../../../src/lib/data/infoData.json' with { type: 'json' };
import type { AnswerProvider, ChatMessage, FaqItem } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const FAQ_DATA: FaqItem[] = JSON.parse(
  readFileSync(join(__dirname, '../../data/faqData.json'), 'utf-8')
);

export const FALLBACK_ANSWER =
  "I'm not sure how to answer that. Try asking about who I am, what I do, my experience, my technologies or how to contact me.";

const STOP_WORDS = new Set(['the', 'you', 'your', 'are', 'can', 'what', 'how', 'and', 'for', 'with', 'this', 'that', 'have', 'does', 'do', 'did', 'me', 'my', 'is', 'it', 'of', 'to', 'in', 'on', 'at', 'be', 'any']);

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9.+#]+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

function findBestAnswer(message: string): string | null {
  const words = new Set(tokenize(message));
  let best: { score: number; answer: string } | null = null;

  for (const item of FAQ_DATA) {
    const vocabulary = new Set([...tokenize(item.question), ...(item.keywords ?? [])]);
    let score = 0;
    for (const word of words) if (vocabulary.has(word)) score++;
    if (message.toLowerCase().includes(item.question.toLowerCase())) score += 3;

    if (score > 0 && (!best || score > best.score)) best = { score, answer: item.answer };
  }

  return best ? best.answer : null;
}

export class LocalFaqProvider implements AnswerProvider {
  readonly name = 'local';

  async answer(message: string, history: ChatMessage[]): Promise<string> {
    if (/\b(years?|how long)\b/i.test(message) && /\b(experience|work|working|javascript|typescript|react|developer)\b/i.test(message)) {
      const startYear = Math.min(...info.workExperience.map((job) => Number(job.period.match(/\d{4}/)?.[0])));
      const years = new Date().getFullYear() - startYear;
      return `About ${years} years of professional experience, starting in ${startYear}.`;
    }

    const direct = findBestAnswer(message);
    if (direct) return direct;

    const lastQuestion = [...history].reverse().find((m) => m.role === 'user');
    if (lastQuestion && message.split(/\s+/).length <= 4) {
      if (/\b(more|else|another|elaborate|details?)\b/i.test(message)) {
        const lastAnswer = [...history].reverse().find((m) => m.role === 'assistant');
        if (lastAnswer) {
          return `${lastAnswer.content} You can find more in the Info section, or reach out via Contact.`;
        }
      }

      const contextual = findBestAnswer(`${lastQuestion.content} ${message}`);
      if (contextual) return contextual;
    }

    return FALLBACK_ANSWER;
  }
}
