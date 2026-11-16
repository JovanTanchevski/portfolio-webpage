import { useState, useRef, useEffect } from 'react';

interface FAQChatProps {
  onClose: () => void;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? '';

const SUGGESTIONS = [
  'What do you do?',
  'What technologies do you use?',
  'Where are you based?',
  'Can I contact you?',
];

function FAQChat({ onClose }: FAQChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/history`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { history: [] }))
      .then((data: { history: Array<{ role: 'user' | 'assistant'; content: string }> }) => {
        setMessages((current) =>
          current.length > 0
            ? current
            : data.history.map((m) => ({
                type: m.role === 'user' ? 'user' : 'bot',
                text: m.content,
              }))
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) inputRef.current?.focus();
  }, []);

  const handleClear = async () => {
    setMessages([]);
    try {
      await fetch(`${API_URL}/api/history`, { method: 'DELETE', credentials: 'include' });
    } catch {
      return;
    }
  };

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;

    setInputValue('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/ask`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json().catch(() => ({}));
      const reply = data.answer ?? data.error ?? 'Something went wrong. Please try again.';
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    } catch (error) {
      console.error('Error fetching FAQ answer:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'I cannot reach the server right now. Please try again in a moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(inputValue);
  };

  return (
    <div
      role="dialog"
      aria-label="Chat"
      className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[26rem] md:h-[34rem] md:max-h-[calc(100dvh-3rem)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] bg-surface/95 backdrop-blur-xl md:border border-line md:rounded-2xl shadow-2xl z-50 flex flex-col"
    >
      <div className="flex items-center justify-between pl-4 pr-2 py-1 border-b border-line">
        <div>
          <h3 className="font-semibold text-fg leading-tight">Ask me anything</h3>
          <p className="text-xs text-muted">About my work, skills and background</p>
        </div>
        <div className="flex items-center space-x-2">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-muted hover:text-fg transition-colors text-sm min-h-11 px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-muted hover:text-fg transition-colors w-11 h-11 flex items-center justify-center"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
        {messages.length === 0 && (
          <div className="pt-6 space-y-3">
            <p className="text-center text-muted text-sm mb-4">Try one of these</p>
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="block w-full text-left text-sm text-fg bg-fg/5 hover:bg-accent/10 border border-line hover:border-accent rounded-xl px-4 py-3 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] break-words rounded-2xl px-4 py-2.5 text-sm ${
                msg.type === 'user'
                  ? 'bg-accent text-canvas rounded-br-sm'
                  : 'bg-fg/5 text-fg rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-fg/5 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-muted">
              Thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 md:p-4 border-t border-line">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            enterKeyHint="send"
            autoComplete="off"
            maxLength={500}
            placeholder="Type your question..."
            aria-label="Your question"
            className="flex-1 min-w-0 bg-fg/5 border border-line rounded-lg px-3 py-2.5 text-fg text-base md:text-sm placeholder:text-muted focus:outline-none focus:border-accent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="bg-accent text-canvas hover:opacity-90 rounded-lg px-4 py-2.5 min-h-11 text-sm font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQChat;
