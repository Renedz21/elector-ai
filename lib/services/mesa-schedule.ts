import { dummyMesaSchedule } from "@/lib/dummy-data";
import type { MesaSchedule } from "@/lib/types";

export async function getMesaSchedule(): Promise<MesaSchedule[]> {
  return dummyMesaSchedule;
}

export async function getMesaScheduleByPhase(
  phase: "instalacion" | "sufragio" | "conteo",
): Promise<MesaSchedule[]> {
  return dummyMesaSchedule.filter((s) => s.phase === phase);
}

