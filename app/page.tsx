import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AISearchSection } from "@/components/shared/ai-search-section";
import {
  Calendar,
  Users,
  FileText,
  UserCheck,
  ClipboardList,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      <section className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
          ElectorAI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Información electoral inteligente para las elecciones generales de
          Perú 2026. Pregunta lo que necesites saber.
        </p>
        <div className="max-w-3xl mx-auto pt-6 sm:pt-8 px-4">
          <AISearchSection />
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center px-4">
          Explora la plataforma
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/candidatos">
            <Card className="transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="size-6 sm:size-7 md:size-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Candidatos
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Conoce a los candidatos presidenciales y congresales con sus
                    propuestas y trayectoria.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calendario">
            <Card className="transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="size-6 sm:size-7 md:size-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Calendario Electoral
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Fechas importantes del proceso electoral 2026, desde
                    inscripciones hasta proclamación.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/planes">
            <Card className="transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="size-6 sm:size-7 md:size-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Planes de Gobierno
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Resúmenes de los planes de gobierno generados con IA para
                    facilitar su comprensión.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center px-4">
          Información electoral
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <Link href="/electores">
            <Card className="transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center rounded-full bg-primary/10">
                    <UserCheck className="size-6 sm:size-7 md:size-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Información para electores
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Ubicación de locales de votación, instrucciones sobre la
                    cédula de sufragio, recomendaciones de seguridad y marco
                    legal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/miembros-de-mesa">
            <Card className="transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center rounded-full bg-primary/10">
                    <ClipboardList className="size-6 sm:size-7 md:size-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Información para miembros de mesa
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Calendario de actividades, deberes y responsabilidades para
                    miembros de mesa electoral.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
