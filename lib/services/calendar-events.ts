import { createClient } from "@/utils/supabase/server";
import type { CalendarEvent } from "@/lib/types";
import type { Database } from "@/utils/supabase/database.types";
import { dummyCalendarEvents } from "@/lib/dummy-data";

type CalendarEventRow = Database["public"]["Tables"]["calendar_events"]["Row"];

function mapRowToCalendarEvent(row: CalendarEventRow): CalendarEvent {
  return {
    id: row.id,
    fecha: row.fecha,
    descripcion: row.descripcion,
    tipo: row.tipo,
    importante: row.importante ?? false,
  };
}

export async function getAllCalendarEvents(): Promise<CalendarEvent[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("calendar_events")
    .select("*")
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error fetching calendar events:", error);
  }

  // Use dummy data if no data from Supabase
  if (!data || data.length === 0) {
    return dummyCalendarEvents.map(mapRowToCalendarEvent);
  }

  return data.map(mapRowToCalendarEvent);
}

export async function getCalendarEventsByType(
  tipo: CalendarEvent["tipo"],
): Promise<CalendarEvent[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("calendar_events")
    .select("*")
    .eq("tipo", tipo)
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error fetching calendar events by type:", error);
  }

  // Use dummy data if no data from Supabase
  if (!data || data.length === 0) {
    return dummyCalendarEvents
      .filter((e) => e.tipo === tipo)
      .map(mapRowToCalendarEvent);
  }

  return data.map(mapRowToCalendarEvent);
}

