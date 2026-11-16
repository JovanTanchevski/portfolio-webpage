import { SYSTEM_PROMPT } from './knowledge.js';
import type { AnswerProvider, ChatMessage } from './types.js';

export class LlmProvider implements AnswerProvider {
  constructor(
    readonly name: string,
    private readonly baseUrl: string,
    private readonly model: string,
    private readonly apiKey: string
  ) {}

  async answer(message: string, history: ChatMessage[]): Promise<string> {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 250,
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: message },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`${this.name} request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) throw new Error(`${this.name} returned an empty response`);
    return text;
  }
}
