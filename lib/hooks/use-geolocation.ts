import { useState, useCallback } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

type UseGeolocationOptions = {
  onSuccess?: (coords: Coordinates) => void;
  onError?: (error: Error) => void;
};

type UseGeolocationReturn = {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  getLocation: () => void;
};

/**
 * Hook for getting user's geolocation with error handling
 * @param onSuccess - Callback when location is obtained
 * @param onError - Callback when error occurs
 * @returns Location state and getLocation function
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const { onSuccess, onError } = options;
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      const err = new Error(
        "La geolocalización no está disponible en tu navegador."
      );
      setError(err.message);
      onError?.(err);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates(coords);
        setLoading(false);
        onSuccess?.(coords);
      },
      (err) => {
        const errorMessage =
          err.code === 1
            ? "Permiso de geolocalización denegado."
            : err.code === 2
            ? "Ubicación no disponible."
            : "Tiempo de espera agotado al obtener la ubicación.";
        const error = new Error(errorMessage);
        setError(errorMessage);
        setLoading(false);
        onError?.(error);
      }
    );
  }, [onSuccess, onError]);

  return {
    coordinates,
    loading,
    error,
    getLocation,
  };
}
