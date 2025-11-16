import { useState, useCallback } from "react";
import { findMesaByNumber } from "@/lib/services/mesa-locations";
import type { MesaLocation } from "@/lib/types";

type UseMesaSearchReturn = {
  mesaLocation: MesaLocation | null;
  loading: boolean;
  error: string | null;
  searchMesa: (mesaNumber: string) => Promise<void>;
  reset: () => void;
};

/**
 * Hook for searching mesa by number with loading and error states
 * @returns Mesa search state and search function
 */
export function useMesaSearch(): UseMesaSearchReturn {
  const [mesaLocation, setMesaLocation] = useState<MesaLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMesa = useCallback(async (mesaNumber: string) => {
    if (!mesaNumber.trim()) {
      setError("Por favor ingresa un número de mesa");
      return;
    }

    setLoading(true);
    setError(null);
    setMesaLocation(null);

    try {
      const result = await findMesaByNumber(mesaNumber.trim());
      if (result) {
        setMesaLocation(result);
      } else {
        setError("No se encontró una mesa con ese número");
      }
    } catch (err) {
      setError("Error al buscar la mesa. Intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMesaLocation(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mesaLocation,
    loading,
    error,
    searchMesa,
    reset,
  };
}

