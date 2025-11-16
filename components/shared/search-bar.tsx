"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  initialValue?: string;
};

export function SearchBar({
  onSearch,
  placeholder = "Pregunta sobre las elecciones 2026...",
  isLoading = false,
  initialValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  // Actualizar el valor cuando cambie initialValue
  useEffect(() => {
    if (initialValue) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 sm:size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          size="lg"
          className="w-full sm:w-auto px-6 sm:px-8 h-11 sm:h-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              <span className="hidden sm:inline">Buscando</span>
              <span className="sm:hidden">Buscando...</span>
            </>
          ) : (
            "Buscar"
          )}
        </Button>
      </div>
    </form>
  );
}

type SearchResultsProps = {
  answer: string;
  isLoading?: boolean;
};

export function SearchResults({ answer, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span>Generando respuesta...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!answer) return null;

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="prose prose-sm sm:prose-base prose-neutral max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {answer}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
