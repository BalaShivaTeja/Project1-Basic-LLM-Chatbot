import { useState } from 'react';
import ChatWindow from './components/Chat/ChatWindow';
import ChatInput from './components/Chat/ChatInput';
import { sendMessage } from './services/chatService';

function App() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const reply = await sendMessage(text, sessionId);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-4 px-6 shadow">
        <h1 className="text-xl font-bold">Basic LLM Chatbot</h1>
      </header>
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default App;
