import { useMemo } from "react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: Array<{
    type: string;
    text?: string;
    [key: string]: unknown;
  }>;
};

type UseChatMessagesOptions = {
  messages: Message[];
};

type ProcessedMessages = {
  userMessages: Message[];
  assistantMessages: Message[];
  lastAssistantMessage: Message | undefined;
  lastUserMessage: Message | undefined;
  getMessageText: (message: Message) => string;
  getUserMessageText: (message: Message) => string;
  getAssistantMessageText: (message: Message) => string;
};

/**
 * Hook for processing and filtering chat messages
 * @param messages - Array of chat messages from useChat
 * @returns Processed messages with filtered arrays and helper functions
 */
export function useChatMessages({
  messages,
}: UseChatMessagesOptions): ProcessedMessages {
  const processed = useMemo(() => {
    const userMessages = messages.filter((m) => m.role === "user");
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    const lastAssistantMessage =
      assistantMessages[assistantMessages.length - 1];
    const lastUserMessage = userMessages[userMessages.length - 1];

    const getMessageText = (message: Message): string => {
      return message.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("");
    };

    const getUserMessageText = (message: Message): string => {
      return getMessageText(message);
    };

    const getAssistantMessageText = (message: Message): string => {
      return message.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("\n");
    };

    return {
      userMessages,
      assistantMessages,
      lastAssistantMessage,
      lastUserMessage,
      getMessageText,
      getUserMessageText,
      getAssistantMessageText,
    };
  }, [messages]);

  return processed;
}

