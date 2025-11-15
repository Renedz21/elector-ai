import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-large"),
    value: text,
  });

  return embedding;
}
