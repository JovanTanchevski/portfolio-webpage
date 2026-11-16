interface ChatButtonProps {
  onClick: () => void;
}

function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Ask me anything"
      title="Ask me anything"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] bg-accent text-canvas hover:opacity-90 rounded-full w-14 h-14 flex items-center justify-center z-50 transition-opacity duration-200 shadow-lg"
    >
      <i className="fas fa-comments text-xl"></i>
    </button>
  );
}

export default ChatButton;
