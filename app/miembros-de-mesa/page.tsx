import { PageHeader } from "@/components/shared/page-header";
import { MesaScheduleCalendar } from "@/components/shared/mesa-schedule-calendar";
import { MesaAssistant } from "@/components/shared/mesa-assistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MiembrosDeMesaPage() {
  const instructionPages = [
    {
      title: "Instalación",
      description: "Pasos detallados para la instalación de la mesa electoral",
      href: "/miembros-de-mesa/instalacion",
      phase: "instalacion",
    },
    {
      title: "Sufragio",
      description: "Pasos detallados para el proceso de sufragio",
      href: "/miembros-de-mesa/sufragio",
      phase: "sufragio",
    },
    {
      title: "Conteo y cierre",
      description: "Pasos detallados para el conteo de votos y cierre",
      href: "/miembros-de-mesa/conteo",
      phase: "conteo",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Información para miembros de mesa"
        description="Información esencial sobre tus responsabilidades y el calendario de actividades como miembro de mesa electoral."
      />

      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Calendar className="size-5 sm:size-6" />
            Calendario de actividades
          </h2>
          <MesaScheduleCalendar />
        </div>

        <div>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <FileText className="size-5 sm:size-6" />
            Instrucciones específicas
          </h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {instructionPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Card className="transition-shadow hover:shadow-lg h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      {page.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Ver instrucciones
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <MesaAssistant />
      </div>
    </div>
  );
}
