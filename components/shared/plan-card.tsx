import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Plan } from "@/lib/services/plans";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <CardTitle>{plan.partido}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Publicado el {formatDate(plan.fecha_publicacion)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed line-clamp-3">
            {plan.resumen_ia}
          </p>
          <div className="flex flex-wrap gap-2">
            {plan.temas_principales.map((tema) => (
              <Badge key={tema} variant="secondary" className="text-xs">
                {tema}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {plan.url_documento && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={plan.url_documento}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="size-4" />
                  Descargar documento
                </a>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/planes/${plan.id}`}>
                Ver detalles
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
