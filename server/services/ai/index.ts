import { LocalFaqProvider } from './localFaqProvider.js';
import { OpenAIProvider } from './openaiProvider.js';
import type { AnswerProvider, ChatMessage } from './types.js';

const localProvider = new LocalFaqProvider();

// Picks the provider from AI_PROVIDER ("local" by default)
function createProvider(): AnswerProvider {
  if (process.env.AI_PROVIDER === 'openai') {
    if (process.env.OPENAI_API_KEY) {
      return new OpenAIProvider(process.env.OPENAI_API_KEY);
    }
    console.warn('AI_PROVIDER=openai but OPENAI_API_KEY is missing. Using local FAQ provider.');
  }
  return localProvider;
}

const provider = createProvider();

// Answers with the configured provider and falls back to the local JSON FAQ if it fails,
// so the chat keeps working offline or when the external service is down.
export async function getAnswer(message: string, history: ChatMessage[]): Promise<string> {
  try {
    return await provider.answer(message, history);
  } catch (error) {
    console.error(`AI provider "${provider.name}" failed, using local fallback:`, error);
    return localProvider.answer(message, history);
  }
}

export type { AnswerProvider, ChatMessage } from './types.js';
