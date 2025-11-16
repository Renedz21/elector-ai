import type { CandidateRow } from "@/lib/services/candidates";
import { CandidateCard } from "./candidate-card";

type CandidateListProps = {
  candidates: CandidateRow[];
  total: number;
};

export function CandidateList({ candidates, total }: CandidateListProps) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">No se encontraron candidatos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {total} candidato{total !== 1 ? "s" : ""} encontrado
        {total !== 1 ? "s" : ""}
        {candidates.length < total && (
          <span className="ml-1">
            (mostrando {candidates.length} de {total})
          </span>
        )}
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
