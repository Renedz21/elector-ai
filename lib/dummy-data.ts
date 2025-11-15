import type {
  Candidate,
  CalendarEvent,
  Plan,
  VotingLocation,
  MesaLocation,
  MesaSchedule,
} from "./types";

export const candidates: Candidate[] = [
  {
    id: "1",
    nombre: "Juan Pérez García",
    partido: "Partido Democrático Nacional",
    region: "Lima",
    cargo: "Presidente",
    hoja_vida:
      "Economista con 20 años de experiencia en el sector público. Magíster en Políticas Públicas por la Universidad Nacional.",
    actividades: [
      "Ex Ministro de Economía (2018-2020)",
      "Consultor internacional en desarrollo económico",
      "Profesor universitario en economía aplicada",
    ],
    propuestas: [
      "Reforma tributaria progresiva",
      "Inversión en infraestructura rural",
      "Modernización del sistema de salud",
      "Fortalecimiento de la educación técnica",
    ],
  },
  {
    id: "2",
    nombre: "María López Sánchez",
    partido: "Frente por el Cambio",
    region: "Arequipa",
    cargo: "Presidente",
    hoja_vida:
      "Abogada especializada en derechos humanos. Doctora en Derecho Constitucional con experiencia en organismos internacionales.",
    actividades: [
      "Defensora del Pueblo Regional (2015-2019)",
      "Asesora en la Comisión Interamericana de DDHH",
      "Fundadora de ONG de transparencia",
    ],
    propuestas: [
      "Reforma del sistema de justicia",
      "Ley de transparencia y anticorrupción",
      "Protección de comunidades indígenas",
      "Igualdad de género en el sector público",
    ],
  },
  {
    id: "3",
    nombre: "Carlos Rodríguez Mendoza",
    partido: "Alianza Popular",
    region: "Cusco",
    cargo: "Presidente",
    hoja_vida:
      "Empresario agrícola y líder comunitario. Ingeniero agrónomo con experiencia en desarrollo sostenible.",
    actividades: [
      "Presidente de la Federación Agraria Regional",
      "Coordinador de proyectos de agricultura sostenible",
      "Gestor de cooperativas rurales",
    ],
    propuestas: [
      "Apoyo integral al agro peruano",
      "Tecnificación del campo",
      "Seguridad alimentaria nacional",
      "Protección del medio ambiente",
    ],
  },
  {
    id: "4",
    nombre: "Ana Torres Villalobos",
    partido: "Movimiento Ciudadano",
    region: "Piura",
    cargo: "Presidente",
    hoja_vida:
      "Médica cirujana con especialización en salud pública. Ha trabajado en zonas rurales y marginadas durante 15 años.",
    actividades: [
      "Directora de Hospital Regional (2016-2021)",
      "Coordinadora de programas de vacunación",
      "Activista en salud preventiva",
    ],
    propuestas: [
      "Salud universal y gratuita",
      "Prevención de enfermedades tropicales",
      "Fortalecimiento de hospitales regionales",
      "Salud mental como prioridad",
    ],
  },
  {
    id: "5",
    nombre: "Roberto Flores Castro",
    partido: "Partido del Progreso",
    region: "La Libertad",
    cargo: "Presidente",
    hoja_vida:
      "Ingeniero industrial con maestría en gestión pública. Experiencia en modernización del Estado.",
    actividades: [
      "Viceministro de Innovación Tecnológica",
      "Consultor en transformación digital",
      "Fundador de startup tecnológica",
    ],
    propuestas: [
      "Digitalización del Estado",
      "Impulso a la innovación y startups",
      "Conectividad en zonas rurales",
      "Educación digital desde primaria",
    ],
  },
  {
    id: "6",
    nombre: "Patricia Ramírez Luna",
    partido: "Unión Nacional",
    region: "Lambayeque",
    cargo: "Congresista",
    hoja_vida:
      "Contadora pública y auditora. Especialista en gestión fiscal y control gubernamental.",
    actividades: [
      "Auditora en la Contraloría General",
      "Consultora en gestión financiera",
      "Docente en finanzas públicas",
    ],
    propuestas: [
      "Austeridad en el gasto público",
      "Control estricto del presupuesto",
      "Reducción de burocracia estatal",
    ],
  },
  {
    id: "7",
    nombre: "Luis Vargas Herrera",
    partido: "Frente Amplio",
    region: "Junín",
    cargo: "Congresista",
    hoja_vida:
      "Sociólogo con doctorado en ciencias políticas. Investigador en desigualdad social.",
    actividades: [
      "Investigador principal en instituto de estudios sociales",
      "Asesor parlamentario en comisión de inclusión social",
      "Autor de libros sobre pobreza en el Perú",
    ],
    propuestas: [
      "Reducción de la desigualdad económica",
      "Programas sociales focalizados",
      "Reconocimiento de derechos laborales",
    ],
  },
  {
    id: "8",
    nombre: "Sandra Morales Díaz",
    partido: "Renovación Nacional",
    region: "Tacna",
    cargo: "Congresista",
    hoja_vida:
      "Periodista y comunicadora social. Especializada en investigación de corrupción.",
    actividades: [
      "Directora de medio de comunicación independiente",
      "Ganadora de premio de periodismo de investigación",
      "Activista por la libertad de prensa",
    ],
    propuestas: [
      "Ley de protección a periodistas",
      "Transparencia en medios públicos",
      "Acceso a información gubernamental",
    ],
  },
  {
    id: "9",
    nombre: "Miguel Ángel Cruz Rojas",
    partido: "Partido Verde",
    region: "Ucayali",
    cargo: "Congresista",
    hoja_vida:
      "Biólogo y ambientalista. Defensor de la Amazonía y los recursos naturales.",
    actividades: [
      "Director de ONG de conservación amazónica",
      "Coordinador de proyectos de reforestación",
      "Asesor técnico en políticas ambientales",
    ],
    propuestas: [
      "Protección legal de la Amazonía",
      "Combate a la deforestación ilegal",
      "Energías renovables",
    ],
  },
  {
    id: "10",
    nombre: "Elena Gutiérrez Paredes",
    partido: "Fuerza Ciudadana",
    region: "Ica",
    cargo: "Congresista",
    hoja_vida:
      "Profesora de educación secundaria. Activista por la mejora de la calidad educativa.",
    actividades: [
      "Secretaria General del Sindicato de Docentes",
      "Coordinadora de programas de capacitación docente",
      "Impulsora de reforma educativa regional",
    ],
    propuestas: [
      "Aumento del presupuesto educativo",
      "Mejor remuneración para docentes",
      "Infraestructura escolar de calidad",
    ],
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    fecha: "2026-01-15",
    descripcion:
      "Inicio del periodo de inscripción de candidatos presidenciales",
    tipo: "inscripcion",
    importante: true,
  },
  {
    id: "2",
    fecha: "2026-02-28",
    descripcion: "Cierre de inscripciones y presentación de planes de gobierno",
    tipo: "inscripcion",
    importante: true,
  },
  {
    id: "3",
    fecha: "2026-03-15",
    descripcion: "Primer debate presidencial nacional",
    tipo: "debate",
    importante: true,
  },
  {
    id: "4",
    fecha: "2026-03-25",
    descripcion: "Segundo debate presidencial - Temas económicos",
    tipo: "debate",
    importante: false,
  },
  {
    id: "5",
    fecha: "2026-04-11",
    descripcion: "Primera vuelta electoral",
    tipo: "votacion",
    importante: true,
  },
  {
    id: "6",
    fecha: "2026-06-05",
    descripcion: "Segunda vuelta electoral (si es necesaria)",
    tipo: "votacion",
    importante: true,
  },
  {
    id: "7",
    fecha: "2026-06-20",
    descripcion: "Proclamación oficial de resultados",
    tipo: "proclamacion",
    importante: true,
  },
  {
    id: "8",
    fecha: "2026-07-28",
    descripcion: "Asunción del nuevo gobierno",
    tipo: "otro",
    importante: true,
  },
];

