import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getCandidates } from "@/lib/services/candidates";
import {
  getAllCalendarEvents,
  getCalendarEventsByType,
} from "@/lib/services/calendar-events";
import { getAllPlans } from "@/lib/services/plans";

export const maxDuration = 30;

type QueryIntent = {
  needsCandidates: boolean;
  needsCalendar: boolean;
  needsPlans: boolean;
  searchTerms: string[];
};

// Palabras de parada comunes en español
const stopWords = new Set([
  "el",
  "la",
  "los",
  "las",
  "de",
  "del",
  "en",
  "y",
  "o",
  "a",
  "que",
  "qué",
  "cual",
  "cuál",
  "como",
  "cómo",
  "donde",
  "dónde",
  "cuando",
  "cuándo",
  "por",
  "para",
  "con",
  "sin",
  "sobre",
  "entre",
  "hasta",
  "desde",
  "sabes",
  "sabe",
  "conoces",
  "conoce",
]);

// Keywords para detectar intenciones
const candidateKeywords = [
  "candidato",
  "candidata",
  "candidatos",
  "partido",
  "partidos",
  "lista",
  "vicepresidente",
  "presidente",
  "congresista",
  "gobernador",
  "alcalde",
  "regidor",
];

const calendarKeywords = [
  "fecha",
  "fechas",
  "calendario",
  "cuándo",
  "cuando",
  "día",
  "dias",
  "días",
  "votación",
  "votacion",
  "debate",
  "inscripción",
  "inscripcion",
  "proclamación",
  "proclamacion",
  "elección",
  "elecciones",
];

const planKeywords = [
  "plan",
  "planes",
  "propuesta",
  "propuestas",
  "plan de gobierno",
  "programa",
  "gobierno",
];

function cleanQuery(query: string): string {
  return query
    .split(/\s+/)
    .filter((w) => {
      const lower = w.toLowerCase();
      return (
        w.length > 2 &&
        !stopWords.has(lower) &&
        !candidateKeywords.includes(lower) &&
        !calendarKeywords.includes(lower) &&
        !planKeywords.includes(lower)
      );
    })
    .join(" ");
}

function analyzeQuery(query: string): QueryIntent {
  const lowerQuery = query.toLowerCase().trim();
  const searchTerms: string[] = [];

  // Detectar búsqueda de candidatos
  const needsCandidates = candidateKeywords.some((keyword) =>
    lowerQuery.includes(keyword)
  );

  // Detectar búsqueda de calendario
  const needsCalendar = calendarKeywords.some((keyword) =>
    lowerQuery.includes(keyword)
  );

  // Detectar búsqueda de planes
  const needsPlans = planKeywords.some((keyword) =>
    lowerQuery.includes(keyword)
  );

  // Extraer términos de búsqueda (palabras significativas)
  // Priorizar nombres propios (palabras con mayúsculas) y palabras significativas
  const words = query
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(
      (word) =>
        word.length > 2 &&
        !stopWords.has(word.toLowerCase()) &&
        !candidateKeywords.includes(word.toLowerCase()) &&
        !calendarKeywords.includes(word.toLowerCase()) &&
        !planKeywords.includes(word.toLowerCase())
    );

  // Si hay palabras con mayúsculas (probablemente nombres propios), priorizarlas
  // Esto detecta nombres como "KEIKO", "SOFIA", "FUJIMORI", etc.
  const properNouns = words.filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w));
  if (properNouns.length > 0) {
    // Usar los nombres propios en minúsculas para la búsqueda
    searchTerms.push(...properNouns.map((w) => w.toLowerCase()));
  } else {
    // Si no hay nombres propios, usar todas las palabras significativas
    searchTerms.push(...words.map((w) => w.toLowerCase()));
  }

  return {
    needsCandidates,
    needsCalendar,
    needsPlans,
    searchTerms,
  };
}

