import { useEffect, useRef } from 'react';

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow ${
              msg.role === 'user'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-white text-gray-500 rounded-2xl px-4 py-2 text-sm shadow animate-pulse">
            Thinking…
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
