# Portfolio Neural Redesign - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform portfolio with neural network visual identity - real tech icons with official colors, interactive hero with neural orbit, minimal cards without glass effect.

**Architecture:**

- Phase 1 creates `TechIcon` components and `tech-icons.ts` data (SVG inline, official brand colors)
- Phase 2 creates `NeuralCanvas` and `FilterContext` for Hero + shared filter state
- Phase 3 replaces `GlassCard` with `MinimalCard`, updates sections
- Phase 4 polish animations and performance

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Custom SVG

---

## Phase 1: Foundation - Tech Icons with Real Brand Colors

### Task 1.1: Create tech-icons.ts data file

**Files:**

- Create: `src/data/tech-icons.ts`

**Purpose:** Store SVG path data and official brand colors for all technologies.

```typescript
// src/data/tech-icons.ts
export type SkillCategory = "ai" | "backend" | "frontend" | "devops";

export interface TechIconData {
  name: string;
  category: SkillCategory;
  colors: { primary: string; secondary?: string };
  svgPath: string; // Simplified path for inline SVG
}

export const techIcons: TechIconData[] = [
  {
    name: "Python",
    category: "ai",
    colors: { primary: "#3776AB", secondary: "#FFD43B" },
    svgPath: "...", // Python logo simplified
  },
  {
    name: "TensorFlow",
    category: "ai",
    colors: { primary: "#FF6F00", secondary: "#F57C00" },
    svgPath: "...",
  },
  // ... 14 more techs
];
```

### Task 1.2: Create TechIcon component

**Files:**

- Create: `src/components/TechIcon.tsx`

**Purpose:** Renders SVG icon with official colors, hover animation, tooltip.

```tsx
// src/components/TechIcon.tsx
interface TechIconProps {
  icon: TechIconData;
  size?: number;
  showTooltip?: boolean;
}
```

### Task 1.3: Create TechGrid component

**Files:**

- Create: `src/components/TechGrid.tsx`

**Purpose:** Grid layout for tech icons with stagger animation on scroll.

### Task 1.4: Update TechStack section

**Files:**

- Modify: `src/sections/TechStack.tsx`

**Purpose:** Replace text pills with TechGrid component.

---

## Phase 2: Hero Redesign - Neural Canvas

### Task 2.1: Create FilterContext

**Files:**

- Create: `src/components/FilterContext.tsx`

**Purpose:** React Context to share filter state between Hero nodes and Tech icons.

```tsx
// src/components/FilterContext.tsx
interface FilterContextType {
  filter: SkillCategory | null;
  setFilter: (category: SkillCategory | null) => void;
}
```

### Task 2.2: Create neural-network.ts data

**Files:**

- Create: `src/data/neural-network.ts`

**Purpose:** Node positions (20 nodes), connections, categories for Hero canvas.

### Task 2.3: Create NeuralNode component

**Files:**

- Create: `src/components/NeuralNode.tsx`

**Purpose:** Individual node for neural canvas - renders node circle, label, handles hover/click states, tooltip. Used by NeuralCanvas.

### Task 2.4: Create useNeuralAnimation hook

**Files:**

- Create: `src/hooks/useNeuralAnimation.ts`

**Purpose:** Animation logic for floating nodes - returns position offsets with spring animation, data flow dash offset. Handles prefers-reduced-motion.

### Task 2.5: Create NeuralCanvas component

**Files:**

- Create: `src/components/NeuralCanvas.tsx`

**Purpose:** SVG-based neural network - renders all NeuralNodes, connection lines with data flow animation, parallax on scroll. Composes NeuralNode + useNeuralAnimation.

### Task 2.6: Update Hero section

**Files:**

- Modify: `src/sections/Hero.tsx`

**Purpose:** Replace static shapes with NeuralCanvas + integrate filter context.

### Task 2.7: Add keyboard navigation

**Files:**

- Modify: `src/components/NeuralCanvas.tsx`, `src/components/TechIcon.tsx`

**Purpose:** Implement Tab navigation through nodes/icons, Enter/Space to activate, Escape to clear filter. Per spec accessibility requirements.

