# Asistente Virtual — Clínica Salud+

Chat con IA para gestión de consultas de una clínica médica. Responde preguntas sobre horarios, especialidades y agendamiento de citas.

## Demo
[Ver demo en vivo](https://mi-chat-ia-five.vercel.app/)

## Funcionalidades
- Respuestas en tiempo real con streaming
- Clasificación automática de consultas (info, cita, urgencia)
- Sugerencias clickeables para continuar la conversación
- Detección de emergencias médicas

## Tecnologías
- Next.js 15
- Vercel AI SDK
- Claude (Anthropic)
- Tailwind CSS

## Correr localmente

1. Clona el repositorio y instala dependencias:
   git clone https://github.com/johanmeci/mi-chat-ia.git
   cd mi-chat-ia
   npm install

2. Crea un archivo .env.local con tu API key:
   ANTHROPIC_API_KEY=tu_api_key_aqui

3. Corre el proyecto:
   npm run dev

Abre localhost:3000 en tu navegador.