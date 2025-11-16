import { createClient } from "@/utils/supabase/server";
import type { Tables } from "@/utils/supabase/database.types";
import { dummyCandidates } from "@/lib/dummy-data";

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
  }

  // Use dummy data if no data from Supabase
  const useDummyData = !data || data.length === 0;
  let candidates = data || [];
  let total = count || 0;

  if (useDummyData) {
    candidates = dummyCandidates;
    total = dummyCandidates.length;
  }

  // Apply filters to dummy data if using it
  if (useDummyData) {
    let filtered = [...dummyCandidates];

    if (filters.partido) {
      filtered = filtered.filter((c) => c.partido === filters.partido);
    }
    if (filters.cargo) {
      filtered = filtered.filter((c) => c.cargo === filters.cargo);
    }
    if (filters.region) {
      filtered = filtered.filter((c) => c.region === filters.region);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.nombre.toLowerCase().includes(searchLower) ||
          c.partido.toLowerCase().includes(searchLower) ||
          c.region.toLowerCase().includes(searchLower) ||
          c.cargo.toLowerCase().includes(searchLower)
      );
    }

    total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    candidates = filtered.slice(start, end);
  }

  const totalPages = Math.ceil(total / limit);

  return {
    data: candidates,
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
    console.log("Error fetching candidate:", error);
    return null;
  }

  // Use dummy data if no data from Supabase
  if (!data) {
    return dummyCandidates.find((c) => c.id === id) || null;
  }

  return data;
}
