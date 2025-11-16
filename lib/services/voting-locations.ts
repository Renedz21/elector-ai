import { createClient } from "@/utils/supabase/client";
import type { VotingLocation, VotingLocationWithDistance } from "@/lib/types";
import { dummyVotingLocations } from "@/lib/dummy-data";

export async function getAllVotingLocations(): Promise<VotingLocation[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("voting_locations").select("*");

  if (error) {
    console.error("Error fetching voting locations:", error);
  }

  // Use dummy data if no data from Supabase
  if (!data || data.length === 0) {
    return dummyVotingLocations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      address: loc.address,
      latitude: loc.latitude,
      longitude: loc.longitude,
      district: loc.district,
      created_at: loc.created_at ?? undefined,
      updated_at: loc.updated_at ?? undefined,
    }));
  }

  return data.map((loc) => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    latitude: loc.latitude,
    longitude: loc.longitude,
    district: loc.district,
    created_at: loc.created_at ?? undefined,
    updated_at: loc.updated_at ?? undefined,
  }));
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Redondeado a 2 decimales
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export async function findNearestLocations(
  userLat: number,
  userLon: number,
  limit: number = 3,
): Promise<VotingLocationWithDistance[]> {
  try {
    const response = await fetch("/api/locales/nearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat: userLat, lng: userLon, limit }),
    });

    if (!response.ok) {
      throw new Error("Error al buscar locales cercanos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in findNearestLocations:", error);
    throw error;
  }
}

