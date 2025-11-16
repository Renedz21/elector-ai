import { createClient } from "@/utils/supabase/server";
import type { MesaSchedule } from "@/lib/types";
import type { Database } from "@/utils/supabase/database.types";

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
    return [];
  }

  return (data ?? []).map(mapRowToMesaSchedule);
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
    return [];
  }

  return (data ?? []).map(mapRowToMesaSchedule);
}

