"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SearchBar, SearchResults } from "./search-bar";
import { SearchSuggestions } from "./search-suggestions";

export function AISearchSection() {
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestionsState, setShowSuggestionsState] = useState(true);
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
    setSelectedSuggestion(""); // Limpiar sugerencia después de buscar
    setShowSuggestionsState(false); // Ocultar sugerencias al buscar
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setShowSuggestionsState(false);
    // Ejecutar la búsqueda automáticamente
    sendMessage({ text: suggestion });
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

  // Mostrar sugerencias solo si no hay respuesta, no está cargando y no hay mensajes
  const showSuggestions =
    showSuggestionsState &&
    !displayAnswer &&
    !isLoading &&
    messages.length === 0;

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
        initialValue={selectedSuggestion}
      />
      {showSuggestions && (
        <SearchSuggestions
          onSelect={handleSuggestionSelect}
          isLoading={isLoading}
        />
      )}
      {(displayAnswer || isLoading) && (
        <SearchResults answer={displayAnswer} isLoading={isLoading} />
      )}
    </div>
  );
}
