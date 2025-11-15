import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import type { Plan } from "@/lib/types";

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
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 sm:size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-4 sm:size-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <CardTitle className="text-base sm:text-lg leading-tight">
              {plan.partido}
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Publicado el {formatDate(plan.fecha_publicacion)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm leading-relaxed">
          {plan.resumen_ia}
        </p>
        <div className="flex flex-wrap gap-2">
          {plan.temas_principales.map((tema) => (
            <Badge key={tema} variant="secondary" className="text-xs sm:text-sm">
              {tema}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
