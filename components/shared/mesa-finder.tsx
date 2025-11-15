"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Loader2, ExternalLink } from "lucide-react";
import { findMesaByNumber } from "@/lib/services/mesa-locations";
import type { MesaLocation } from "@/lib/types";

export function MesaFinder() {
  const [mesaNumber, setMesaNumber] = useState("");
  const [mesaLocation, setMesaLocation] = useState<MesaLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
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
  };

  const openGoogleMaps = (location: MesaLocation) => {
    if (location.voting_location) {
      const url = `https://www.google.com/maps?q=${location.voting_location.latitude},${location.voting_location.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="size-4 sm:size-5" />
          Buscar ubicación de mesa
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          Ingresa el número de tu mesa para encontrar su ubicación dentro del local
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ej: 1234"
            value={mesaNumber}
            onChange={(e) => setMesaNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
          </Button>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
            {error}
          </div>
        )}

        {mesaLocation && (
          <div className="space-y-4 rounded-lg border-2 border-primary/30 bg-muted/30 p-4 sm:p-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-2">
                  Mesa {mesaLocation.mesa_number}
                </h4>
                {mesaLocation.voting_location && (
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="font-medium">
                      {mesaLocation.voting_location.name}
                    </p>
                    <p className="text-muted-foreground">
                      {mesaLocation.voting_location.address}
                    </p>
                    <p className="text-muted-foreground">
                      {mesaLocation.voting_location.district}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {mesaLocation.pavilion && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Pabellón</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {mesaLocation.pavilion}
                    </p>
                  </div>
                )}
                {mesaLocation.floor && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Piso</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {mesaLocation.floor}
                    </p>
                  </div>
                )}
                {mesaLocation.room && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Aula</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {mesaLocation.room}
                    </p>
                  </div>
                )}
              </div>

              {mesaLocation.voting_location && (
                <Button
                  onClick={() => openGoogleMaps(mesaLocation!)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <ExternalLink className="size-4 mr-2" />
                  Ver local en Maps
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

