import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className={event.importante ? "border-primary" : ""}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="size-5 sm:size-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {formatDate(event.fecha)}
                </p>
                <p className="text-sm sm:text-base font-semibold leading-tight">
                  {event.descripcion}
                </p>
              </div>
              <Badge
                variant={tipoColors[event.tipo]}
                className="text-xs sm:text-sm w-fit"
              >
                {tipoLabels[event.tipo]}
              </Badge>
            </div>
            {event.importante && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-primary">
                <AlertCircle className="size-3 sm:size-4 shrink-0" />
                <span className="font-medium">Evento importante</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
