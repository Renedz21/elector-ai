"use client";

import { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/use-debounce";

type CandidateFiltersProps = {
  partidos: string[];
  cargos: string[];
  regiones: string[];
};

export function CandidateFilters({
  partidos,
  cargos,
  regiones,
}: CandidateFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [partido, setPartido] = useState(searchParams.get("partido") || "");
  const [cargo, setCargo] = useState(searchParams.get("cargo") || "");
  const [region, setRegion] = useState(searchParams.get("region") || "");

  // Debounce search input with 500ms delay
  const debouncedSearch = useDebounce(search, 500);

  // Sync state with URL params (only when URL changes, not from local state changes)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlPartido = searchParams.get("partido") || "";
    const urlCargo = searchParams.get("cargo") || "";
    const urlRegion = searchParams.get("region") || "";

    setSearch(urlSearch);
    setPartido(urlPartido);
    setCargo(urlCargo);
    setRegion(urlRegion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Apply debounced search automatically (only when user types, not on URL changes)
  useEffect(() => {
    const currentSearchParam = searchParams.get("search") || "";
    const trimmedDebounced = debouncedSearch.trim();
    const trimmedCurrent = currentSearchParam.trim();

    // Only update if the debounced value is different from URL param
    // This prevents loops when URL changes update the state
    if (trimmedDebounced !== trimmedCurrent) {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (trimmedDebounced) {
          params.set("search", trimmedDebounced);
        } else {
          params.delete("search");
        }
        params.delete("page");
        router.push(`/candidatos?${params.toString()}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);


  const clearFilters = () => {
    setSearch("");
    setPartido("");
    setCargo("");
    setRegion("");
    startTransition(() => {
      router.push("/candidatos");
    });
  };

  const hasActiveFilters = search || partido || cargo || region;

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, partido, región o cargo..."
                className="pl-10 h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="partido-filter"
                className="text-sm font-medium text-muted-foreground"
              >
                Partido
              </label>
              <select
                id="partido-filter"
                value={partido}
                onChange={(e) => {
                  setPartido(e.target.value);
                  startTransition(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (e.target.value) {
                      params.set("partido", e.target.value);
                    } else {
                      params.delete("partido");
                    }
                    params.delete("page");
                    router.push(`/candidatos?${params.toString()}`);
                  });
                }}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
              >
                <option value="">Todos los partidos</option>
                {partidos.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cargo-filter"
                className="text-sm font-medium text-muted-foreground"
              >
                Cargo
              </label>
              <select
                id="cargo-filter"
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                  startTransition(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (e.target.value) {
                      params.set("cargo", e.target.value);
                    } else {
                      params.delete("cargo");
                    }
                    params.delete("page");
                    router.push(`/candidatos?${params.toString()}`);
                  });
                }}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
              >
                <option value="">Todos los cargos</option>
                {cargos.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="region-filter"
                className="text-sm font-medium text-muted-foreground"
              >
                Región
              </label>
              <select
                id="region-filter"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  startTransition(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (e.target.value) {
                      params.set("region", e.target.value);
                    } else {
                      params.delete("region");
                    }
                    params.delete("page");
                    router.push(`/candidatos?${params.toString()}`);
                  });
                }}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
              >
                <option value="">Todas las regiones</option>
                {regiones.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                disabled={isPending}
              >
                <X className="size-4" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

