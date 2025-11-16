import { createClient } from "@/utils/supabase/server";
import type { Tables } from "@/utils/supabase/database.types";

type PlanRow = Tables<"plans">;

export type Plan = {
  id: string;
  partido: string;
  url_documento: string | null;
  resumen_ia: string;
  temas_principales: string[];
  fecha_publicacion: string;
};

function parseTemasPrincipales(temas: unknown): string[] {
  if (Array.isArray(temas)) {
    return temas.filter((t): t is string => typeof t === "string");
  }
  return [];
}

function mapPlanFromRow(row: PlanRow): Plan {
  return {
    id: row.id,
    partido: row.partido,
    url_documento: row.url_documento,
    resumen_ia: row.resumen_ia,
    temas_principales: parseTemasPrincipales(row.temas_principales),
    fecha_publicacion: row.fecha_publicacion,
  };
}

export async function getAllPlans(): Promise<Plan[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("fecha_publicacion", { ascending: false });

  if (error) {
    console.error("Error fetching plans:", error);
    return [];
  }

  return (data || []).map(mapPlanFromRow);
}

export async function getPlanById(id: string): Promise<Plan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching plan:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return mapPlanFromRow(data);
}

