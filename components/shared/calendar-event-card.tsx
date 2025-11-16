"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, AlertCircle } from "lucide-react";
import type { CalendarEvent } from "@/lib/types";

type CalendarEventCardProps = {
  event: CalendarEvent;
};

const tipoLabels: Record<CalendarEvent["tipo"], string> = {
  inscripcion: "Inscripción",
  debate: "Debate",
  votacion: "Votación",
  proclamacion: "Proclamación",
  otro: "Evento",
};

const tipoColors: Record<
  CalendarEvent["tipo"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  inscripcion: "secondary",
  debate: "outline",
  votacion: "destructive",
  proclamacion: "default",
  otro: "outline",
};

export function CalendarEventCard({ event }: CalendarEventCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateFull = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Card
        className={`cursor-pointer hover:shadow-md ${
          event.importante ? "border-primary" : ""
        }`}
        onClick={() => setIsOpen(true)}
      >
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="size-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {formatDate(event.fecha)}
                  </p>
                  <p className="text-base font-semibold leading-tight">
                    {event.descripcion}
                  </p>
                </div>
                <Badge variant={tipoColors[event.tipo]} className="text-xs w-fit">
                  {tipoLabels[event.tipo]}
                </Badge>
              </div>
              {event.importante && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <AlertCircle className="size-4 shrink-0" />
                  <span className="font-medium">Evento importante</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-left">
                  {tipoLabels[event.tipo]}
                </DialogTitle>
                <DialogDescription className="text-left mt-1">
                  {formatDateFull(event.fecha)}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Descripción
              </p>
              <p className="text-base">{event.descripcion}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={tipoColors[event.tipo]}>
                {tipoLabels[event.tipo]}
              </Badge>
              {event.importante && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <AlertCircle className="size-4" />
                  <span className="font-medium">Evento importante</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
