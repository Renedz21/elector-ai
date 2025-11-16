import { CalendarEventCard } from "./calendar-event-card";
import type { CalendarEvent } from "@/lib/types";

type CalendarEventsListProps = {
  events: CalendarEvent[];
  layout?: "timeline" | "grid";
};

export function CalendarEventsList({
  events,
  layout = "timeline",
}: CalendarEventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">
          No hay eventos para mostrar con los filtros seleccionados.
        </p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <CalendarEventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <CalendarEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

