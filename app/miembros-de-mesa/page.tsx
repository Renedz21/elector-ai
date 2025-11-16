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
          <h2 className="mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Calendar className="size-6" />
            Calendario de actividades
          </h2>
          <MesaScheduleCalendar />
        </div>

        <div>
          <h2 className="mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <FileText className="size-6" />
            Instrucciones específicas
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {instructionPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Card className="hover:shadow-md h-full">
                  <CardHeader>
                    <CardTitle>{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {page.description}
                      </p>
                      <Button variant="outline" className="w-full">
                        Ver instrucciones
                        <ArrowRight className="size-4 ml-2" />
                      </Button>
                    </div>
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
