# Portfolio Redesign - Design Spec

**Date:** 2026-03-21
**Status:** In Review (v2 - fixed blockers from spec review)
**Author:** Claude (via brainstorming with fsanchez)

---

## 1. Concept & Vision

Portfolio que comunica expertise en AI/ML a través de una identidad visual de **Neural Network**. El diseño debe sentirse como "observer el pensamiento de una IA" - nodos conectados, pulsos de datos, redes que aprenden y evolucionan. Profesional pero memorable, técnico pero artístico.

**Personalidad:** Innovador, preciso, expert in AI, forward-thinking.

---

## 2. Design Language

### Aesthetic Direction

**"Neural Elegance"** - Fusión entre visualización científica de neural networks y diseño editorial minimalista. Piensa: papers de investigación de DeepMind mezclados con Apple developer documentation.

### Color Palette

| Role           | Hex       | Usage                         |
| -------------- | --------- | ----------------------------- |
| Background     | `#f8fafc` | Base (light)                  |
| Background Alt | `#ffffff` | Cards, elevated surfaces      |
| Text Primary   | `#0f172a` | Headlines, important text     |
| Text Secondary | `#64748b` | Body, descriptions            |
| Accent Blue    | `#3b82f6` | Links, highlights             |
| Accent Purple  | `#7c3aed` | Primary actions, emphasis     |
| Accent Cyan    | `#06b6d4` | Secondary accents             |
| Neural Blue    | `#60a5fa` | Node connections (light mode) |
| Neural Purple  | `#a78bfa` | Secondary neural elements     |

### Typography

- **Headlines:** Inter, 700 weight, tracking tight
- **Body:** Inter, 400 weight, 1.6 line-height
- **Mono/Tech:** JetBrains Mono (skills, code, tech labels)

### Spatial System

- Base unit: 8px
- Section padding: 96px vertical
- Card padding: 24px
- Gap between cards: 24px
- Max content width: 1200px

### Motion Philosophy

**"Living Network"** - Animaciones que sugieren actividad neural:

- **Node Pulse:** Nodos "respiran" con scale sutil (1.0 → 1.05 → 1.0)
- **Data Flow:** Líneas de conexión con dash animation fluyendo entre nodos
- **Reveal on Hover:** Elementos aparecen como "activándose"
- **Staggered Entrance:** Contenido entra en cascada, 80ms delay entre items
- **Spring Physics:** Todas las transiciones usan ease-out con slight overshoot

### Visual Assets

#### Tech Stack Icons (SVG with official colors)

| Technology | Icon Colors           | Source            |
| ---------- | --------------------- | ----------------- |
| Python     | `#3776AB` + `#FFD43B` | Official logo     |
| OpenCV     | `#white` + `#red`     | Official logo     |
| YOLO       | `#00FFFF` + `#FF6B6B` | Custom simplified |
| TensorFlow | `#FF6F00` + `#F57C00` | Official logo     |
| LangChain  | `#000000` + `#75C4FF` | Official logo     |
| LlamaIndex | `#4A90A4` + `#1DBF73` | Official logo     |
| Claude API | `#CC785C` + `#FFD0B5` | Anthropic brand   |
| OpenAI API | `#19C37D` + `#000000` | OpenAI brand      |
| FastAPI    | `#009688`             | Official          |
| NestJS     | `#E0234E`             | Official          |
| React      | `#61DAFB`             | Official          |
| Next.js    | `#000000`             | Official          |
| Docker     | `#2496ED`             | Official          |
| AWS        | `#FF9900`             | Official          |
| PostgreSQL | `#336791`             | Official          |
| TypeScript | `#3178C6`             | Official          |

#### Neural Network Background (Hero)

- **SVG-based** (NOT Canvas - better integration with Framer Motion)
- 20 nodos máximo (reducido de 30 por performance)
- Nodos conectados por líneas SVG (max 3 conexiones por nodo)
- Líneas tienen gradient de color y dash animation
- Hover en nodo activa conexiones relacionadas
- Click en nodo filtra/mostrar skills de esa categoría
- **Fallback:** Si `neural-network.ts` falla, mostrar gradient background estático
- **Performance target:** Mantener 60fps en mid-range devices

---

## 3. Layout & Structure

### Page Flow

