"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchSuggestionsProps = {
  onSelect: (suggestion: string) => void;
  isLoading?: boolean;
  className?: string;
};

const suggestions = [
  "¿Quién es KEIKO SOFIA FUJIMORI HIGUCHI?",
  "¿Cuándo son las elecciones?",
  "¿Qué partidos participan?",
  "¿Cuáles son los planes de gobierno?",
  "¿Dónde puedo votar?",
  "¿Quiénes son los candidatos presidenciales?",
  "¿Cuándo es el debate presidencial?",
  "¿Qué propuestas tienen los candidatos?",
];

export function SearchSuggestions({
  onSelect,
  isLoading = false,
  className,
}: SearchSuggestionsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="size-4" />
        <span>Preguntas sugeridas:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(suggestion)}
            disabled={isLoading}
            className="text-xs sm:text-sm h-auto py-1.5 px-3 whitespace-normal text-left hover:bg-primary/10 transition-colors"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}

