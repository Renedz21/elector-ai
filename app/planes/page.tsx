import { PageHeader } from "@/components/shared/page-header";
import { PlanCard } from "@/components/shared/plan-card";
import { plans } from "@/lib/dummy-data";

export default function PlanesPage() {
  const sortedPlans = [...plans].sort(
    (a, b) =>
      new Date(b.fecha_publicacion).getTime() -
      new Date(a.fecha_publicacion).getTime(),
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <PageHeader
        title="Planes de Gobierno"
        description="Resúmenes generados con IA de los planes de gobierno presentados por los partidos políticos para las elecciones 2026."
      />
      <div className="space-y-4 sm:space-y-6">
        {sortedPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
