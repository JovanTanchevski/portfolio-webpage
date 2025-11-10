import { useState, useRef, useEffect } from 'react';

// FAQ Chat component - floating chat bubble that appears in FAQ section
function FAQChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { type: 'bot', text: data.answer }]);
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
          className="fixed bottom-6 right-6 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md border border-gray-800 rounded-full p-4 z-50 transition-all duration-200 shadow-lg"
        >
          <i className="fas fa-comments text-2xl text-white"></i>
        </button>
      )}

      {/* Chat bubble - appears when open */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-96 bg-black bg-opacity-90 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="font-mono font-bold text-white">FAQ Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 font-mono text-sm mt-8">
                Ask me anything about my work, skills, or background!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded p-3 font-mono text-sm ${
                    msg.type === 'user'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'bg-white bg-opacity-10 text-gray-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white bg-opacity-10 rounded p-3 font-mono text-sm text-gray-300">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 bg-white bg-opacity-10 border border-gray-800 rounded px-3 py-2 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-gray-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray-800 rounded px-4 py-2 text-white font-mono text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

