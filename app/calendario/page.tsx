import { PageHeader } from "@/components/shared/page-header";
import { CalendarEventCard } from "@/components/shared/calendar-event-card";
import { calendarEvents } from "@/lib/dummy-data";

export default function CalendarioPage() {
  const sortedEvents = [...calendarEvents].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <PageHeader
        title="Calendario Electoral 2026"
        description="Fechas clave del proceso electoral desde la inscripción de candidatos hasta la proclamación de resultados."
      />
      <div className="space-y-3 sm:space-y-4">
        {sortedEvents.map((event) => (
          <CalendarEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