export const plans: Plan[] = [
  {
    id: "1",
    partido: "Partido Democrático Nacional",
    resumen_ia:
      "El plan se enfoca en la reactivación económica mediante una reforma tributaria progresiva y la inversión pública en infraestructura. Propone modernizar el sistema de salud con hospitales regionales y fortalecer la educación técnica para reducir la brecha laboral. Incluye medidas de descentralización fiscal y apoyo a la pequeña y mediana empresa.",
    temas_principales: [
      "Economía y empleo",
      "Salud pública",
      "Educación técnica",
      "Descentralización",
    ],
    fecha_publicacion: "2026-02-20",
  },
  {
    id: "2",
    partido: "Frente por el Cambio",
    resumen_ia:
      "El plan prioriza la reforma del sistema de justicia con mecanismos de transparencia y anticorrupción. Plantea la protección de derechos humanos y comunidades indígenas mediante leyes específicas. Propone paridad de género en cargos públicos y una reforma constitucional para fortalecer el Estado de derecho.",
    temas_principales: [
      "Justicia y anticorrupción",
      "Derechos humanos",
      "Igualdad de género",
      "Reforma constitucional",
    ],
    fecha_publicacion: "2026-02-18",
  },
  {
    id: "3",
    partido: "Alianza Popular",
    resumen_ia:
      "Centrado en el desarrollo agrícola sostenible y la seguridad alimentaria. Propone tecnificación del campo, créditos blandos para agricultores y protección de ecosistemas naturales. Incluye programas de reforestación y gestión responsable del agua en zonas rurales.",
    temas_principales: [
      "Agricultura sostenible",
      "Seguridad alimentaria",
      "Medio ambiente",
      "Desarrollo rural",
    ],
    fecha_publicacion: "2026-02-22",
  },
  {
    id: "4",
    partido: "Movimiento Ciudadano",
    resumen_ia:
      "El plan garantiza salud universal y gratuita con énfasis en prevención de enfermedades. Propone fortalecimiento de hospitales regionales, brigadas médicas itinerantes y atención prioritaria en salud mental. Incluye programas de vacunación masiva y control de enfermedades tropicales.",
    temas_principales: [
      "Salud universal",
      "Prevención de enfermedades",
      "Salud mental",
      "Hospitales regionales",
    ],
    fecha_publicacion: "2026-02-25",
  },
  {
    id: "5",
    partido: "Partido del Progreso",
    resumen_ia:
      "Enfocado en la transformación digital del Estado y la conectividad nacional. Propone digitalización de trámites, gobierno electrónico y acceso a internet en zonas rurales. Incluye incentivos para startups, educación digital desde la primaria y creación de hubs tecnológicos regionales.",
    temas_principales: [
      "Transformación digital",
      "Innovación tecnológica",
      "Conectividad",
      "Educación digital",
    ],
    fecha_publicacion: "2026-02-27",
  },
];

