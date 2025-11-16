import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getPlanById } from "@/lib/services/plans";
import { FileText, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlanDetailPage({ params }: Props) {
  const { id } = await params;
  const plan = await getPlanById(id);

  if (!plan) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/planes">
            <ArrowLeft className="size-4" />
            Volver a planes
          </Link>
        </Button>
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-6 text-primary" />
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {plan.partido}
            </h1>
            <p className="text-sm text-muted-foreground">
              Publicado el {formatDate(plan.fecha_publicacion)}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {plan.url_documento && (
        <div className="flex justify-start">
          <Button variant="outline" asChild>
            <a
              href={plan.url_documento}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-4" />
              Descargar documento original
            </a>
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resumen con IA</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {plan.resumen_ia}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Temas Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {plan.temas_principales.length > 0 ? (
              plan.temas_principales.map((tema) => (
                <Badge key={tema} variant="secondary" className="text-xs">
                  {tema}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No hay temas principales registrados.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
