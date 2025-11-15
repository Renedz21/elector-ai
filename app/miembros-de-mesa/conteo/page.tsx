import { PageHeader } from "@/components/shared/page-header";
import { MesaInstructionsViewer } from "@/components/shared/mesa-instructions-viewer";
import conteoData from "@/instructions/mesa/conteo.json";

export default function ConteoPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Instrucciones de conteo y cierre"
        description="Pasos detallados para el conteo de votos y cierre de la mesa"
      />
      <MesaInstructionsViewer data={conteoData} />
    </div>
  );
}