---

## Phase 3: Card Minimalization

### Task 3.1: Create MinimalCard component

**Files:**

- Create: `src/components/MinimalCard.tsx`

**Purpose:** Replace GlassCard - subtle border, no blur/transparency, hover elevation.

```tsx
// src/components/MinimalCard.tsx
interface MinimalCardProps {
  children: ReactNode;
  hoverable?: boolean;
  borderAccent?: "blue" | "purple" | "cyan" | "none";
}
```

### Task 3.2: Update Competencies section

**Files:**

- Modify: `src/sections/Competencies.tsx`

**Purpose:** Replace GlassCard with MinimalCard, remove glass effects.

### Task 3.3: Update Projects section

**Files:**

- Modify: `src/sections/Projects.tsx`

**Purpose:** Remove glass effect from project cards, keep carousel functionality.

### Task 3.4: Update Experience section

**Files:**

- Modify: `src/sections/Experience.tsx`

**Purpose:** Simplify timeline - subtle line, no bright node colors.

---

## Phase 4: Polish

### Task 4.1: Add prefers-reduced-motion support

**Files:**

- Modify: All animated components

**Purpose:** Disable heavy animations when user prefers reduced motion.

### Task 4.2: Performance optimization

**Files:**

- Modify: `src/components/NeuralCanvas.tsx`

**Purpose:** Ensure 60fps - will-change, GPU acceleration, reduce nodes on mobile.

### Task 4.3: Verify spec checklist

**Files:**

- Review: All modified files

**Purpose:** Verify all 14 spec checklist items are implemented:

| #   | Check                                      | Verification Method                        |
| --- | ------------------------------------------ | ------------------------------------------ |
| 1   | Python icon shows `#3776AB` + `#FFD43B`    | Visual inspection                          |
| 2   | TensorFlow icon shows oranges `#FF6F00`    | Visual inspection                          |
| 3   | OpenCV icon shows red/white                | Visual inspection                          |
| 4   | YOLO icon shows cyan/red                   | Visual inspection                          |
| 5   | LangChain icon shows dark blue             | Visual inspection                          |
| 6   | Neural network has max 20 nodes            | Count nodes in neural-network.ts           |
| 7   | Neural network is SVG (not Canvas)         | Code inspection in NeuralCanvas.tsx        |
| 8   | Hover on node shows tooltip                | Manual test in browser                     |
| 9   | Click on node filters Tech Stack           | Manual test in browser                     |
| 10  | Cards have no glass effect                 | Visual inspection of MinimalCard           |
| 11  | prefers-reduced-motion disables animations | Test with `prefers-reduced-motion: reduce` |
| 12  | Mobile: nodes static without lag           | Test on mobile device/emulator             |
| 13  | Lighthouse performance > 90                | Run Lighthouse audit                       |
| 14  | FilterContext shared state works           | Test node click + verify TechGrid filters  |

---

## Verification Commands

```bash
# Build and check for errors
vp build

# Type check
vp check

# Run tests (if any)
vp test

# Lighthouse (manual)
# Open Chrome DevTools -> Lighthouse -> Run audit
```

---

## Output Files Created

| Phase | Files Created                                                                                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `src/data/tech-icons.ts`, `src/components/TechIcon.tsx`, `src/components/TechGrid.tsx`                                                                                  |
| 2     | `src/components/FilterContext.tsx`, `src/data/neural-network.ts`, `src/components/NeuralNode.tsx`, `src/hooks/useNeuralAnimation.ts`, `src/components/NeuralCanvas.tsx` |
| 3     | `src/components/MinimalCard.tsx`                                                                                                                                        |
| 4     | Performance optimizations                                                                                                                                               |

## Modified Files

| Phase | Files Modified                                                                              |
| ----- | ------------------------------------------------------------------------------------------- |
| 1     | `src/sections/TechStack.tsx`                                                                |
| 2     | `src/sections/Hero.tsx`                                                                     |
| 3     | `src/sections/Competencies.tsx`, `src/sections/Projects.tsx`, `src/sections/Experience.tsx` |
| 4     | All animated components                                                                     |
