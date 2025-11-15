import { dummyMesaLocations } from "@/lib/dummy-data";
import type { MesaLocation } from "@/lib/types";

export async function findMesaByNumber(
  mesaNumber: string,
): Promise<MesaLocation | null> {
  return (
    dummyMesaLocations.find((m) => m.mesa_number === mesaNumber) || null
  );
}

export async function getAllMesaLocations(): Promise<MesaLocation[]> {
  return dummyMesaLocations;
}

