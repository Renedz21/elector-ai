"use client";

import { Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type PlanFilterProps = {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
};

export function PlanFilter({
  topics,
  selectedTopic,
  onTopicChange,
}: PlanFilterProps) {
  const handleValueChange = (value: string) => {
    // Mapear "all" a cadena vacía para mantener compatibilidad
    onTopicChange(value === "all" ? "" : value);
  };

  // Mapear cadena vacía a "all" para el Select
  const selectValue = selectedTopic || "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <Label htmlFor="topic-filter" className="text-sm font-medium">
            Filtrar por tema principal
          </Label>
        </div>
        {selectedTopic && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {selectedTopic}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTopicChange("")}
              className="h-7 px-2"
              aria-label="Limpiar filtro"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <Select value={selectValue} onValueChange={handleValueChange}>
        <SelectTrigger id="topic-filter" className="w-full sm:w-[300px]">
          <SelectValue placeholder="Selecciona un tema o ver todos" />
        </SelectTrigger>
        <SelectContent className="max-h-[400px] sm:max-h-[450px] overflow-y-auto">
          <SelectItem value="all">Todos los temas</SelectItem>
          {topics.map((topic) => (
            <SelectItem key={topic} value={topic}>
              {topic}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
