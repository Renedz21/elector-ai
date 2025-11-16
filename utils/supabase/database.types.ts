export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string | null
          descripcion: string
          fecha: string
          id: string
          importante: boolean
          tipo: Database["public"]["Enums"]["event_tipo"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion: string
          fecha: string
          id?: string
          importante?: boolean
          tipo: Database["public"]["Enums"]["event_tipo"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string
          fecha?: string
          id?: string
          importante?: boolean
          tipo?: Database["public"]["Enums"]["event_tipo"]
          updated_at?: string | null
        }
        Relationships: []
      }
      candidates: {
        Row: {
          actividades: Json
          cargo: string
          created_at: string | null
          hoja_vida: string
          id: string
          imagen_url: string | null
          nombre: string
          numero_lista: number | null
          orden: number | null
          partido: string
          propuestas: Json
          region: string
          tipo_candidato: string | null
          updated_at: string | null
        }
        Insert: {
          actividades?: Json
          cargo: string
          created_at?: string | null
          hoja_vida: string
          id?: string
          imagen_url?: string | null
          nombre: string
          numero_lista?: number | null
          orden?: number | null
          partido: string
          propuestas?: Json
          region: string
          tipo_candidato?: string | null
          updated_at?: string | null
        }
        Update: {
          actividades?: Json
          cargo?: string
          created_at?: string | null
          hoja_vida?: string
          id?: string
          imagen_url?: string | null
          nombre?: string
          numero_lista?: number | null
          orden?: number | null
          partido?: string
          propuestas?: Json
          region?: string
          tipo_candidato?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mesa_locations: {
        Row: {
          created_at: string | null
          floor: string | null
          id: string
          local_id: string
          mesa_number: string
          pavilion: string | null
          room: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          floor?: string | null
          id?: string
          local_id: string
          mesa_number: string
          pavilion?: string | null
          room?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          floor?: string | null
          id?: string
          local_id?: string
          mesa_number?: string
          pavilion?: string | null
          room?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mesa_locations_local_id_fkey"
            columns: ["local_id"]
            isOneToOne: false
            referencedRelation: "voting_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      mesa_schedule: {
        Row: {
          created_at: string | null
          description: string
          end_time: string
          id: string
          phase: Database["public"]["Enums"]["mesa_fase"]
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_time: string
          id?: string
          phase: Database["public"]["Enums"]["mesa_fase"]
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_time?: string
          id?: string
          phase?: Database["public"]["Enums"]["mesa_fase"]
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string | null
          fecha_publicacion: string
          id: string
          partido: string
          resumen_ia: string
          temas_principales: Json
          updated_at: string | null
          url_documento: string | null
        }
        Insert: {
          created_at?: string | null
          fecha_publicacion: string
          id?: string
          partido: string
          resumen_ia: string
          temas_principales?: Json
          updated_at?: string | null
          url_documento?: string | null
        }
        Update: {
          created_at?: string | null
          fecha_publicacion?: string
          id?: string
          partido?: string
          resumen_ia?: string
          temas_principales?: Json
          updated_at?: string | null
          url_documento?: string | null
        }
        Relationships: []
      }
      voting_locations: {
        Row: {
          address: string
          created_at: string | null
          district: string
          id: string
          latitude: number
          longitude: number
          name: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          district: string
          id?: string
          latitude: number
          longitude: number
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          district?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_tipo:
        | "inscripcion"
        | "debate"
        | "votacion"
        | "proclamacion"
        | "otro"
      mesa_fase: "instalacion" | "sufragio" | "conteo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_tipo: ["inscripcion", "debate", "votacion", "proclamacion", "otro"],
      mesa_fase: ["instalacion", "sufragio", "conteo"],
    },
  },
} as const