async function fetchContextData(intent: QueryIntent, query: string) {
  const contextParts: string[] = [];
  console.log("intent", intent);
  console.log("query", query);

  // Si no hay intención clara, intentar buscar candidatos por defecto si hay términos de búsqueda
  const shouldSearchCandidates =
    intent.needsCandidates ||
    (intent.searchTerms.length > 0 &&
      !intent.needsCalendar &&
      !intent.needsPlans);

  // Consultar candidatos si es necesario
  if (shouldSearchCandidates) {
    try {
      // Usar los términos de búsqueda o limpiar la query completa
      let searchTerm = intent.searchTerms.join(" ");
      console.log("searchTerm", searchTerm);
      // Si no hay términos extraídos pero la query tiene contenido, limpiar la query
      if (!searchTerm || searchTerm.trim().length === 0) {
        searchTerm = cleanQuery(query) || query;
      }

      // Si aún no hay término, usar la query original (puede ser un nombre completo)
      if (!searchTerm || searchTerm.trim().length === 0) {
        searchTerm = query.trim();
      }

      const candidates = await getCandidates({ search: searchTerm });

      if (candidates.data.length > 0) {
        const candidatesInfo = candidates.data
          .slice(0, 10) // Limitar a 10 para no saturar el contexto
          .map((c) => {
            const propuestas = Array.isArray(c.propuestas)
              ? c.propuestas.join(", ")
              : "";
            const actividades = Array.isArray(c.actividades)
              ? c.actividades.join(", ")
              : "";
            return `- ${c.nombre} (${c.partido}) - ${c.cargo}${
              c.region ? ` - ${c.region}` : ""
            }${propuestas ? ` - Propuestas: ${propuestas}` : ""}${
              actividades ? ` - Actividades: ${actividades}` : ""
            }`;
          })
          .join("\n");

        contextParts.push(
          `CANDIDATOS ENCONTRADOS (${candidates.data.length} resultados):\n${candidatesInfo}`
        );
      } else if (intent.needsCandidates || shouldSearchCandidates) {
        contextParts.push(
          "CANDIDATOS: No se encontraron candidatos que coincidan con la búsqueda."
        );
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      contextParts.push(
        "CANDIDATOS: Error al buscar candidatos en la base de datos."
      );
    }
  }

  // Consultar calendario si es necesario
  if (intent.needsCalendar) {
    const lowerQuery = query.toLowerCase();
    let events;

    // Detectar tipo específico de evento
    if (lowerQuery.includes("votación") || lowerQuery.includes("votacion")) {
      events = await getCalendarEventsByType("votacion");
    } else if (lowerQuery.includes("debate")) {
      events = await getCalendarEventsByType("debate");
    } else if (
      lowerQuery.includes("inscripción") ||
      lowerQuery.includes("inscripcion")
    ) {
      events = await getCalendarEventsByType("inscripcion");
    } else if (
      lowerQuery.includes("proclamación") ||
      lowerQuery.includes("proclamacion")
    ) {
      events = await getCalendarEventsByType("proclamacion");
    } else {
      events = await getAllCalendarEvents();
    }

    if (events.length > 0) {
      const eventsInfo = events
        .map(
          (e) =>
            `- ${e.fecha}: ${e.descripcion} (${e.tipo})${
              e.importante ? " [IMPORTANTE]" : ""
            }`
        )
        .join("\n");
      contextParts.push(`CALENDARIO ELECTORAL:\n${eventsInfo}`);
    } else {
      contextParts.push(
        "CALENDARIO: No hay eventos en el calendario electoral."
      );
    }
  }

  // Consultar planes si es necesario
  if (intent.needsPlans) {
    const plans = await getAllPlans();

    if (plans.length > 0) {
      const plansInfo = plans
        .slice(0, 10) // Limitar a 10
        .map(
          (p) =>
            `- ${p.partido}: ${
              p.resumen_ia
            } - Temas: ${p.temas_principales.join(", ")} - Fecha: ${
              p.fecha_publicacion
            }`
        )
        .join("\n");
      contextParts.push(`PLANES DE GOBIERNO:\n${plansInfo}`);
    } else {
      contextParts.push("PLANES: No hay planes de gobierno disponibles.");
    }
  }

  return contextParts.join("\n\n");
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY no está configurada",
          details: "Por favor configura la variable de entorno OPENAI_API_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuestion = lastMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ");

    if (!userQuestion || userQuestion.trim().length === 0) {
      return new Response("Empty question", { status: 400 });
    }

    // Analizar la pregunta y determinar qué consultas hacer
    const intent = analyzeQuery(userQuestion);

    // Consultar Supabase según la intención
    const contextData = await fetchContextData(intent, userQuestion);

    // Construir el prompt del sistema
    const navigationGuide = `
NAVEGACIÓN EN LA APLICACIÓN:
- Para ver candidatos: /candidatos
- Para ver calendario electoral: /calendario
- Para ver planes de gobierno: /planes
- Para buscar mesa de votación: usar el buscador de mesas
`;

    const systemPrompt = `Eres un asistente virtual especializado en información electoral de Perú 2026.

INSTRUCCIONES ESTRICTAS:
- SOLO responde con información contenida en el contexto proporcionado desde Supabase
- Si la información no está en el contexto, indica claramente: "No tengo esa información en la base de datos"
- NUNCA inventes datos sobre candidatos, fechas, partidos o propuestas
- Si no encuentras información, sugiere al usuario que visite las secciones correspondientes de la aplicación
- Mantén un tono neutral, objetivo y profesional
- Responde en español de forma clara y concisa
- Cuando menciones candidatos o eventos, incluye información específica del contexto

${
  contextData
    ? `CONTEXTO DISPONIBLE (datos reales de Supabase):\n${contextData}`
    : "No se encontró información relevante en la base de datos para esta consulta."
}

${navigationGuide}`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in /api/ask:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la consulta",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
