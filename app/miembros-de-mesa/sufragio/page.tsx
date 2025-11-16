import { PageHeader } from "@/components/shared/page-header";
import { MesaInstructionsViewer } from "@/components/shared/mesa-instructions-viewer";
import { MesaScheduleList } from "@/components/shared/mesa-schedule-list";
import { getMesaScheduleByPhase } from "@/lib/services/mesa-schedule";
import sufragioData from "@/instructions/mesa/sufragio.json";
import { Clock } from "lucide-react";

export default async function SufragioPage() {
  const schedule = await getMesaScheduleByPhase("sufragio");

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Instrucciones de sufragio"
        description="Pasos detallados para el proceso de sufragio"
      />

      {schedule.length > 0 && (
        <div>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Clock className="size-5 sm:size-6" />
            Horarios de sufragio
          </h2>
          <MesaScheduleList schedule={schedule} />
        </div>
      )}

      <div>
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
          Pasos de sufragio
        </h2>
        <MesaInstructionsViewer data={sufragioData} />
      </div>
    </div>
  );
}