```
┌─────────────────────────────────────────────┐
│  HERO (Neural Orbit - 100vh)                │
│  - Name + Title con nodos orbitando         │
│  - CTA buttons                              │
│  - Scroll indicator                          │
├─────────────────────────────────────────────┤
│  COMPETENCIES (3 columnas minimal)          │
│  - Sin GlassCard, bordes sutiles            │
│  - Icon + Título + Descripción              │
├─────────────────────────────────────────────┤
│  TECH STACK (Grid de iconos)                │
│  - 8 iconos principales con hover reveal    │
│  - Categorías colapsables                   │
├─────────────────────────────────────────────┤
│  PROJECTS (Cards minimal, carousel)          │
│  - Cards limpias sin glass effect           │
│  - Problem/Solution/Impact limpio           │
├─────────────────────────────────────────────┤
│  EXPERIENCE (Timeline simplificado)         │
│  - Línea vertical sutil                     │
│  - Sin nodos de colores brillantes          │
├─────────────────────────────────────────────┤
│  TERMINAL (mantener existente)              │
│  - Ya está bueno, solo refinar              │
├─────────────────────────────────────────────┤
│  CONTACT (Footer elegante)                   │
│  - Links sociales minimal                   │
└─────────────────────────────────────────────┘
```

### Responsive Strategy

- **Desktop (>1024px):** Layout completo con neural orbit 3D
- **Tablet (768-1024px):** Grid 2 columnas, orbit simplificado
- **Mobile (<768px):** Stack vertical, nodos estáticos (sin animation pesada)

---

## 4. Features & Interactions

### Hero - Neural Orbit

| Action                | Result                                                                      |
| --------------------- | --------------------------------------------------------------------------- |
| Page load             | Nodos aparecen uno por uno (staggered), líneas se dibujan                   |
| Idle (no interaction) | Nodos flotan suavemente, data flow continua en líneas                       |
| Hover node            | Node escala 1.2x, conecta nodos relacionados brillan, tooltip muestra skill |
| Click node            | Filtra Tech Stack para mostrar solo esa categoría                           |
| Scroll                | Parallax sutil en nodos (0.5x scroll speed)                                 |

### Tech Stack Grid

| Action          | Result                                                        |
| --------------- | ------------------------------------------------------------- |
| Page load       | Iconos aparecen con stagger (50ms delay cada uno)             |
| Hover icon      | Icon escala 1.1x, sombra aparece, tooltip con nombre completo |
| Hover con Shift | Muestra categoría y skills relacionados                       |
| Click icon      | Scroll suave a sección de Projects filtrado por ese tech      |

### Competencies Cards

| Action           | Result                                                 |
| ---------------- | ------------------------------------------------------ |
| Default          | Borde sutil `#e2e8f0`, fondo blanco                    |
| Hover            | Borde cambia a gradient azul-purple, sombra eleva card |
| Scroll into view | Fade in + slide up (como ahora pero más sutil)         |

### Projects Carousel

| Action     | Result                                       |
| ---------- | -------------------------------------------- |
| Default    | Cards con borde sutil, sin glass effect      |
| Hover      | Elevación sutil, borde accent color          |
| Navigation | Flechas + dots (como ahora pero más minimal) |

### Terminal Section

- Mantener el estilo actual que ya funciona bien
- Opcional: añadir efecto de "neural pulse" en el cursor parpadeante

---

## 5. Component Inventory

### Shared Types

```typescript
type SkillCategory = "ai" | "backend" | "frontend" | "devops";
```

### NeuralNode

```typescript
interface NeuralNode {
  id: string;
  label: string; // "AI", "Backend", "Frontend", "DevOps"
  category: SkillCategory;
  position: { x: number; y: number }; // percentage-based
  connections: string[]; // IDs of connected nodes
  icon?: string; // Optional icon SVG
}
```

**States:** default (pulse animation), hover (scale + glow), active (brighter), filtered-out (dimmed)
**In-view Trigger:** Intersection Observer with rootMargin "-50px", triggers when 20% visible

### TechIcon

```typescript
interface TechIcon {
  name: string;
  svgPath: string; // Inline SVG path data
  colors: { primary: string; secondary?: string }; // Official brand colors (secondary optional)
  category: SkillCategory;
  description?: string; // Optional hover description
}
```

**States:** default, hover (scale + shadow), active (filter applied)

**Filter State:** Tech Stack Grid and Hero Neural Network share filtering state via React Context. Clicking a node in Hero OR an icon in Tech Stack sets the same global filter. Filter values: `null` (all visible), `SkillCategory` (filtered by category).

**Keyboard Navigation:** Tab to traverse icons/nodes. Enter/Space to activate (set filter or scroll). Escape to clear filter.

### MinimalCard

