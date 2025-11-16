"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SearchSuggestions } from "./search-suggestions";
import { AudioInput } from "./audio-input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle, ArrowUp } from "lucide-react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
} from "../ai-elements/prompt-input";
import { Conversation, ConversationContent } from "../ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "../ai-elements/message";
import { Loader } from "../ai-elements/loader";
import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from "../ai-elements/sources";
import { useChatMessages } from "@/lib/hooks/use-chat-messages";
import { useChatSources } from "@/lib/hooks/use-chat-sources";

export function AISearchSection() {
  const [query, setQuery] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ask",
    }),
    onError: (error) => {
      console.error("Error in chat:", error);
    },
  });

  const {
    userMessages,
    assistantMessages,
    lastAssistantMessage,
    getUserMessageText,
    getAssistantMessageText,
  } = useChatMessages({ messages });

  const { sources, isSearching, hasSearchError } =
    useChatSources(lastAssistantMessage);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    sendMessage({ text: searchQuery });
    setQuery("");
  };

  const handleSubmit = (
    { text }: { text: string; files: unknown[] },
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    handleSearch(text);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const hasError = error || hasSearchError;

  const isLoading = status === "streaming" || status === "submitted";
  const showResults = messages.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Consulta Electoral</h3>
      </div>

      {/* Prompt Input with AI Elements */}
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pregunta sobre las elecciones 2026..."
          disabled={isLoading}
        />
        <PromptInputFooter>
          <div className="flex items-center gap-2">
            <AudioInput
              onText={(text) => handleSearch(text)}
              disabled={isLoading}
            />
            <PromptInputSubmit
              disabled={isLoading || !query.trim()}
              status={status}
            >
              <ArrowUp className="size-5" />
            </PromptInputSubmit>
          </div>
        </PromptInputFooter>
      </PromptInput>

      {/* Suggestions */}
      {!showResults && (
        <SearchSuggestions
          onSelect={handleSuggestionSelect}
          isLoading={isLoading}
        />
      )}

      {/* Conversation Results */}
      {showResults && (
        <Card className="border shadow-sm overflow-hidden py-0">
          <CardHeader className="border-b bg-muted/20 py-3 px-4 sm:py-4 sm:px-6 gap-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">
                Conversación
              </h3>
              {userMessages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const lastUserMessage =
                      userMessages[userMessages.length - 1];
                    const text = getUserMessageText(lastUserMessage);
                    setQuery(text);
                  }}
                  className="h-8 text-xs sm:text-sm"
                >
                  Editar última pregunta
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[400px] sm:h-[500px] flex flex-col overflow-hidden">
              <Conversation className="flex-1 min-h-0">
                <ConversationContent>
                  {/* Display conversation history */}
                  {messages.map((message, index) => {
                    if (message.role === "user") {
                      const userText = getUserMessageText(message);

                      return (
                        <Message key={index} from="user">
                          <MessageContent className="text-white! dark:text-dark! dark:font-medium!">
                            <MessageResponse>{userText}</MessageResponse>
                          </MessageContent>
                        </Message>
                      );
                    }

                    if (message.role === "assistant") {
                      const messageText = getAssistantMessageText(message);

                      const isStreaming =
                        index === messages.length - 1 && status === "streaming";
                      const isLastMessage = index === messages.length - 1;

                      return (
                        <Message key={index} from="assistant">
                          <MessageContent className="text-left border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-lg p-4 font-medium! dark:font-medium!">
                            {messageText ? (
                              <>
                                <MessageResponse>{messageText}</MessageResponse>
                                {isLastMessage && sources.length > 0 && (
                                  <Sources>
                                    <SourcesTrigger count={sources.length} />
                                    <SourcesContent>
                                      {sources.map((source, idx) => (
                                        <Source
                                          key={idx}
                                          href={source.url || "#"}
                                          title={
                                            source.title ||
                                            source.url ||
                                            `Fuente ${idx + 1}`
                                          }
                                        />
                                      ))}
                                    </SourcesContent>
                                  </Sources>
                                )}
                              </>
                            ) : isStreaming ? (
                              <div className="flex items-center gap-2 py-2">
                                <Loader size={16} />
                                <span className="text-sm text-muted-foreground">
                                  {isSearching
                                    ? "Buscando información actualizada..."
                                    : "Generando respuesta..."}
                                </span>
                              </div>
                            ) : null}
                          </MessageContent>
                        </Message>
                      );
                    }

                    return null;
                  })}

                  {/* Loading state for new messages */}
                  {isLoading && !lastAssistantMessage && (
                    <Message from="assistant">
                      <MessageContent>
                        <div className="flex items-center gap-2 py-2">
                          <Loader size={16} />
                          <span className="text-sm text-muted-foreground">
                            {isSearching
                              ? "Buscando información actualizada en internet..."
                              : "Analizando datos electorales..."}
                          </span>
                        </div>
                      </MessageContent>
                    </Message>
                  )}

                  {/* Error state */}
                  {hasError && (
                    <Message from="system">
                      <MessageContent>
                        <div className="flex flex-col items-center gap-3 text-center py-4">
                          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-destructive" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">
                              Error al procesar consulta
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {error?.message ||
                                "No se pudo completar la búsqueda. Por favor, intenta nuevamente."}
                            </p>
                          </div>
                          {userMessages.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const lastUserMessage =
                                  userMessages[userMessages.length - 1];
                                const text =
                                  getUserMessageText(lastUserMessage);
                                handleSearch(text);
                              }}
                            >
                              Reintentar
                            </Button>
                          )}
                        </div>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
              </Conversation>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
