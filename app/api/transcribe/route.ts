import { openai } from "@ai-sdk/openai";
import { experimental_transcribe as transcribe } from "ai";

export const maxDuration = 30;

const ERROR_MESSAGES = {
  NO_FILE: "No se proporcionó archivo de audio",
  EMPTY_FILE: "El archivo de audio está vacío",
  TRANSCRIPTION_FAILED: "Error al transcribir el audio",
} as const;

function createErrorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof File)) {
      return createErrorResponse(ERROR_MESSAGES.NO_FILE, 400);
    }

    const audioBuffer = await audioFile.arrayBuffer();
    const audioUint8Array = new Uint8Array(audioBuffer);

    if (audioUint8Array.length === 0) {
      return createErrorResponse(ERROR_MESSAGES.EMPTY_FILE, 400);
    }

    const result = await transcribe({
      model: openai.transcription("whisper-1"),
      audio: audioUint8Array,
      providerOptions: {
        openai: {
          timestampGranularities: ["word"],
        },
      },
    });

    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/transcribe:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : ERROR_MESSAGES.TRANSCRIPTION_FAILED;

    return createErrorResponse(errorMessage, 500);
  }
}
