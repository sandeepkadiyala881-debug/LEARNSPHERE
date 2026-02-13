import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "⚠️ Backend Offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: '#020617', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#38bdf8' }}>💎 LearnSphere AI</h2>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #1e293b' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', background: msg.role === 'user' ? '#38bdf8' : '#1e293b' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <p style={{ color: '#38bdf8' }}>Thinking...</p>}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }} 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px 20px', background: '#38bdf8', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}