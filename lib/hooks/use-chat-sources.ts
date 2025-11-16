import { useMemo } from "react";

type MessagePart = {
  type: string;
  state?: string;
  output?: unknown;
  [key: string]: unknown;
};

type Message = {
  parts: MessagePart[];
};

type Source = {
  title?: string;
  url?: string;
};

type WebSearchOutput = {
  results?: Array<{
    title?: string;
    url?: string;
    snippet?: string;
  }>;
};

/**
 * Hook for extracting sources from chat messages (tool calls)
 * @param lastAssistantMessage - Last assistant message containing tool calls
 * @returns Array of extracted sources and search state
 */
export function useChatSources(
  lastAssistantMessage: Message | undefined
): {
  sources: Source[];
  isSearching: boolean;
  hasSearchError: boolean;
} {
  const result = useMemo(() => {
    if (!lastAssistantMessage) {
      return {
        sources: [],
        isSearching: false,
        hasSearchError: false,
      };
    }

    const sources: Source[] = [];
    let isSearching = false;
    let hasSearchError = false;

    lastAssistantMessage.parts.forEach((part) => {
      if (part.type === "tool-web_search") {
        // Check if searching
        if (
          part.state === "input-streaming" ||
          part.state === "input-available"
        ) {
          isSearching = true;
        }

        // Check for errors
        if (part.state === "output-error") {
          hasSearchError = true;
        }

        // Extract sources from output
        if (part.state === "output-available" && part.output) {
          const output = part.output as WebSearchOutput;
          if (output.results) {
            output.results.forEach((r) => {
              if (r.url) {
                sources.push({
                  title: r.title,
                  url: r.url,
                });
              }
            });
          }
        }
      }
    });

    return {
      sources,
      isSearching,
      hasSearchError,
    };
  }, [lastAssistantMessage]);

  return result;
}

