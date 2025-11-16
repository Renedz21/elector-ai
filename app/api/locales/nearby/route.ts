import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { calculateDistance } from "@/lib/services/voting-locations";
import type { VotingLocationWithDistance } from "@/lib/types";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { lat, lng, limit = 3 } = await req.json();

    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json(
        { error: "lat y lng son requeridos y deben ser números" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: locations, error } = await supabase
      .from("voting_locations")
      .select("*")
      .limit(100);

    if (error) {
      console.error("Error fetching voting locations:", error);
      return NextResponse.json(
        { error: "Error al obtener locales de votación" },
        { status: 500 }
      );
    }

    if (!locations || locations.length === 0) {
      return NextResponse.json([]);
    }

    const locationsWithDistance: VotingLocationWithDistance[] = locations
      .map((location) => ({
        id: location.id,
        name: location.name,
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        district: location.district,
        created_at: location.created_at ?? undefined,
        updated_at: location.updated_at ?? undefined,
        distance: calculateDistance(
          lat,
          lng,
          location.latitude,
          location.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return NextResponse.json(locationsWithDistance);
  } catch (error) {
    console.error("Error in /api/locales/nearby:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

