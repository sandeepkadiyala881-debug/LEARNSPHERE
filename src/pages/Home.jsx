import React, { useState, useEffect, useRef } from 'react';
import { Send, BookOpen, BrainCircuit, User, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Welcome! I'm your ML specialist. How can I help?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Direct call to your backend port
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "⚠️ **System Error:** Check if Terminal 2 is running `node server.js`." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-white border-r p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 text-indigo-600 mb-8">
          <BrainCircuit size={28} />
          <span className="font-bold text-xl text-slate-900">LearnSphere</span>
        </div>
        <nav className="space-y-2">
          {['Linear Regression', 'Neural Networks'].map(t => (
            <div key={t} className="flex items-center gap-2 p-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">
              <BookOpen size={16} /> {t}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-white">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                <Markdown className="prose prose-sm">{msg.content}</Markdown>
              </div>
            </div>
          ))}
          {isLoading && <Loader2 className="animate-spin text-indigo-600" />}
        </div>
        <div className="p-6 border-t">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your ML question..." 
              className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}