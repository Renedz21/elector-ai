"use client";

import { useState, useMemo } from "react";
import { CalendarEventFilters } from "./calendar-event-filters";
import { CalendarEventsList } from "./calendar-events-list";
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

  const filteredEvents = useMemo(() => {
    if (selectedType === "todos") {
      return initialEvents;
    }
    return initialEvents.filter((event) => event.tipo === selectedType);
  }, [initialEvents, selectedType]);

  return (
    <div className="space-y-6">
      <CalendarEventFilters
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <CalendarEventsList events={filteredEvents} layout="timeline" />
    </div>
  );
}

