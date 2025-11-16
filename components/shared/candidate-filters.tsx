"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useUrlFilters } from "@/lib/hooks/use-url-filters";
import { useSearchInput } from "@/lib/hooks/use-search-input";
import { Label } from "@/components/ui/label";

type CandidateFiltersProps = {
  partidos: string[];
  cargos: string[];
  regiones: string[];
};

type FilterSelectProps = {
  id: string;
  label: string;
  value: string | undefined;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
};

function FilterSelect({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function CandidateFilters({
  partidos,
  cargos,
  regiones,
}: CandidateFiltersProps) {
  const { getParam, setParam, clearAllParams, isPending } = useUrlFilters({
    basePath: "/candidatos",
    debounceMs: 500,
  });

  const [search, setSearch] = useSearchInput({
    initialValue: getParam("search"),
    onSearch: (value) => setParam("search", value),
    debounceMs: 500,
  });

  const partido = getParam("partido") || undefined;
  const cargo = getParam("cargo") || undefined;
  const region = getParam("region") || undefined;

  const hasActiveFilters = search || partido || cargo || region;

  const handleClearFilters = () => {
    setSearch("");
    clearAllParams();
  };

  return (
    <Card>
      <CardContent className="p-6">
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
            <FilterSelect
              key={`partido-${partido || "empty"}`}
              id="partido-filter"
              label="Partido"
              value={partido}
              options={partidos}
              placeholder="Todos los partidos"
              onChange={(value) => setParam("partido", value)}
            />

            <FilterSelect
              key={`cargo-${cargo || "empty"}`}
              id="cargo-filter"
              label="Cargo"
              value={cargo}
              options={cargos}
              placeholder="Todos los cargos"
              onChange={(value) => setParam("cargo", value)}
            />

            <FilterSelect
              key={`region-${region || "empty"}`}
              id="region-filter"
              label="Región"
              value={region}
              options={regiones}
              placeholder="Todas las regiones"
              onChange={(value) => setParam("region", value)}
            />
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleClearFilters}
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
