'use client';
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

function Message({ content, role, onSugerencia }) {
  if (role === 'user') {
    return (
      <div style={{ textAlign: 'right', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-block', padding: '8px 14px',
          borderRadius: '12px', background: '#534AB7',
          color: 'white', maxWidth: '80%'
        }}>
          {content}
        </span>
      </div>
    );
  }

  let datos = null;
  try {
    const limpio = content
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
  datos = JSON.parse(limpio);
  } catch {
    return (
      <div style={{ marginBottom: '12px' }}>
        <span style={{
          display: 'inline-block', padding: '8px 14px',
          borderRadius: '12px', background: '#F1EFE8',
          color: '#2C2C2A', maxWidth: '80%'
        }}>
          {content}
        </span>
      </div>
    );
  }

  const colores = {
    info:     { bg: '#E1F5EE', color: '#085041', badge: '#1D9E75' },
    cita:     { bg: '#EEEDFE', color: '#26215C', badge: '#534AB7' },
    urgencia: { bg: '#FCEBEB', color: '#501313', badge: '#E24B4A' },
    otro:     { bg: '#F1EFE8', color: '#2C2C2A', badge: '#888780' },
  };

  const estilo = colores[datos.accion] || colores.otro;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'inline-block', padding: '10px 14px',
        borderRadius: '12px', background: estilo.bg,
        color: estilo.color, maxWidth: '80%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{
            fontSize: '11px', fontWeight: '500',
            background: estilo.badge, color: 'white',
            padding: '2px 8px', borderRadius: '10px'
          }}>
            {datos.accion}
          </span>
        </div>
        <div style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '8px' }}>
          {datos.mensaje}
        </div>
        {datos.seguimiento && (
          <button
            onClick={() => onSugerencia({ role: 'user', content: datos.seguimiento })}
            style={{
              fontSize: '12px', padding: '5px 12px',
              borderRadius: '20px', border: '1px solid currentColor',
              background: 'transparent', cursor: 'pointer',
              color: estilo.color, opacity: 0.8,
              marginTop: '4px'
            }}
          >
            {datos.seguimiento}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>Clínica Salud+</h1>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
        Asistente virtual
      </p>

      <div style={{ minHeight: '400px', marginBottom: '20px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#aaa', fontSize: '14px', textAlign: 'center', marginTop: '80px' }}>
            Hola, ¿en qué puedo ayudarte hoy?
          </p>
        )}
        {messages.map((m, i) => {
          const esUltimo = i === messages.length - 1;
          const estaEscribiendo = esUltimo && isLoading && m.role === 'assistant';
          
          if (estaEscribiendo) {
            return (
              <div key={m.id} style={{ marginBottom: '12px' }}>
                <div style={{ color: '#888', fontSize: '13px' }}>Escribiendo...</div>
              </div>
            );
          }

          return <Message key={m.id} content={m.content} role={m.role} onSugerencia={append} />;
        })}
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