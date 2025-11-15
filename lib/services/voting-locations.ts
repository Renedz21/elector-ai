import { dummyVotingLocations } from "@/lib/dummy-data";
import type { VotingLocation, VotingLocationWithDistance } from "@/lib/types";

export async function getAllVotingLocations(): Promise<VotingLocation[]> {
  return dummyVotingLocations;
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
  const locations = await getAllVotingLocations();

  const locationsWithDistance: VotingLocationWithDistance[] = locations.map(
    (location) => ({
      ...location,
      distance: calculateDistance(
        userLat,
        userLon,
        Number(location.latitude),
        Number(location.longitude),
      ),
    }),
  );

  return locationsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

