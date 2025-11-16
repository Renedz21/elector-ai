import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CandidateRow } from "@/lib/services/candidates";

type CandidateCardProps = {
  candidate: CandidateRow;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Link href={`/candidatos/${candidate.id}`}>
      <Card className="hover:shadow-md h-full">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle>{candidate.nombre}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {candidate.cargo}
              </Badge>
              {candidate.region && candidate.region !== "unknown" && (
                <Badge variant="outline" className="text-xs">
                  {candidate.region}
                </Badge>
              )}
              {candidate.tipo_candidato && (
                <Badge variant="outline" className="text-xs">
                  {candidate.tipo_candidato}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {candidate.partido}
            </p>
            {candidate.numero_lista && (
              <p className="text-sm text-muted-foreground">
                Lista {candidate.numero_lista}
                {candidate.orden && ` - Orden ${candidate.orden}`}
              </p>
            )}
            {candidate.hoja_vida && (
              <p className="text-sm line-clamp-3 leading-relaxed">
                {candidate.hoja_vida}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
