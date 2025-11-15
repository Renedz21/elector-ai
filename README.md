# ElectorAI

Plataforma de información electoral con IA para las elecciones generales de Perú 2026. Proporciona información sobre candidatos, planes de gobierno y calendario electoral mediante un buscador inteligente potenciado por IA.

## Características

- 🤖 **Buscador con IA**: Consulta información electoral en lenguaje natural
- 🗃️ **Calendario Electoral**: Fechas clave del proceso electoral 2026
- 👥 **Perfiles de Candidatos**: Información detallada de candidatos presidenciales y congresales
- 📝 **Planes de Gobierno**: Resúmenes generados con IA de propuestas políticas
- 🎨 **Diseño Minimalista**: Interfaz limpia y fácil de usar

## Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **IA**: OpenAI + Vercel AI SDK
- **Gestor de paquetes**: pnpm

## Requisitos Previos

- Node.js 22 o superior
- pnpm 10 o superior
- API Key de OpenAI

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd elector-ai
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y completa las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
OPENAI_API_KEY=tu_api_key_de_openai
```

### 4. Ejecutar el proyecto

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Genera el build de producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter (Biome)
- `pnpm format` - Formatea el código con Biome

## Estructura del Proyecto

```
elector-ai/
├── app/                    # Páginas y rutas de Next.js
│   ├── api/                # API routes
│   │   └── ask/            # Endpoint de búsqueda con IA
│   ├── candidatos/         # Páginas de candidatos
│   ├── calendario/         # Página de calendario electoral
│   ├── planes/             # Página de planes de gobierno
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/
│   ├── shared/             # Componentes reutilizables
│   └── ui/                 # Componentes de shadcn/ui
├── lib/
│   ├── dummy-data.ts       # Datos de ejemplo
│   ├── openai.ts           # Cliente de OpenAI
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilidades
└── public/                 # Archivos estáticos
```

## Funcionalidad Principal

### Buscador con IA

El buscador utiliza:
1. **Datos de ejemplo** para proporcionar contexto relevante
2. **Generación de respuestas con GPT-4o-mini** basado en contexto recuperado

### Datos Dummy

El proyecto incluye datos de ejemplo en `lib/dummy-data.ts`:
- 10 candidatos ficticios con propuestas
- 8 eventos del calendario electoral 2026
- 5 planes de gobierno con resúmenes

La aplicación utiliza estos datos de ejemplo para proporcionar información electoral.

## Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Otras Plataformas

Asegúrate de:
- Configurar las variables de entorno
- Usar Node.js 22+
- Ejecutar `pnpm build` para generar el build de producción

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.