export const sampleEmbeddings = [
  {
    content:
      "Las elecciones generales de 2026 se realizarán el 11 de abril en primera vuelta. Los candidatos deben inscribirse entre enero y febrero.",
    category: "calendario",
  },
  {
    content:
      "Juan Pérez García es economista y propone una reforma tributaria progresiva como parte de su plan de gobierno.",
    category: "candidatos",
  },
  {
    content:
      "María López Sánchez es abogada especializada en derechos humanos y plantea una reforma del sistema de justicia.",
    category: "candidatos",
  },
  {
    content:
      "El debate presidencial sobre temas económicos se realizará el 25 de marzo de 2026.",
    category: "calendario",
  },
  {
    content:
      "Los planes de gobierno deben ser presentados antes del cierre de inscripciones el 28 de febrero.",
    category: "proceso",
  },
];

export const dummyVotingLocations: VotingLocation[] = [
  {
    id: "1",
    name: "Colegio Nacional San José",
    address: "Av. Brasil 1234, Magdalena del Mar",
    latitude: -12.0969,
    longitude: -77.0800,
    district: "Magdalena del Mar",
  },
  {
    id: "2",
    name: "Instituto Educativo Los Olivos",
    address: "Jr. Los Olivos 567, Los Olivos",
    latitude: -11.9833,
    longitude: -77.0667,
    district: "Los Olivos",
  },
  {
    id: "3",
    name: "Escuela Primaria San Martín",
    address: "Av. San Martín 890, San Martín de Porres",
    latitude: -11.9667,
    longitude: -77.0833,
    district: "San Martín de Porres",
  },
  {
    id: "4",
    name: "Colegio Secundario La Victoria",
    address: "Av. La Victoria 234, La Victoria",
    latitude: -12.0667,
    longitude: -77.0167,
    district: "La Victoria",
  },
  {
    id: "5",
    name: "Centro Educativo Miraflores",
    address: "Av. Larco 1456, Miraflores",
    latitude: -12.1167,
    longitude: -77.0333,
    district: "Miraflores",
  },
  {
    id: "6",
    name: "Instituto San Isidro",
    address: "Jr. Las Begonias 789, San Isidro",
    latitude: -12.1000,
    longitude: -77.0333,
    district: "San Isidro",
  },
  {
    id: "7",
    name: "Colegio Nacional Surco",
    address: "Av. Benavides 321, Santiago de Surco",
    latitude: -12.1333,
    longitude: -76.9833,
    district: "Santiago de Surco",
  },
  {
    id: "8",
    name: "Escuela Primaria Chorrillos",
    address: "Av. Defensores del Morro 654, Chorrillos",
    latitude: -12.1667,
    longitude: -77.0167,
    district: "Chorrillos",
  },
];

