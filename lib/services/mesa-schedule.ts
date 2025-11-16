import { createClient } from "@/utils/supabase/server";
import type { MesaSchedule } from "@/lib/types";
import type { Database } from "@/utils/supabase/database.types";
import { dummyMesaSchedule } from "@/lib/dummy-data";

type MesaScheduleRow = Database["public"]["Tables"]["mesa_schedule"]["Row"];

function mapRowToMesaSchedule(row: MesaScheduleRow): MesaSchedule {
  return {
    id: row.id,
    phase: row.phase,
    start: row.start_time,
    end: row.end_time,
    description: row.description,
    created_at: row.created_at ?? undefined,
    updated_at: row.updated_at ?? undefined,
  };
}

export async function getMesaSchedule(): Promise<MesaSchedule[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mesa_schedule")
    .select("*")
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching mesa schedule:", error);
  }

  // Use dummy data if no data from Supabase
  if (!data || data.length === 0) {
    return dummyMesaSchedule.map(mapRowToMesaSchedule);
  }

  return data.map(mapRowToMesaSchedule);
}

export async function getMesaScheduleByPhase(
  phase: "instalacion" | "sufragio" | "conteo",
): Promise<MesaSchedule[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mesa_schedule")
    .select("*")
    .eq("phase", phase)
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching mesa schedule by phase:", error);
  }

  // Use dummy data if no data from Supabase
  if (!data || data.length === 0) {
    return dummyMesaSchedule
      .filter((s) => s.phase === phase)
      .map(mapRowToMesaSchedule);
  }

  return data.map(mapRowToMesaSchedule);
}

