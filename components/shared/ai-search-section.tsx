"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SearchSuggestions } from "./search-suggestions";
import { AudioInput } from "./audio-input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Sparkles, AlertCircle, Loader2, Search, ArrowUp } from "lucide-react";

export function AISearchSection() {
  const [query, setQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ask",
    }),
    onError: (error) => {
      console.error("Error in chat:", error);
    },
  });

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setCurrentQuery(searchQuery);
    sendMessage({ text: searchQuery });
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSearch(suggestion);
  };

  // Extract the last assistant response
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  const assistantText = lastAssistantMessage?.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("\n");

  const isSearching = lastAssistantMessage?.parts.some(
    (p) =>
      p.type === "tool-web_search" &&
      (p.state === "input-streaming" || p.state === "input-available")
  );

  const hasError =
    error ||
    lastAssistantMessage?.parts.some(
      (p) => p.type === "tool-web_search" && p.state === "output-error"
    );

  const showResults = messages.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Consulta Electoral</h3>
        </div>
        <div className="flex gap-2 items-end relative">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pregunta sobre las elecciones 2026..."
            disabled={status === "streaming"}
            className="min-h-[120px] max-h-[200px] resize-none text-base p-4"
            rows={5}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute right-3 bottom-3 flex items-center justify-center gap-x-2">
            <AudioInput
              onText={(text) => handleSearch(text)}
              disabled={status === "streaming"}
            />
            <Button
              type="submit"
              disabled={status === "streaming" || !query.trim()}
              size="icon"
              className="rounded-full transition-transform duration-75 ease-out"
            >
              {status === "streaming" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowUp className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Suggestions */}
      {!showResults && <SearchSuggestions onSelect={handleSuggestionSelect} />}

      {/* Results Panel - Static Height */}
      {showResults && (
        <Card className="border-2 shadow-sm">
          <CardHeader className="border-b bg-muted/30 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg mb-1">
                  Resultados de tu consulta
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {currentQuery}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery(currentQuery)}
                className="shrink-0"
              >
                <Search className="w-4 h-4 mr-2" />
                Nueva búsqueda
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto">
              {/* Loading State */}
              {status === "streaming" && !assistantText && (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    Procesando tu consulta
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {isSearching
                      ? "Buscando información actualizada en internet..."
                      : "Analizando datos electorales y generando respuesta..."}
                  </p>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    Error al procesar consulta
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md mb-4">
                    {error?.message ||
                      "No se pudo completar la búsqueda. Por favor, intenta nuevamente."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleSearch(currentQuery)}
                  >
                    Reintentar
                  </Button>
                </div>
              )}

              {/* Response Content */}
              {assistantText && !hasError && (
                <div className="p-6 sm:p-8">
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <div
                      className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base text-left"
                      dangerouslySetInnerHTML={{ __html: assistantText }}
                    />
                  </div>

                  {/* Streaming indicator */}
                  {status === "streaming" && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Generando respuesta...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
