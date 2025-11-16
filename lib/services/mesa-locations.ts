import { createClient } from "@/utils/supabase/client";
import type { MesaLocation } from "@/lib/types";

export async function findMesaByNumber(
  mesaNumber: string,
): Promise<MesaLocation | null> {
  const supabase = createClient();

  const { data: mesaData, error: mesaError } = await supabase
    .from("mesa_locations")
    .select("*")
    .eq("mesa_number", mesaNumber)
    .single();

  if (mesaError || !mesaData) {
    return null;
  }

  const { data: locationData, error: locationError } = await supabase
    .from("voting_locations")
    .select("*")
    .eq("id", mesaData.local_id)
    .single();

  return {
    id: mesaData.id,
    mesa_number: mesaData.mesa_number,
    local_id: mesaData.local_id,
    pavilion: mesaData.pavilion,
    floor: mesaData.floor,
    room: mesaData.room,
    created_at: mesaData.created_at ?? undefined,
    updated_at: mesaData.updated_at ?? undefined,
    voting_location: locationData && !locationError
      ? {
          id: locationData.id,
          name: locationData.name,
          address: locationData.address,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          district: locationData.district,
          created_at: locationData.created_at ?? undefined,
          updated_at: locationData.updated_at ?? undefined,
        }
      : undefined,
  };
}

export async function getAllMesaLocations(): Promise<MesaLocation[]> {
  const supabase = createClient();

  const { data: mesaData, error: mesaError } = await supabase
    .from("mesa_locations")
    .select("*");

  if (mesaError || !mesaData) {
    return [];
  }

  const localIds = [...new Set(mesaData.map((m) => m.local_id))];
  const { data: locationsData } = await supabase
    .from("voting_locations")
    .select("*")
    .in("id", localIds);

  const locationsMap = new Map(
    (locationsData ?? []).map((loc) => [loc.id, loc])
  );

  return mesaData.map((item) => {
    const location = locationsMap.get(item.local_id);
    return {
      id: item.id,
      mesa_number: item.mesa_number,
      local_id: item.local_id,
      pavilion: item.pavilion,
      floor: item.floor,
      room: item.room,
      created_at: item.created_at ?? undefined,
      updated_at: item.updated_at ?? undefined,
      voting_location: location
        ? {
            id: location.id,
            name: location.name,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            district: location.district,
            created_at: location.created_at ?? undefined,
            updated_at: location.updated_at ?? undefined,
          }
        : undefined,
    };
  });
}

