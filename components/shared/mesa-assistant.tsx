"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertCircle, ArrowUp } from "lucide-react";
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
import { useChatMessages } from "@/lib/hooks/use-chat-messages";

export function MesaAssistant() {
  const [query, setQuery] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/mesa-assistant",
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

  const hasError = !!error;
  const isLoading = status === "streaming" || status === "submitted";
  const showResults = messages.length > 0;

  return (
    <Card className="border shadow-sm overflow-hidden py-0">
      <CardHeader className="border-b bg-muted/20 py-3 px-4 sm:py-4 sm:px-6 gap-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm sm:text-base">
              Asistente para miembros de mesa
            </h3>
          </div>
          {userMessages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const lastUserMessage = userMessages[userMessages.length - 1];
                const text = getUserMessageText(lastUserMessage);
                setQuery(text);
              }}
              className="h-8 text-xs sm:text-sm"
            >
              Editar última pregunta
            </Button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          Haz preguntas sobre tus deberes, procedimientos o calendario
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6 space-y-4">
        {/* Conversation Results */}
        {showResults ? (
          <div className="h-[300px] sm:h-[400px] flex flex-col overflow-hidden">
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
                            <MessageResponse>{messageText}</MessageResponse>
                          ) : isStreaming ? (
                            <div className="flex items-center gap-2 py-2">
                              <Loader size={16} />
                              <span className="text-sm text-muted-foreground">
                                Generando respuesta...
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
                          Procesando tu consulta...
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
                              "No se pudo completar la consulta. Por favor, intenta nuevamente."}
                          </p>
                        </div>
                        {userMessages.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const lastUserMessage =
                                userMessages[userMessages.length - 1];
                              const text = getUserMessageText(lastUserMessage);
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
        ) : (
          <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Haz una pregunta sobre tus deberes como miembro de mesa</p>
              <p className="text-xs">
                Ejemplo: "¿Cuáles son mis deberes durante la instalación?"
              </p>
            </div>
          </div>
        )}

        {/* Prompt Input with AI Elements */}
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pregunta sobre tus deberes, procedimientos o calendario..."
            disabled={isLoading}
          />
          <PromptInputFooter>
            <div className="flex items-center gap-2">
              <PromptInputSubmit
                disabled={isLoading || !query.trim()}
                status={status}
              >
                <ArrowUp className="size-5" />
              </PromptInputSubmit>
            </div>
          </PromptInputFooter>
        </PromptInput>
      </CardContent>
    </Card>
  );
}
