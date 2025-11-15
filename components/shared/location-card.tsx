"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

type LocationCardProps = {
  title: string;
  description?: string;
};

export function LocationCard({ title, description }: LocationCardProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en tu navegador.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError("No se pudo obtener tu ubicación. Verifica los permisos del navegador.");
        setLoading(false);
      },
    );
  };

  const openGoogleMaps = () => {
    if (coordinates) {
      const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="size-4 sm:size-5" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
        <Button
          onClick={getLocation}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          <Navigation className="size-4 mr-2" />
          {loading ? "Obteniendo ubicación..." : "Obtener mi ubicación"}
        </Button>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
            {error}
          </div>
        )}

        {coordinates && (
          <div className="space-y-3 rounded-md border bg-muted/50 p-3 sm:p-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium">
                Coordenadas obtenidas:
              </p>
              <p className="font-mono text-xs sm:text-sm break-all">
                Lat: {coordinates.lat.toFixed(6)}, Lng:{" "}
                {coordinates.lng.toFixed(6)}
              </p>
            </div>
            <Button
              onClick={openGoogleMaps}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ExternalLink className="size-4 mr-2" />
              Abrir en Google Maps
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

