import { LocalFaqProvider } from './localFaqProvider.js';
import { LlmProvider } from './llmProvider.js';
import type { AnswerProvider, ChatMessage } from './types.js';

const PRESETS: Record<string, { baseUrl: string; model: string }> = {
  groq: { baseUrl: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile' },
  gemini: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    model: 'gemini-2.5-flash',
  },
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
};

const localProvider = new LocalFaqProvider();

function createProvider(): AnswerProvider {
  const name = (process.env.AI_PROVIDER || 'local').toLowerCase();
  if (name === 'local') return localProvider;

  const preset = PRESETS[name];
  const baseUrl = process.env.AI_BASE_URL || preset?.baseUrl;
  const model = process.env.AI_MODEL || preset?.model;
  const apiKey = process.env.AI_API_KEY;

  if (!baseUrl || !model || !apiKey) {
    console.warn(
      `AI_PROVIDER=${name} needs AI_API_KEY (plus AI_BASE_URL and AI_MODEL for custom providers). Using the local FAQ provider.`
    );
    return localProvider;
  }

  console.log(`FAQ chat is using ${name} (${model})`);
  return new LlmProvider(name, baseUrl, model, apiKey);
}

const provider = createProvider();

export async function getAnswer(message: string, history: ChatMessage[]): Promise<string> {
  try {
    return await provider.answer(message, history);
  } catch (error) {
    console.error(`AI provider "${provider.name}" failed, using local fallback:`, error);
    return localProvider.answer(message, history);
  }
}

export type { AnswerProvider, ChatMessage } from './types.js';