export const dummyMesaLocations: MesaLocation[] = [
  {
    id: "1",
    mesa_number: "1234",
    local_id: "1",
    pavilion: "A",
    floor: "1",
    room: "101",
    voting_location: dummyVotingLocations[0],
  },
  {
    id: "2",
    mesa_number: "1235",
    local_id: "1",
    pavilion: "A",
    floor: "1",
    room: "102",
    voting_location: dummyVotingLocations[0],
  },
  {
    id: "3",
    mesa_number: "1236",
    local_id: "1",
    pavilion: "B",
    floor: "1",
    room: "201",
    voting_location: dummyVotingLocations[0],
  },
  {
    id: "4",
    mesa_number: "2345",
    local_id: "2",
    pavilion: "Principal",
    floor: "1",
    room: "15",
    voting_location: dummyVotingLocations[1],
  },
  {
    id: "5",
    mesa_number: "2346",
    local_id: "2",
    pavilion: "Principal",
    floor: "2",
    room: "25",
    voting_location: dummyVotingLocations[1],
  },
  {
    id: "6",
    mesa_number: "3456",
    local_id: "3",
    pavilion: "Norte",
    floor: "1",
    room: "5",
    voting_location: dummyVotingLocations[2],
  },
  {
    id: "7",
    mesa_number: "3457",
    local_id: "3",
    pavilion: "Sur",
    floor: "1",
    room: "6",
    voting_location: dummyVotingLocations[2],
  },
  {
    id: "8",
    mesa_number: "4567",
    local_id: "4",
    pavilion: "A",
    floor: "1",
    room: "10",
    voting_location: dummyVotingLocations[3],
  },
  {
    id: "9",
    mesa_number: "4568",
    local_id: "4",
    pavilion: "B",
    floor: "2",
    room: "20",
    voting_location: dummyVotingLocations[3],
  },
  {
    id: "10",
    mesa_number: "5678",
    local_id: "5",
    pavilion: "Principal",
    floor: "1",
    room: "1",
    voting_location: dummyVotingLocations[4],
  },
];

export const dummyMesaSchedule: MesaSchedule[] = [
  {
    id: "1",
    phase: "instalacion",
    start: "2026-04-10T06:00:00-05:00",
    end: "2026-04-10T07:00:00-05:00",
    description:
      "Instalación de la mesa electoral. Verificación de materiales y preparación del espacio de votación.",
  },
  {
    id: "2",
    phase: "sufragio",
    start: "2026-04-10T07:00:00-05:00",
    end: "2026-04-10T16:00:00-05:00",
    description:
      "Proceso de sufragio. Supervisión del proceso de votación, verificación de identidad de electores y entrega de cédulas.",
  },
  {
    id: "3",
    phase: "conteo",
    start: "2026-04-10T16:00:00-05:00",
    end: "2026-04-10T20:00:00-05:00",
    description:
      "Escrutinio de votos. Conteo de votos, llenado de actas y entrega de resultados a las autoridades competentes.",
  },
];
