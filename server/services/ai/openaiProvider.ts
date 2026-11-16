import { FAQ_DATA } from './localFaqProvider.js';
import type { AnswerProvider, ChatMessage } from './types.js';

const SYSTEM_PROMPT = `You are the assistant on a developer's portfolio website.
Answer questions about the developer briefly and politely, using only the facts below.
If the answer is not in the facts, say you don't know and suggest using the contact links.

Facts:
${FAQ_DATA.map((item) => `- ${item.question} ${item.answer}`).join('\n')}`;

// Calls the OpenAI Chat Completions API. Enabled with AI_PROVIDER=openai and OPENAI_API_KEY.
export class OpenAIProvider implements AnswerProvider {
  readonly name = 'openai';

  constructor(
    private readonly apiKey: string,
    private readonly model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  ) {}

  async answer(message: string, history: ChatMessage[]): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: message },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) throw new Error('OpenAI returned an empty response');
    return text;
  }
}
