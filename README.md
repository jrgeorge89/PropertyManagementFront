# Property Management Frontend

Aplicación web desarrollada en Next.js para la visualización de propiedades inmobiliarias.

## Características

- 🏠 Visualización de propiedades con imágenes y detalles
- 🔍 Búsqueda y filtros avanzados
- 💰 Filtrado por rango de precios
- ♿ Totalmente accesible (WCAG 2.1)
- 📱 Diseño responsive
- ⚡ Alto rendimiento y optimización

## Tecnologías

- Next.js 14
- TypeScript
- React Query
- TailwindCSS
- Redux Toolkit

## Requisitos Previos

- Node.js 18 o superior
- npm 8 o superior

## Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Linting
npm run lint

# TypeScript Check
npm run type-check
```

## Estructura del Proyecto

```
src/
├── app/                   # Páginas y rutas (Next.js App Router)
├── application/          # Lógica de aplicación
│   ├── hooks/           # Custom hooks
│   └── services/        # Servicios de la aplicación
├── components/          # Componentes React
│   ├── filters/        # Componentes de filtrado
│   ├── property/       # Componentes de propiedades
│   └── ui/            # Componentes UI reutilizables
├── domain/             # Modelos y tipos
│   ├── models/        # Interfaces y tipos
│   └── types.ts       # Tipos compartidos
└── infrastructure/     # Implementaciones técnicas
    ├── api/           # Servicios de API
    └── store/         # Estado global (Redux)
```

## Características Principales

### Gestión de Propiedades
- Listado de propiedades con paginación infinita
- Visualización detallada de propiedades
- Galería de imágenes optimizada
- Información detallada del propietario

### Sistema de Filtros
- Búsqueda por nombre y dirección
- Filtrado por rango de precios
- Filtros combinados
- Debounce en búsquedas

### Optimización de Rendimiento
- Componentes memorizados
- Lazy loading de imágenes
- Debounce en búsquedas y filtros
- Cancelación de peticiones innecesarias

### Accesibilidad
- Soporte completo para lectores de pantalla
- Navegación por teclado
- Alto contraste
- Labels descriptivos
- Mensajes de estado y error accesibles
