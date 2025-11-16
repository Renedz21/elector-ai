import { PageHeader } from "@/components/shared/page-header";
import { MesaInstructionsViewer } from "@/components/shared/mesa-instructions-viewer";
import { MesaScheduleList } from "@/components/shared/mesa-schedule-list";
import { getMesaScheduleByPhase } from "@/lib/services/mesa-schedule";
import conteoData from "@/instructions/mesa/conteo.json";
import { Clock } from "lucide-react";

export default async function ConteoPage() {
  const schedule = await getMesaScheduleByPhase("conteo");

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Instrucciones de conteo y cierre"
        description="Pasos detallados para el conteo de votos y cierre de la mesa"
      />

      {schedule.length > 0 && (
        <div>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Clock className="size-5 sm:size-6" />
            Horarios de conteo
          </h2>
          <MesaScheduleList schedule={schedule} />
        </div>
      )}

      <div>
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
          Pasos de conteo y cierre
        </h2>
        <MesaInstructionsViewer data={conteoData} />
      </div>
    </div>
  );
}

