"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MesaAssistant() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/mesa-assistant",
    }),
    onError: (error) => {
      console.error("Error in chat:", error);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MessageCircle className="size-4 sm:size-5" />
          Asistente para miembros de mesa
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          Haz preguntas sobre tus deberes, procedimientos o calendario
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ScrollArea className="h-[300px] sm:h-[400px] mb-4 pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                <p>Haz una pregunta sobre tus deberes como miembro de mesa</p>
                <p className="mt-2 text-xs">
                  Ejemplo: "¿Cuáles son mis deberes durante la instalación?"
                </p>
              </div>
            )}
            {messages.map((message) => {
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("");

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 sm:px-4 py-2 max-w-[80%] sm:max-w-[70%] text-xs sm:text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p
                      className="whitespace-pre-wrap text-left"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="rounded-lg px-3 sm:px-4 py-2 bg-muted">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre tus deberes..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
            Error: {error.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
