"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function MesaCard() {
  const [mesa, setMesa] = useState("");
  const [pabellon, setPabellon] = useState("");
  const [aula, setAula] = useState("");

  const hasData = mesa || pabellon || aula;

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="size-4 sm:size-5" />
          Ubicación de la mesa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="mesa" className="text-xs sm:text-sm font-medium">
              Número de mesa
            </label>
            <Input
              id="mesa"
              type="number"
              placeholder="Ej: 1234"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className="text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="pabellon"
              className="text-xs sm:text-sm font-medium"
            >
              Número de pabellón
            </label>
            <Input
              id="pabellon"
              type="number"
              placeholder="Ej: 2"
              value={pabellon}
              onChange={(e) => setPabellon(e.target.value)}
              className="text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="aula" className="text-xs sm:text-sm font-medium">
              Número de aula
            </label>
            <Input
              id="aula"
              type="number"
              placeholder="Ej: 15"
              value={aula}
              onChange={(e) => setAula(e.target.value)}
              className="text-sm sm:text-base"
            />
          </div>
        </div>

        {hasData && (
          <div className="rounded-lg border-2 border-dashed border-primary/30 bg-muted/30 p-4 sm:p-6">
            <div className="space-y-3 text-center">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Mapa estático de ubicación
              </p>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                {mesa && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Mesa</p>
                    <p className="text-base sm:text-lg font-semibold">{mesa}</p>
                  </div>
                )}
                {pabellon && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Pabellón</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {pabellon}
                    </p>
                  </div>
                )}
                {aula && (
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs text-muted-foreground">Aula</p>
                    <p className="text-base sm:text-lg font-semibold">{aula}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

