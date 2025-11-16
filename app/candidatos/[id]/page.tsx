import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCandidateById } from "@/lib/services/candidates";
import {
  User,
  MapPin,
  Briefcase,
  Building2,
  List,
  Hash,
  FileText,
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CandidateProfilePage({ params }: Props) {
  const { id } = await params;
  const candidate = await getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  const actividades = Array.isArray(candidate.actividades)
    ? candidate.actividades
    : [];
  const propuestas = Array.isArray(candidate.propuestas)
    ? candidate.propuestas
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {candidate.nombre}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                <Briefcase className="mr-1 size-3" />
                {candidate.cargo}
              </Badge>
              {candidate.region && candidate.region !== "unknown" && (
                <Badge variant="outline" className="text-xs">
                  <MapPin className="mr-1 size-3" />
                  {candidate.region}
                </Badge>
              )}
              {candidate.tipo_candidato && (
                <Badge variant="outline" className="text-xs">
                  <User className="mr-1 size-3" />
                  {candidate.tipo_candidato}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-base font-medium text-muted-foreground flex items-center gap-2">
            <Building2 className="size-5" />
            {candidate.partido}
          </p>
          {(candidate.numero_lista || candidate.orden) && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {candidate.numero_lista && (
                <span className="flex items-center gap-2">
                  <List className="size-4" />
                  Lista {candidate.numero_lista}
                </span>
              )}
              {candidate.orden && (
                <span className="flex items-center gap-2">
                  <Hash className="size-4" />
                  Orden {candidate.orden}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {candidate.hoja_vida && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Hoja de Vida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {candidate.hoja_vida}
            </p>
          </CardContent>
        </Card>
      )}

      {actividades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Actividades y Experiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {actividades.map((actividad, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm leading-relaxed flex-1">
                    {typeof actividad === "string"
                      ? actividad
                      : JSON.stringify(actividad)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {propuestas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Propuestas Principales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {propuestas.map((propuesta, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {typeof propuesta === "string"
                      ? propuesta
                      : JSON.stringify(propuesta)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!candidate.hoja_vida &&
        actividades.length === 0 &&
        propuestas.length === 0 && (
          <Card>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                No hay información adicional disponible para este candidato.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
