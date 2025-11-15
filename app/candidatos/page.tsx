import { PageHeader } from "@/components/shared/page-header";
import { CandidateList } from "@/components/shared/candidate-list";
import { candidates } from "@/lib/dummy-data";

export default function CandidatosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Candidatos 2026"
        description="Conoce a los candidatos presidenciales y congresales para las elecciones generales de Perú 2026."
      />
      <CandidateList candidates={candidates} />
    </div>
  );
}
