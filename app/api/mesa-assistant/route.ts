import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { readFileSync } from "fs";
import { join } from "path";

export const maxDuration = 30;

// Cargar instrucciones desde archivos JSON
function loadMesaInstructions() {
  try {
    const instalacion = JSON.parse(
      readFileSync(
        join(process.cwd(), "instructions", "mesa", "instalacion.json"),
        "utf-8",
      ),
    );
    const sufragio = JSON.parse(
      readFileSync(
        join(process.cwd(), "instructions", "mesa", "sufragio.json"),
        "utf-8",
      ),
    );
    const conteo = JSON.parse(
      readFileSync(
        join(process.cwd(), "instructions", "mesa", "conteo.json"),
        "utf-8",
      ),
    );

    return {
      instalacion: JSON.stringify(instalacion),
      sufragio: JSON.stringify(sufragio),
      conteo: JSON.stringify(conteo),
    };
  } catch (error) {
    console.error("Error loading mesa instructions:", error);
    return {
      instalacion: "",
      sufragio: "",
      conteo: "",
    };
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY no está configurada",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
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

    // Cargar instrucciones
    const instructions = loadMesaInstructions();
    const contextText = `
Instrucciones de Instalación:
${instructions.instalacion}

Instrucciones de Sufragio:
${instructions.sufragio}

Instrucciones de Conteo:
${instructions.conteo}
    `.trim();

    const context = contextText;

    const systemPrompt = `Eres un asistente especializado en ayudar a miembros de mesa electoral en Perú 2026.

Instrucciones estrictas:
- Solo responde con información contenida en el contexto proporcionado sobre deberes y procedimientos de miembros de mesa
- Si la información no está en el contexto, indica claramente que no tienes esa información
- No inventes datos sobre procedimientos, fechas o normativas
- Mantén un tono profesional y claro
- Responde en español de forma concisa y práctica
- Enfócate en ayudar con deberes, procedimientos y calendario de actividades

Contexto disponible sobre procedimientos de miembros de mesa:
${context}`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in /api/mesa-assistant:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la consulta",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

