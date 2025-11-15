import { PageHeader } from "@/components/shared/page-header";
import { MesaInstructionsViewer } from "@/components/shared/mesa-instructions-viewer";
import sufragioData from "@/instructions/mesa/sufragio.json";

export default function SufragioPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Instrucciones de sufragio"
        description="Pasos detallados para el proceso de sufragio"
      />
      <MesaInstructionsViewer data={sufragioData} />
    </div>
  );
}

