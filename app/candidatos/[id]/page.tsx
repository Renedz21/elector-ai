import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { candidates } from "@/lib/dummy-data";
import { User, MapPin, Briefcase } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return candidates.map((candidate) => ({
    id: candidate.id,
  }));
}

export default async function CandidateProfilePage({ params }: Props) {
  const { id } = await params;
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {candidate.nombre}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs sm:text-sm">
                <Briefcase className="mr-1 size-3" />
                {candidate.cargo}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                <MapPin className="mr-1 size-3" />
                {candidate.region}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-base sm:text-lg font-medium text-muted-foreground">
          {candidate.partido}
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="size-4 sm:size-5" />
            Hoja de Vida
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <p className="text-sm sm:text-base leading-relaxed">
            {candidate.hoja_vida}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Actividades y Experiencia
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <ul className="space-y-2 sm:space-y-3">
            {candidate.actividades.map((actividad, index) => (
              <li key={index} className="flex gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm sm:text-base leading-relaxed flex-1">
                  {actividad}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Propuestas Principales
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {candidate.propuestas.map((propuesta, index) => (
              <div
                key={index}
                className="rounded-lg border p-3 sm:p-4 transition-colors hover:bg-muted/50"
              >
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {propuesta}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
