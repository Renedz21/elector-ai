import { useState, useCallback } from "react";
import { findNearestLocations } from "@/lib/services/voting-locations";
import type { VotingLocationWithDistance } from "@/lib/types";

type Coordinates = {
  lat: number;
  lng: number;
};

type UseLocationSearchOptions = {
  limit?: number;
};

type UseLocationSearchReturn = {
  locations: VotingLocationWithDistance[];
  loading: boolean;
  error: string | null;
  searchLocations: (coords: Coordinates) => Promise<void>;
  reset: () => void;
};

/**
 * Hook for searching nearest voting locations by coordinates
 * @param limit - Maximum number of locations to return (default: 3)
 * @returns Location search state and search function
 */
export function useLocationSearch(
  options: UseLocationSearchOptions = {}
): UseLocationSearchReturn {
  const { limit = 3 } = options;
  const [locations, setLocations] = useState<VotingLocationWithDistance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = useCallback(
    async (coords: Coordinates) => {
      setLoading(true);
      setError(null);
      setLocations([]);

      try {
        const nearest = await findNearestLocations(coords.lat, coords.lng, limit);
        setLocations(nearest);
      } catch (err) {
        setError("Error al buscar locales de votación. Intenta nuevamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  const reset = useCallback(() => {
    setLocations([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    locations,
    loading,
    error,
    searchLocations,
    reset,
  };
}

