import { createClient } from "@/utils/supabase/server";
import type { Tables } from "@/utils/supabase/database.types";

export type CandidateRow = Tables<"candidates">;

export type CandidateFilters = {
  partido?: string;
  cargo?: string;
  region?: string;
  search?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type CandidatesResponse = {
  data: CandidateRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getPartidos(): Promise<string[]> {
  const supabase = await createClient();

  // Get all partidos - use a high limit to get all records
  const { data, error } = await supabase
    .from("candidates")
    .select("partido")
    .order("partido")
    .limit(10000); // High limit to get all candidates

  if (error) {
    console.error("Error fetching partidos:", error);
    return [];
  }

  // Extract unique values
  const uniquePartidos = Array.from(
    new Set(data?.map((row) => row.partido) || [])
  ).sort();

  return uniquePartidos;
}

export async function getCargos(): Promise<string[]> {
  const supabase = await createClient();

  // Get all cargos - use a high limit to get all records
  const { data, error } = await supabase
    .from("candidates")
    .select("cargo")
    .order("cargo")
    .limit(10000); // High limit to get all candidates

  if (error) {
    console.error("Error fetching cargos:", error);
    return [];
  }

  console.log(data);
  // Extract unique values
  const uniqueCargos = Array.from(
    new Set(data?.map((row) => row.cargo) || [])
  ).sort();

  return uniqueCargos;
}

export async function getRegiones(): Promise<string[]> {
  const supabase = await createClient();

  // Get all regiones - use a high limit to get all records
  const { data, error } = await supabase
    .from("candidates")
    .select("region")
    .order("region")
    .limit(10000); // High limit to get all candidates

  if (error) {
    console.error("Error fetching regiones:", error);
    return [];
  }

  // Extract unique values, filtering out null/empty/unknown
  const uniqueRegiones = Array.from(
    new Set(
      data
        ?.map((row) => row.region)
        .filter((region) => region && region !== "unknown") || []
    )
  ).sort();

  return uniqueRegiones;
}

export async function getCandidates(
  filters: CandidateFilters = {},
  pagination: PaginationParams = {}
): Promise<CandidatesResponse> {
  const supabase = await createClient();
  const page = pagination.page || 1;
  const limit = pagination.limit || 24;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("candidates").select("*", { count: "exact" });

  if (filters.partido) {
    query = query.eq("partido", filters.partido);
  }

  if (filters.cargo) {
    query = query.eq("cargo", filters.cargo);
  }

  if (filters.region) {
    query = query.eq("region", filters.region);
  }

  if (filters.search) {
    const searchTerm = filters.search;
    query = query.or(
      `nombre.ilike.%${searchTerm}%,partido.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%,cargo.ilike.%${searchTerm}%`
    );
  }

  query = query
    .order("partido")
    .order("numero_lista", { ascending: true })
    .order("orden", { ascending: true })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching candidates:", error);
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data: data || [],
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getCandidateById(
  id: string
): Promise<CandidateRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching candidate:", error);
    return null;
  }

  return data;
}
