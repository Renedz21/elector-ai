import { PageHeader } from "@/components/shared/page-header";
import { getAllPlans } from "@/lib/services/plans";
import { PlanList } from "@/components/shared/plan-list";

function getAllUniqueTopics(plans: Awaited<ReturnType<typeof getAllPlans>>): string[] {
  const topics = new Set<string>();
  plans.forEach((plan) => {
    plan.temas_principales.forEach((tema) => topics.add(tema));
  });
  return Array.from(topics).sort();
}

export default async function PlanesPage() {
  const plans = await getAllPlans();
  const allTopics = getAllUniqueTopics(plans);

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <PageHeader
        title="Planes de Gobierno"
        description="Resúmenes generados con IA de los planes de gobierno presentados por los partidos políticos para las elecciones 2026."
      />
      <PlanList plans={plans} allTopics={allTopics} />
    </div>
  );
}
