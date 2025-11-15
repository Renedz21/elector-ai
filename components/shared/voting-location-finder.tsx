"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink, Loader2 } from "lucide-react";
import { findNearestLocations } from "@/lib/services/voting-locations";
import type { VotingLocationWithDistance } from "@/lib/types";

export function VotingLocationFinder() {
  const [locations, setLocations] = useState<VotingLocationWithDistance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en tu navegador.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);

        try {
          const nearest = await findNearestLocations(coords.lat, coords.lng, 3);
          setLocations(nearest);
        } catch (err) {
          setError("Error al buscar locales de votación. Intenta nuevamente.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("No se pudo obtener tu ubicación. Verifica los permisos del navegador.");
        setLoading(false);
      },
    );
  };

  const openGoogleMaps = (location: VotingLocationWithDistance) => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="size-4 sm:size-5" />
          Local de votación probable
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          Obtén tu ubicación para encontrar los 3 locales de votación más cercanos
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
        <Button
          onClick={getLocation}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Navigation className="size-4 mr-2" />
              Buscar locales cercanos
            </>
          )}
        </Button>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
            {error}
          </div>
        )}

        {userLocation && (
          <div className="rounded-md border bg-muted/50 p-3 text-xs sm:text-sm">
            <p className="font-medium mb-1">Tu ubicación:</p>
            <p className="font-mono">
              {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </p>
          </div>
        )}

        {locations.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Locales más cercanos:</p>
            {locations.map((location) => (
              <Card key={location.id} className="border">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{location.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {location.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {location.district}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {location.distance} km
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => openGoogleMaps(location)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <ExternalLink className="size-3 sm:size-4 mr-2" />
                      Abrir en Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

