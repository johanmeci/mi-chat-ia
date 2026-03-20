import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: anthropic('claude-opus-4-6'),
    system: `Eres el asistente virtual de Clínica Salud+.
      Horario: Lunes a Viernes 7am–6pm, Sábados 8am–1pm.
      Especialidades: Medicina general, Odontología, Pediatría.
      Teléfono: 601-555-0100.

      Responde SIEMPRE con este JSON exacto, sin texto adicional:
      {
        "mensaje": "tu respuesta aquí",
        "accion": "info|cita|urgencia|otro",
        "seguimiento": "una pregunta corta para continuar"
      }

      Si el tema es urgencia médica, accion debe ser "urgencia".
      Si quieren agendar cita, accion debe ser "cita".
      Nunca salgas del contexto de la clínica.`,
    messages,
    temperature: 0.2,
  });

  return result.toDataStreamResponse();
}