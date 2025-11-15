import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Candidate } from "@/lib/types";

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Link href={`/candidatos/${candidate.id}`}>
      <Card className="transition-shadow hover:shadow-lg h-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            <CardTitle className="text-lg sm:text-xl leading-tight">
              {candidate.nombre}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs sm:text-sm">
                {candidate.cargo}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                {candidate.region}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              {candidate.partido}
            </p>
            <p className="text-xs sm:text-sm line-clamp-3 sm:line-clamp-4 leading-relaxed">
              {candidate.hoja_vida}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
