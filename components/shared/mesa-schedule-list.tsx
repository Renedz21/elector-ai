import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MesaSchedule } from "@/lib/types";
import { cn } from "@/lib/utils";

const phaseLabels = {
  instalacion: "Instalación",
  sufragio: "Sufragio",
  conteo: "Conteo",
};

const phaseColors = {
  instalacion: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  sufragio: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  conteo: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
};

function formatDate(date: Date): string {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${date.getDate()} de ${months[date.getMonth()]}`;
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

type MesaScheduleListProps = {
  schedule: MesaSchedule[];
  showPhase?: boolean;
};

export function MesaScheduleList({ schedule, showPhase = false }: MesaScheduleListProps) {
  if (schedule.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            No hay actividades programadas para esta fase
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {schedule.map((activity) => {
        const startDate = new Date(activity.start);
        const endDate = new Date(activity.end);
        const isToday = formatDateOnly(startDate) === formatDateOnly(new Date());

        return (
          <Card
            key={activity.id}
            className={cn(
              "hover:shadow-md",
              isToday && "ring-2 ring-primary"
            )}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>
                  {showPhase ? phaseLabels[activity.phase] : "Actividad"}
                </CardTitle>
                {showPhase && (
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 text-xs", phaseColors[activity.phase])}
                  >
                    {activity.phase}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    <span>{formatDate(startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span>
                      {formatTime(startDate)} - {formatTime(endDate)}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