```typescript
interface MinimalCard {
  children: ReactNode;
  hoverable?: boolean; // If true, adds hover elevation
  borderAccent?: "blue" | "purple" | "cyan" | "none";
}
```

**States:** default (subtle border), hover (elevated + accent border)

### TimelineItem

```typescript
interface TimelineItem {
  period: string;
  role: { es: string; en: string };
  company: string;
  description: { es: string; en: string };
  tags: string[];
}
```

**States:** default (subtle dot), in-view (dot accent color)

---

## 6. Technical Approach

### Framework & Libraries

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion 12
- **Icons:** Custom SVG inline (no library, control total over colors)
- **3D Effects:** CSS transforms + Framer Motion (no Three.js para performance)

### Architecture

```
src/
├── components/
│   ├── NeuralCanvas.tsx      # SVG-based neural network (NOT Canvas)
│   ├── NeuralNode.tsx         # Individual node component
│   ├── TechIcon.tsx           # SVG tech icon component
│   ├── TechGrid.tsx           # Grid layout for tech icons
│   ├── MinimalCard.tsx        # Replaces GlassCard
│   ├── Section.tsx            # Section wrapper (existing)
│   └── FilterContext.tsx      # React Context for shared filter state
├── sections/
│   ├── Hero.tsx               # Neural orbit hero
│   ├── TechStack.tsx          # Grid of icons
│   ├── Competencies.tsx       # Minimal cards
│   ├── Projects.tsx           # Cleaner cards
│   ├── Experience.tsx         # Simplified timeline
│   ├── Awards.tsx             # (existing - no changes)
│   ├── Terminal.tsx           # (existing - refine cursor pulse only)
│   └── Contact.tsx            # (existing - minimal styling only)
├── data/
│   ├── tech-icons.ts          # SVG paths + colors for each tech
│   └── neural-network.ts      # Node positions + connections (20 nodes max)
├── hooks/
│   ├── useNeuralAnimation.ts   # Animation logic for nodes
│   └── useFilter.ts           # Filter state management
└── styles/
    └── neural.css              # Neural animation keyframes
```

**Note:** Terminal.tsx and Contact.tsx use existing implementations. Only cosmetic refinements (cursor pulse, spacing) - no structural changes.

### Performance Considerations

- NeuralCanvas usa `will-change: transform` y `transform: translateZ(0)` para GPU acceleration
- Nodos máximo 30 para evitar lag
- Iconos SVG inline (no external requests)
- Lazy load sections debajo del fold
- Intersection Observer para detener animaciones cuando no están visibles

### Accessibility

- `prefers-reduced-motion`: Desactiva animaciones pesadas, mantiene fades simples
- Nodos tienen `aria-label` descriptivo
- Focus states visibles para navegación keyboard
- Contraste WCAG AA en todos los textos

---

## 7. Implementation Phases

### Phase 1: Foundation

- Crear `TechIcon` component con SVG inline
- Crear `tech-icons.ts` data con todos los SVG paths
- Reemplazar texto en TechStack con iconos reales

### Phase 2: Hero Redesign

- Crear `NeuralCanvas` component
- Implementar node positions y connections
- Añadir hover/click interactions
- Optimizar para mobile (static fallback)

### Phase 3: Card Minimalization

- Crear `MinimalCard` component
- Reemplazar `GlassCard` en Competencies y Projects
- Ajustar espaciado y tipografía

### Phase 4: Polish

- Refinar animaciones con Framer Motion
- Verificar responsive
- Performance audit
- Cross-browser testing

---

## 8. Verification Checklist

- [ ] Python icon muestra azul `#3776AB` y amarillo `#FFD43B`
- [ ] TensorFlow icon muestra naranjas `#FF6F00`
- [ ] OpenCV icon muestra rojo/blanco
- [ ] YOLO icon muestra cyan/red
- [ ] LangChain icon muestra azul oscuro
- [ ] Neural network tiene máximo 20 nodos (no 30)
- [ ] Neural network es SVG (no Canvas)
- [ ] Hover en nodo muestra tooltip con skill
- [ ] Click en nodo filtra Tech Stack (comparte estado con TechIcon click)
- [ ] Cards no tienen glass effect (blur/transparency)
- [ ] `prefers-reduced-motion` desactiva animaciones pesadas
- [ ] Mobile: nodos estáticos sin lag
- [ ] Lighthouse performance > 90
- [ ] FilterContext provee estado compartido entre Hero y TechStack
- [ ] Keyboard navigation: Tab + Enter/Escape funciona en nodos e iconos
