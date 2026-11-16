import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';

// FAQ Chat component - floating chat bubble that appears in FAQ section
function FAQChat() {
  const [isOpen, setIsOpen] = useLocalStorage('faq-chat-open', false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Restore the conversation stored in the server session
  useEffect(() => {
    fetch(`${apiUrl}/api/history`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { history: [] }))
      .then((data: { history: Array<{ role: 'user' | 'assistant'; content: string }> }) => {
        setMessages(
          data.history.map((m) => ({
            type: m.role === 'user' ? 'user' : 'bot',
            text: m.content,
          }))
        );
      })
      .catch(() => {});
  }, [apiUrl]);

  // Clear the conversation on the server and locally
  const handleClear = async () => {
    setMessages([]);
    try {
      await fetch(`${apiUrl}/api/history`, { method: 'DELETE', credentials: 'include' });
    } catch {
      // ignore - local state is already cleared
    }
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Send message to backend and get response
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: 'POST',
        credentials: 'include', // send the session cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: data.answer ?? data.error ?? 'Something went wrong.' },
      ]);
    } catch (error) {
      console.error('Error fetching FAQ answer:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Sorry, I encountered an error. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button - fixed bottom-right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-accent text-canvas hover:opacity-90 rounded-full w-14 h-14 flex items-center justify-center z-50 transition-opacity duration-200 shadow-lg"
        >
          <i className="fas fa-comments text-xl"></i>
        </button>
      )}

      {/* Chat bubble - appears when open */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-96 bg-surface/95 backdrop-blur-xl border border-line rounded-2xl shadow-2xl z-50 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-line">
            <h3 className="font-semibold text-fg">FAQ Chat</h3>
            <div className="flex items-center space-x-4">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-muted hover:text-fg transition-colors text-xs"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-fg transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted text-sm mt-8">
                Ask me anything about my work, skills, or background!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
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

          {/* Input area */}
          <div className="p-4 border-t border-line">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 bg-fg/5 border border-line rounded-lg px-3 py-2 text-fg text-sm placeholder:text-muted focus:outline-none focus:border-accent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-accent text-canvas hover:opacity-90 rounded-lg px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FAQChat;

