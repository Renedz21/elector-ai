import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { CandidateList } from "@/components/shared/candidate-list";
import { CandidateFilters } from "@/components/shared/candidate-filters";
import { CandidatePagination } from "@/components/shared/candidate-pagination";
import { LoadingState } from "@/components/shared/loading-state";
import {
  getPartidos,
  getCargos,
  getRegiones,
  getCandidates,
} from "@/lib/services/candidates";

type SearchParams = Promise<{
  partido?: string;
  cargo?: string;
  region?: string;
  search?: string;
  page?: string;
}>;

type Props = {
  searchParams: SearchParams;
};

async function CandidatosContent({ searchParams }: Props) {
  const params = await searchParams;
  const pageParam = params.page ? parseInt(params.page, 10) : 1;
  const page = pageParam > 0 ? pageParam : 1;
  const filters = {
    partido: params.partido,
    cargo: params.cargo,
    region: params.region,
    search: params.search,
  };

  const [partidos, cargos, regiones, candidatesResponse] = await Promise.all([
    getPartidos(),
    getCargos(),
    getRegiones(),
    getCandidates(filters, { page, limit: 24 }),
  ]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Candidatos 2026"
        description="Conoce a los candidatos presidenciales y congresales para las elecciones generales de Perú 2026."
      />
      <CandidateFilters
        partidos={partidos}
        cargos={cargos}
        regiones={regiones}
      />
      <Suspense fallback={<LoadingState />}>
        <CandidateList
          candidates={candidatesResponse.data}
          total={candidatesResponse.total}
        />
        {candidatesResponse.totalPages > 1 && (
          <CandidatePagination
            currentPage={candidatesResponse.page}
            totalPages={candidatesResponse.totalPages}
          />
        )}
      </Suspense>
    </div>
  );
}

export default function CandidatosPage(props: Props) {
  return (
    <Suspense fallback={<LoadingState />}>
      <CandidatosContent {...props} />
    </Suspense>
  );
}
