"use client";

import { useState, useMemo } from "react";
import { PlanCard } from "@/components/shared/plan-card";
import { PlanFilter } from "@/components/shared/plan-filter";
import type { Plan } from "@/lib/services/plans";

type PlanListProps = {
  plans: Plan[];
  allTopics: string[];
};

function groupPlansByParty(plans: Plan[]): Record<string, Plan[]> {
  return plans.reduce((acc, plan) => {
    if (!acc[plan.partido]) {
      acc[plan.partido] = [];
    }
    acc[plan.partido].push(plan);
    return acc;
  }, {} as Record<string, Plan[]>);
}

export function PlanList({ plans, allTopics }: PlanListProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const filteredPlans = useMemo(() => {
    if (!selectedTopic) {
      return plans;
    }
    return plans.filter((plan) =>
      plan.temas_principales.includes(selectedTopic)
    );
  }, [plans, selectedTopic]);

  const groupedPlans = useMemo(
    () => groupPlansByParty(filteredPlans),
    [filteredPlans]
  );

  return (
    <>
      <PlanFilter
        topics={allTopics}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
      />
      <div className="space-y-8">
        {Object.keys(groupedPlans).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">
              No se encontraron planes con el tema seleccionado.
            </p>
          </div>
        ) : (
          Object.entries(groupedPlans)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([partido, partyPlans]) => (
              <div key={partido} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold">{partido}</h2>
                <div className="space-y-6">
                  {partyPlans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
}

