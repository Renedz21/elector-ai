import { createClient } from "@/utils/supabase/client";
import type { MesaLocation } from "@/lib/types";
import { dummyMesaLocations, dummyVotingLocations } from "@/lib/dummy-data";

export async function findMesaByNumber(
  mesaNumber: string
): Promise<MesaLocation | null> {
  const supabase = createClient();

  const { data: mesaData, error: mesaError } = await supabase
    .from("mesa_locations")
    .select("*")
    .eq("mesa_number", mesaNumber)
    .single();

  // If found in Supabase, return it
  if (!mesaError && mesaData) {
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
      voting_location:
        locationData && !locationError
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

  // Use dummy data as fallback if not found in Supabase or error occurred
  const dummyMesa = dummyMesaLocations.find(
    (m) => m.mesa_number === mesaNumber
  );

  if (!dummyMesa) {
    return null;
  }

  const dummyLocation = dummyVotingLocations.find(
    (l) => l.id === dummyMesa.local_id
  );

  return {
    id: dummyMesa.id,
    mesa_number: dummyMesa.mesa_number,
    local_id: dummyMesa.local_id,
    pavilion: dummyMesa.pavilion,
    floor: dummyMesa.floor,
    room: dummyMesa.room,
    created_at: dummyMesa.created_at ?? undefined,
    updated_at: dummyMesa.updated_at ?? undefined,
    voting_location: dummyLocation
      ? {
          id: dummyLocation.id,
          name: dummyLocation.name,
          address: dummyLocation.address,
          latitude: dummyLocation.latitude,
          longitude: dummyLocation.longitude,
          district: dummyLocation.district,
          created_at: dummyLocation.created_at ?? undefined,
          updated_at: dummyLocation.updated_at ?? undefined,
        }
      : undefined,
  };
}

export async function getAllMesaLocations(): Promise<MesaLocation[]> {
  const supabase = createClient();

  const { data: mesaData, error: mesaError } = await supabase
    .from("mesa_locations")
    .select("*");

  // Use dummy data if no data from Supabase
  if (mesaError || !mesaData || mesaData.length === 0) {
    const locationsMap = new Map(
      dummyVotingLocations.map((loc) => [loc.id, loc])
    );

    return dummyMesaLocations.map((item) => {
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
