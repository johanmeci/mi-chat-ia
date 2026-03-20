'use client';
import { useChat } from '@ai-sdk/react';

export default function Page() {
  const chat = useChat();

  // console.log('useChat retorna:', Object.keys(chat));

  const { messages, input, handleInputChange, handleSubmit, isLoading } = chat;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>Mi chat con IA</h1>

      <div style={{ minHeight: '400px', marginBottom: '20px' }}>
        {messages.map(m => (
          <div key={m.id} style={{
            marginBottom: '12px',
            textAlign: m.role === 'user' ? 'right' : 'left'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 14px',
              borderRadius: '12px',
              background: m.role === 'user' ? '#534AB7' : '#F1EFE8',
              color: m.role === 'user' ? 'white' : '#2C2C2A',
              maxWidth: '80%'
            }}>
              {m.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div style={{ color: '#888', fontSize: '13px' }}>Escribiendo...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1, padding: '10px 14px',
            borderRadius: '8px', border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px 18px', borderRadius: '8px',
            background: '#534AB7', color: 'white',
            border: 'none', cursor: 'pointer', fontSize: '14px'
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}