"use client";

import { useState, useMemo } from "react";
import { CalendarEventFilters } from "./calendar-event-filters";
import { CalendarEventsList } from "./calendar-events-list";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import type { CalendarEvent } from "@/lib/types";

type CalendarEventsClientProps = {
  initialEvents: CalendarEvent[];
};

export function CalendarEventsClient({
  initialEvents,
}: CalendarEventsClientProps) {
  const [selectedType, setSelectedType] = useState<
    CalendarEvent["tipo"] | "todos"
  >("todos");
  const [layout, setLayout] = useState<"timeline" | "grid">("grid");

  const filteredEvents = useMemo(() => {
    if (selectedType === "todos") {
      return initialEvents;
    }
    return initialEvents.filter((event) => event.tipo === selectedType);
  }, [initialEvents, selectedType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CalendarEventFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Vista:
          </span>
          <div className="inline-flex rounded-lg border p-1">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout("grid")}
              className="gap-2"
              aria-label="Vista de cuadrícula"
            >
              <LayoutGrid className="size-4" />
              <span className="hidden sm:inline">Cuadrícula</span>
            </Button>
            <Button
              variant={layout === "timeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout("timeline")}
              className="gap-2"
              aria-label="Vista de lista"
            >
              <List className="size-4" />
              <span className="hidden sm:inline">Lista</span>
            </Button>
          </div>
        </div>
      </div>
      <CalendarEventsList events={filteredEvents} layout={layout} />
    </div>
  );
}
