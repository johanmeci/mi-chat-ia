import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: anthropic('claude-opus-4-6'),
    system: `Eres el asistente virtual de Clínica Salud+.
              Horario: Lunes a Viernes 7am–6pm.
              Especialidades: Odontología general, ortodoncia, diseño de sonrisa, limpieza, endodoncia.
              Responde siempre en español, de forma amable y profesional.`,
    messages
  });

  return result.toDataStreamResponse();
}