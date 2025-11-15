import { PageHeader } from "@/components/shared/page-header";
import { MesaInstructionsViewer } from "@/components/shared/mesa-instructions-viewer";
import instalacionData from "@/instructions/mesa/instalacion.json";

export default function InstalacionPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Instrucciones de instalación"
        description="Pasos detallados para la instalación de la mesa electoral"
      />
      <MesaInstructionsViewer data={instalacionData} />
    </div>
  );
}

