import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 text-xs opacity-70 hover:opacity-100"
            title="Copy to clipboard"
          >
            📋
          </button>
        </div>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
