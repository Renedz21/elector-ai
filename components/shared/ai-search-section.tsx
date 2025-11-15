"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SearchBar, SearchResults } from "./search-bar";

export function AISearchSection() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ask",
    }),
    onError: (error) => {
      console.error("Error in chat:", error);
    },
  });

  const handleSearch = (query: string) => {
    sendMessage({ text: query });
  };

  const isLoading = status === "submitted" || status === "streaming";

  const lastAssistantMessage = messages
    .filter((m) => m.role === "assistant")
    .pop();

  const answer = lastAssistantMessage?.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  const displayAnswer = error
    ? `Lo siento, hubo un error al procesar tu consulta: ${error.message}. Por favor, verifica que tu API key de OpenAI esté configurada correctamente.`
    : answer || "";

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {(displayAnswer || isLoading) && (
        <SearchResults answer={displayAnswer} isLoading={isLoading} />
      )}
    </div>
  );
}
