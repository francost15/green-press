# GEO Audit Report: Franco Sanchez

**Audit Date:** 14 de octubre de 2026
**URL:** https://www.fsanchezt.com/
**Business Type:** Agency/Services (portafolio personal de ingeniería de IA, orientado a venta de proyectos)
**Pages Analyzed:** 14 rutas prerenderizadas (inicio, 5 proyectos × 2 idiomas, privacidad × 2, sitemap, llms.txt). Pasadas hechas sobre el código fuente, no con cinco subagentes externos.

---

## Executive Summary

**Overall GEO Score: 65/100 (Fair)**

El sitio ya está hecho para que una IA pueda citarlo: HTML estático, páginas de proyecto con problema, solución, arquitectura, medición y una pregunta frecuente, más `llms.txt` y schema de persona. Lo que lo baja es la portada: el titular rota verbos, la experiencia laboral ya no se ve, y el canonical de `/` apuntaba a `/es/` mientras el hreflang en inglés reclamaba la misma URL. Eso es el error de Search Console.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 48/100 | 20% | 9.6 |
| Content E-E-A-T | 68/100 | 20% | 13.6 |
| Technical GEO | 74/100 | 15% | 11.1 |
| Schema & Structured Data | 70/100 | 10% | 7.0 |
| Platform Optimization | 42/100 | 10% | 4.2 |
| **Overall GEO Score** | | | **64/100** |

---

## Critical Issues (Fix Immediately)

Ninguno de caída total (el sitio sí se indexa y no bloquea crawlers). El defecto que ya duele en producción es de canonical, tratado como alto.

## High Priority Issues

1. **Canonical de la portada inválido.** `src/pages/index.astro` sirve español en `/`, pero `localePath("es")` devolvía `/es/`. El documento en `https://www.fsanchezt.com/` declaraba canonical hacia `/es/` y `hreflang="en"` hacia `/`. Google lo lee como “el canonical apunta a otra ubicación hreflang”. Corregido en el árbol local: la home española canoniza a `/`, no declara inglés en esa URL, y `/es` redirige a `/`. Hay que desplegarlo.
2. **`speakable` apunta a una sección que ya no existe.** En `src/data/structuredData.ts` el selector `#acerca .t-body` no está en la portada. La extracción de voz se queda sin ese bloque.
3. **`PRODUCT.md` y el operating context siguen diciendo inglés en `/` y español en `/es/`.** El código ya no. Un auditor o un modelo que lea el repo cita la arquitectura vieja.

## Medium Priority Issues

- La portada es pobre para citar: el H1 es “Sistemas de IA” más un verbo que cambia (`operan`, `miden`, `escalan`, `automatizan`). Los cuatro verbos están en el HTML, pero la frase que un modelo debería repetir no es estable.
- Experiencia laboral (`Experience.astro`) ya no se monta. El E-E-A-T visible se redujo a formación corta. Los puestos siguen en JSON-LD y en `llms-full.txt`, no en la página que la gente abre.
- No hay `FAQPage` en schema, aunque cada proyecto tiene una pregunta y respuesta reales.
- `llms.txt` decía que el inglés vivía en `/`. La primera línea ya se actualizó; el resto del archivo sigue en inglés y enlaza proyectos en `/projects/`, que sí existen.
- Métricas (90 %, 80 %, 65 %, 40 %, 75 %) son de operador. Están bien si se mantienen con la frase “según el operador”. No subirlas a “auditadas”.

## Low Priority Issues

- `og:image:alt` sigue fijo en inglés en todas las páginas.
- Preload de Silkscreen aunque el wordmark ya no usa esa fuente.
- No hay presencia verificada en Wikipedia, Reddit o YouTube. No inventarla.

---

## Category Deep Dives

### AI Citability (72/100)

Las fichas de proyecto son el mejor activo: cada una nombra cliente, fechas, problema, solución, arquitectura y cómo se midió. Eso es lo que un modelo puede citar sin alucinar. La portada no. Un bloque de 40–60 palabras, estable, bajo el H1 (“Franco Sanchez construye sistemas de IA en producción para plantas, facturación CFDI y universidades en México”) subiría más que otro efecto.

### Brand Authority (48/100)

Hay entidad real: nombre legal, empleadores nombrados, correo, teléfono, schema `Person`. No hay prensa, Wikidata ni página de Wikipedia. Los enlaces salen a GitHub y LinkedIn. Suficiente para no ser anónimo; no suficiente para que un modelo te elija frente a una marca con menciones.

### Content E-E-A-T (68/100)

Experiencia demostrada en los cinco sistemas. La formación (UNIR, Anáhuac, UVP, IEEE) está. Falta en la home el historial de puestos, que era la prueba de trayectoria. El aviso de privacidad ya está partido en responsable, datos, finalidad, transferencia, plazo y ARCO.

### Technical GEO (74/100)

HTML estático, `robots.txt` con `Allow: /`, sitemap generado, `llms.txt` y `llms-full.txt`, cabeceras de seguridad en `vercel.json`. El fallo era de señales contradictorias (canonical / hreflang), no de rastreo. GSAP no esconde el texto: los verbos están en el DOM.

### Schema & Structured Data (70/100)

`WebSite`, `ProfilePage`, `Person` con `worksFor`, credenciales y `speakable`. Proyectos con obra y breadcrumb. Falta `FAQPage` en cada caso y el selector `speakable` de la home está roto (`#acerca`).

### Platform Optimization (42/100)

No medí menciones en Reddit, YouTube o Wikipedia en esta pasada. El sitio no las declara. Puntuación conservadora a propósito.

---

## Quick Wins (Implement This Week)

1. Desplegar el canonical de `/` a sí mismo y el 308 de `/es` → `/`.
2. Quitar `#acerca` del `speakable` o volver a poner un párrafo estable con ese id.
3. Añadir `FAQPage` con la pregunta que ya existe en cada proyecto.
4. Una frase fija de 40 palabras bajo el H1, en español, citable.
5. Dejar de precargar Silkscreen.

## 30-Day Action Plan

### Week 1: Señales que Google ya está marcando
- [ ] Publicar canonical y redirect
- [ ] Revisar en Search Console que `/` se autocanoniza
- [ ] Arreglar `speakable`

### Week 2: Texto que una IA puede repetir
- [ ] Párrafo estable en la portada
- [ ] `FAQPage` en los cinco casos
- [ ] Alinear `llms.txt` con la home en español

### Week 3: E-E-A-T sin volver al CV
- [ ] Una lista corta de empleadores (solo nombre, fecha, sistema) otra vez visible
- [ ] No reintroducir “Descargar CV” como acción principal

### Week 4: Autoridad fuera del sitio
- [ ] Perfil de LinkedIn y GitHub enlazados con las mismas cifras y la misma grafía del nombre
- [ ] No crear premios ni certificaciones que el repo marca como no evidenciados

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| `/` | Franco Sanchez - Ingeniero de IA y Software | Canonical histórico hacia `/es/`; H1 inestable; speakable roto |
| `/es/` | Duplicado de la home | Debe redirigir a `/` |
| `/projects/*` y `/es/proyectos/*` | Cinco casos | Fuertes; falta FAQ schema |
| `/privacy/` y `/es/privacidad/` | Aviso | Bien acotado al formulario |
| `/sitemap.xml` | Sitemap | La home ya no debe listarse dos veces ni marcar `/` como inglés |
| `/llms.txt` | Dump para modelos | Primera línea actualizada; el cuerpo sigue describiendo el inglés como home |
