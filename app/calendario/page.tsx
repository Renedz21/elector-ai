import { PageHeader } from "@/components/shared/page-header";
import { getAllCalendarEvents } from "@/lib/services/calendar-events";
import { CalendarEventsClient } from "@/components/shared/calendar-events-client";

export default async function CalendarioPage() {
  const events = await getAllCalendarEvents();

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <PageHeader
        title="Calendario Electoral 2026"
        description="Fechas clave del proceso electoral desde la inscripción de candidatos hasta la proclamación de resultados."
      />
      <CalendarEventsClient initialEvents={events} />
    </div>
  );
}
