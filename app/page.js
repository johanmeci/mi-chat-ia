'use client';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

function Message({ message, onSugerencia }) {
  const isUser = message.role === 'user';
  
  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="flex max-w-[85%] sm:max-w-[75%] items-end gap-2">
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm text-sm">
            {message.content}
          </div>
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <UserIcon />
          </div>
        </div>
      </div>
    );
  }

  let datos = null;
  try {
    const limpio = message.content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    datos = JSON.parse(limpio);
  } catch {
    return (
      <div className="flex w-full justify-start mb-6">
        <div className="flex max-w-[85%] sm:max-w-[75%] items-end gap-2">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-500 border border-gray-200 shadow-sm">
            <BotIcon />
          </div>
          <div className="bg-white border border-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  const colores = {
    info:     { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-900', badge: 'bg-emerald-500', buttonHover: 'hover:bg-emerald-100' },
    cita:     { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-900', badge: 'bg-indigo-500', buttonHover: 'hover:bg-indigo-100' },
    urgencia: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-900', badge: 'bg-rose-500', buttonHover: 'hover:bg-rose-100' },
    otro:     { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', badge: 'bg-gray-500', buttonHover: 'hover:bg-gray-200' },
  };

  const estilo = colores[datos.accion] || colores.otro;

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="flex max-w-[90%] sm:max-w-[80%] items-start gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-indigo-600 border border-gray-200 shadow-sm mt-1">
          <BotIcon />
        </div>
        <div className={`${estilo.bg} ${estilo.border} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`${estilo.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
              {datos.accion}
            </span>
          </div>
          <div className={`${estilo.text} text-sm leading-relaxed mb-3`}>
            {datos.mensaje}
          </div>
          {datos.seguimiento && (
            <button
              onClick={() => onSugerencia({ role: 'user', content: datos.seguimiento })}
              className={`text-xs px-3 py-1.5 rounded-full border border-current ${estilo.text} opacity-80 transition-colors ${estilo.buttonHover} active:scale-95 flex items-center gap-1`}
            >
              <span>{datos.seguimiento}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <BotIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">Clínica Salud+</h1>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              En línea
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4 animate-in fade-in duration-700">
            <div className="h-20 w-20 bg-indigo-50 rounded-2xl rotate-3 flex items-center justify-center text-indigo-500 mb-2 shadow-sm border border-indigo-100">
              <div className="-rotate-3">
                <BotIcon />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">¡Hola! Soy tu asistente de Salud+</h2>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
              Estoy aquí para ayudarte a agendar citas, responder consultas médicas generales o guiarte en caso de urgencias. ¿En qué te puedo ayudar hoy?
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
               {['Quiero agendar una cita', 'Tengo una urgencia', 'Horarios de atención'].map((sug) => (
                 <button
                   key={sug}
                   onClick={() => append({ role: 'user', content: sug })}
                   className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                 >
                   {sug}
                 </button>
               ))}
            </div>
          </div>
        ) : (
          <div className="pb-2">
            {messages.map((m, i) => {
              const esUltimoYAsistente = i === messages.length - 1 && m.role === 'assistant';
              if (isLoading && esUltimoYAsistente) return null;
              
              return <Message key={m.id} message={m} onSugerencia={append} />;
            })}
            
            {isLoading && (
              <div className="flex w-full justify-start mb-6">
                 <div className="flex items-end gap-2">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 shadow-sm mt-1">
                      <BotIcon />
                    </div>
                    <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 pb-6 sm:pb-4">
        <div className="max-w-4xl mx-auto relative">
          <form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all shadow-sm"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe un mensaje aquí..."
              className="flex-1 bg-transparent outline-none py-2.5 px-4 text-sm text-gray-800 placeholder-gray-400 w-full"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
            >
              <SendIcon />
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">La información proporcionada no sustituye una consulta médica profesional</span>
          </div>
        </div>
      </div>
    </div>
  );
}