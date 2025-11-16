# ElectorAI

Plataforma de información electoral con inteligencia artificial para las elecciones generales de Perú 2026. Proporciona información sobre candidatos, planes de gobierno, calendario electoral y asistencia para miembros de mesa mediante un buscador inteligente potenciado por IA.

## 📋 Descripción del Proyecto

ElectorAI es una aplicación web desarrollada con Next.js que permite a los ciudadanos peruanos acceder a información electoral de manera inteligente y accesible. La plataforma incluye:

- **Buscador con IA**: Consulta información electoral en lenguaje natural
- **Perfiles de Candidatos**: Información detallada de candidatos presidenciales y congresales
- **Calendario Electoral**: Fechas clave del proceso electoral 2026
- **Planes de Gobierno**: Resúmenes generados con IA de propuestas políticas
- **Asistente para Miembros de Mesa**: Instrucciones y guías para el proceso electoral
- **Buscador de Mesas de Votación**: Localización de mesas electorales

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **UI**: React 19
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui (Radix UI)
- **IA**: OpenAI + Vercel AI SDK
- **Base de Datos**: Supabase (opcional, funciona con datos dummy)
- **Linter/Formatter**: Biome
- **Gestor de paquetes**: pnpm

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 22 o superior ([Descargar Node.js](https://nodejs.org/))
- **pnpm** 10 o superior ([Instalar pnpm](https://pnpm.io/installation))
- **Git** ([Descargar Git](https://git-scm.com/))
- **API Key de OpenAI** (opcional para desarrollo, requerida para producción)

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version  # Debe ser v22 o superior

# Verificar pnpm
pnpm --version  # Debe ser v10 o superior

# Verificar Git
git --version
```

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd elector-ai
```

### Paso 2: Instalar Dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias necesarias del proyecto. Puede tardar unos minutos la primera vez.

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto (mismo nivel que `package.json`):

**Windows (PowerShell):**
```powershell
New-Item -Path ".env.local" -ItemType File
notepad .env.local
```

**Windows (CMD):**
```cmd
type nul > .env.local
notepad .env.local
```

**Mac/Linux:**
```bash
touch .env.local
nano .env.local
```

Agrega las siguientes variables de entorno:

```env
# OpenAI API Key (REQUERIDA para el buscador con IA)
# Obtén tu clave en: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-tu-clave-aqui

# Supabase (OPCIONAL - el proyecto funciona con datos dummy sin esto)
# NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-clave-publica
```

**⚠️ Importante:**
- El archivo `.env.local` ya está en `.gitignore`, no se subirá al repositorio
- Sin `OPENAI_API_KEY`, el buscador con IA no funcionará, pero el resto de la aplicación sí
- Las variables de Supabase son opcionales; el proyecto funciona con datos de ejemplo

### Paso 4: Ejecutar el Proyecto

```bash
pnpm dev
```

El servidor de desarrollo se iniciará en [http://localhost:3000](http://localhost:3000)

Abre tu navegador y navega a esa dirección para ver la aplicación.

## 📜 Scripts Disponibles

El proyecto incluye los siguientes scripts en `package.json`:

```bash
# Desarrollo - Inicia el servidor de desarrollo en http://localhost:3000
pnpm dev

# Build - Genera el build optimizado para producción
pnpm build

# Producción - Inicia el servidor de producción (después de build)
pnpm start

# Linter - Verifica el código con Biome
pnpm lint

# Formatear - Formatea el código automáticamente con Biome
pnpm format
```

## 📁 Estructura del Proyecto

```
elector-ai/
├── app/                          # Páginas y rutas de Next.js (App Router)
│   ├── api/                      # API Routes
│   │   ├── ask/                  # Endpoint de búsqueda con IA
│   │   ├── mesa-assistant/       # Asistente para miembros de mesa
│   │   └── locales/              # API de ubicaciones
│   ├── candidatos/               # Sección de candidatos
│   │   ├── [id]/                 # Página de perfil de candidato
│   │   └── page.tsx              # Lista de candidatos
│   ├── calendario/               # Calendario electoral
│   ├── planes/                   # Planes de gobierno
│   ├── miembros-de-mesa/         # Sección para miembros de mesa
│   ├── electores/                # Sección para electores
│   ├── layout.tsx                # Layout principal con navegación
│   ├── page.tsx                  # Página de inicio
│   └── globals.css               # Estilos globales
├── components/
│   ├── shared/                   # Componentes reutilizables
│   │   ├── ai-search-section.tsx # Buscador con IA
│   │   ├── candidate-card.tsx    # Tarjeta de candidato
│   │   ├── calendar-event-card.tsx
│   │   └── ...                   # Otros componentes compartidos
│   └── ui/                       # Componentes de shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       └── ...                   # Componentes base de UI
├── lib/
│   ├── services/                 # Servicios de datos
│   ├── hooks/                    # Custom React hooks
│   ├── dummy-data.ts             # Datos de ejemplo
│   ├── openai.ts                 # Cliente de OpenAI
│   ├── types.ts                  # Tipos TypeScript
│   └── utils.ts                  # Utilidades
├── utils/
│   └── supabase/                 # Configuración de Supabase
├── instructions/                 # Instrucciones en JSON
│   ├── ballot.json
│   ├── legal.json
│   └── mesa/
├── public/                       # Archivos estáticos
├── .env.local                    # Variables de entorno (crear)
├── next.config.ts                # Configuración de Next.js
├── package.json                  # Dependencias y scripts
└── tsconfig.json                 # Configuración de TypeScript
```

## 🎯 Funcionalidades Principales

### 1. Buscador con IA
- Búsqueda en lenguaje natural sobre información electoral
- Streaming de respuestas en tiempo real
- Contexto basado en datos de candidatos, calendario y planes

### 2. Sección de Candidatos
- Lista de candidatos con información básica
- Páginas de perfil detalladas
- Filtrado por cargo y región (preparado para expansión)

### 3. Calendario Electoral
- Eventos clave del proceso electoral 2026
- Marcadores visuales para eventos importantes
- Ordenamiento cronológico

### 4. Planes de Gobierno
- Resúmenes de propuestas políticas
- Temas principales destacados
- Información estructurada y legible

### 5. Asistente para Miembros de Mesa
- Instrucciones para instalación de mesa
- Guías de sufragio y conteo
- Información legal relevante

## 🔧 Configuración Adicional

### Cambiar el Puerto

Si el puerto 3000 está en uso:

```bash
pnpm dev -- -p 3001
```

### Variables de Entorno de Supabase (Opcional)

Si deseas conectar el proyecto a Supabase:

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Obtén tu URL y clave pública
3. Agrega las variables a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-clave-publica
```

**Nota:** El proyecto funciona perfectamente sin Supabase usando datos dummy.

## 🐛 Solución de Problemas

### Error: "OPENAI_API_KEY no está configurada"

**Problema:** La API key de OpenAI no está configurada o no se está leyendo correctamente.

**Soluciones:**
1. Verifica que el archivo se llame exactamente `.env.local` (con el punto al inicio)
2. Asegúrate de que está en la raíz del proyecto (mismo nivel que `package.json`)
3. Reinicia el servidor de desarrollo después de crear/modificar el archivo
4. Verifica que no haya espacios antes o después del signo `=` en el archivo

### Error: "Cannot find module" o errores de dependencias

**Problema:** Las dependencias no están instaladas correctamente.

**Solución:**
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
pnpm install
```

**Windows:**
```powershell
Remove-Item -Recurse -Force node_modules
pnpm install
```

### Error: Puerto 3000 en uso

**Problema:** Otro proceso está usando el puerto 3000.

**Soluciones:**
1. Usa otro puerto: `pnpm dev -- -p 3001`
2. O cierra el proceso que está usando el puerto 3000

### Error: "Invalid API key" de OpenAI

**Problema:** La clave API es incorrecta o ha expirado.

**Soluciones:**
1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Crea una nueva clave
3. Reemplaza la clave antigua en `.env.local`
4. Reinicia el servidor de desarrollo

### Error: Build falla

**Problema:** Errores de TypeScript o de compilación.

**Soluciones:**
```bash
# Verifica errores de TypeScript
pnpm build

# Si hay errores de formato
pnpm format

# Si hay errores de linting
pnpm lint
```

### El buscador con IA no muestra respuestas

**Problema:** El streaming no funciona o no aparece texto.

**Soluciones:**
1. Abre las DevTools del navegador (F12)
2. Revisa la pestaña Console para errores
3. Revisa la pestaña Network y busca la petición a `/api/ask`
4. Verifica que `OPENAI_API_KEY` esté configurada correctamente
5. Verifica que tu cuenta de OpenAI tenga créditos disponibles

## 📚 Recursos Adicionales

- [Documentación de Next.js 16](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno en el dashboard de Vercel:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (si usas Supabase)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (si usas Supabase)
3. Vercel detectará automáticamente Next.js y desplegará

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Otras Plataformas

Asegúrate de:
- Configurar todas las variables de entorno necesarias
- Usar Node.js 22 o superior
- Ejecutar `pnpm build` antes del despliegue
- Configurar el comando de inicio: `pnpm start`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Ejecuta `pnpm lint` y `pnpm format` antes de hacer commit
- Asegúrate de que el build pase: `pnpm build`
- Escribe código claro y bien documentado

## 📄 Licencia

MIT

## 👥 Equipo

Proyecto desarrollado para Hackathon - ElectorAI Perú 2026

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de desarrollo.
