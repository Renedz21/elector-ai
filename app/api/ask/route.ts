import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { sampleEmbeddings } from "@/lib/dummy-data";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY no está configurada",
          details: "Por favor configura la variable de entorno OPENAI_API_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuestion = lastMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ");

    let relevantDocs: Array<{ content: string; similarity: number }> =
      sampleEmbeddings
        .map((doc) => ({
          content: doc.content,
          similarity: 0.8,
        }))
        .slice(0, 3);

    const context = relevantDocs.map((doc) => doc.content).join("\n\n");

    const systemPrompt = `Eres un asistente virtual especializado en información electoral de Perú 2026.

Instrucciones estrictas:
- Solo responde con información contenida en el contexto proporcionado
- Si la información no está en el contexto, indica claramente que no tienes esa información
- No inventes datos sobre candidatos reales, fechas o propuestas
- Mantén un tono neutral y objetivo, sin opiniones políticas
- Responde en español de forma clara y concisa

Contexto disponible:
${context}`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in /api/ask:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la consulta",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
