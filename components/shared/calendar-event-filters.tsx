"use client";

import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from "@/lib/types";

type CalendarEventFiltersProps = {
  selectedType: CalendarEvent["tipo"] | "todos";
  onTypeChange: (type: CalendarEvent["tipo"] | "todos") => void;
};

const tipoLabels: Record<CalendarEvent["tipo"], string> = {
  inscripcion: "Inscripción",
  debate: "Debate",
  votacion: "Votación",
  proclamacion: "Proclamación",
  otro: "Evento",
};

const tipoOptions: Array<CalendarEvent["tipo"] | "todos"> = [
  "todos",
  "inscripcion",
  "debate",
  "votacion",
  "proclamacion",
  "otro",
];

export function CalendarEventFilters({
  selectedType,
  onTypeChange,
}: CalendarEventFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tipoOptions.map((tipo) => (
        <button
          key={tipo}
          type="button"
          onClick={() => onTypeChange(tipo)}
          className="transition-opacity hover:opacity-80"
        >
          <Badge
            variant={
              selectedType === tipo ? "default" : "outline"
            }
            className="cursor-pointer"
          >
            {tipo === "todos" ? "Todos" : tipoLabels[tipo]}
          </Badge>
        </button>
      ))}
    </div>
  );
}

