import FAQChat from '../ui/FAQChat';

// FAQ section component - displays FAQ chat interface
function FAQ() {
  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden pt-12 md:pt-0 rise-in">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">FAQ</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-muted mb-8 pr-2">
          <p>
            Ask me anything! Use the chat button in the bottom-right corner to get answers to common questions.
          </p>
          <div className="bg-surface/70 backdrop-blur-sm border border-line rounded-xl p-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">Common Questions</h2>
            <ul className="list-disc list-inside space-y-2 text-fg/90">
              <li>Who are you?</li>
              <li>What do you do?</li>
              <li>What technologies do you use?</li>
              <li>Where are you based?</li>
              <li>Can I contact you?</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* FAQ Chat component - only visible in FAQ section */}
      <FAQChat />
    </div>
  );
}

export default FAQ;

