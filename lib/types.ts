export type Candidate = {
  id: string;
  nombre: string;
  partido: string;
  region: string;
  cargo: string;
  hoja_vida: string;
  actividades: string[];
  propuestas: string[];
  imagen_url?: string;
};

export type Plan = {
  id: string;
  partido: string;
  url_documento?: string;
  resumen_ia: string;
  temas_principales: string[];
  fecha_publicacion: string;
};

export type CalendarEvent = {
  id: string;
  fecha: string;
  descripcion: string;
  tipo: "inscripcion" | "debate" | "votacion" | "proclamacion" | "otro";
  importante: boolean;
};

export type DocumentEmbedding = {
  id: string;
  content: string;
  embedding: number[];
  metadata?: Record<string, unknown>;
};

export type SearchResult = {
  content: string;
  similarity: number;
  metadata?: Record<string, unknown>;
};

export type AskRequest = {
  question: string;
};

export type AskResponse = {
  answer: string;
  sources?: SearchResult[];
};

export type VotingLocation = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  district: string;
  created_at?: string;
  updated_at?: string;
};

export type VotingLocationWithDistance = VotingLocation & {
  distance: number;
};

export type MesaLocation = {
  id: string;
  mesa_number: string;
  local_id: string;
  pavilion: string | null;
  floor: string | null;
  room: string | null;
  created_at?: string;
  updated_at?: string;
  voting_location?: VotingLocation;
};

export type MesaSchedule = {
  id: string;
  phase: "instalacion" | "sufragio" | "conteo";
  start: string;
  end: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};
