# Spec: Mundo nuevo - Cuaderno de taller

Fecha: 2026-09-06
Enfoque: **C** (usuario), scrapbook / clay / pixel.
Semilla Impeccable: `0dfc4e81` (índice 4 apartado: dirección pinneada por el usuario).
Fusión: zine a mano (`hand-drawn-zine-explainer`) + material de esmalte/arcilla (`clay-ceramics-fracture-glaze-river-shelf`) + recorte Macintosh de las capturas reales.

## Contrato

**THESIS:** El sitio es un cuaderno de taller: sello pixel del nombre, capturas pegadas con cinta, proyectos como carpetas de arcilla. Rechaza el CV de rejilla suiza y el portfolio dark-tech de tres cards.

**OWN-WORLD:** Papel rayado `#F3EEE4`, tinta `#171412`, violeta `#6D28D9`, marcador `#E2C44D`, arcilla `#3D6FBF` / `#D4743A` / `#1C2740`. Display Silkscreen (sello). Cuerpo General Sans. Cinta, tabs de carpeta, recortes.

**STORY:** Un reclutador ve nombre, rol actual en Towel y el trabajo como objeto. Descarga el CV o abre un sistema.

**FIRST VIEWPORT:** Sello pixel "Franco Sanchez" en caja trazada, pastillas de anotación (rol, Puebla, Towel, 5 sistemas), una frase, CV + ver el registro, franja de recortes reales.

**FORM:** Mundo nuevo pinneado por el usuario. GEO, bilingüe, sin `client:*`, sin dark mode, sin rojo.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md

## Lo que no cambia

- Rutas `/projects/<slug>/` y `/es/proyectos/<slug>/`
- `SITE`, JSON-LD, Formspree, CV, privacidad
- Copy de datos en `src/data/` (bilingüe, cifras con medición)
- HTML extraíble: nada importante nace en `opacity: 0` ni `[hidden]` salvo el menú móvil
- Un solo tema claro. Reclutador gana si hay conflicto de conversión

## Composición

Orden: Hero, Projects, About, Competencies, Experience, Education, Contact.

1. **Nav.** Píldoras tipo scrapbook. Home en amarillo. Projects / Experience / Contact conservan esas etiquetas. Idioma sigue siendo un `<a>` a la otra URL.
2. **Hero.** Columna meta con los cuatro hechos actuales más el empleo en Towel como pastilla visible. Polaroids de capturas reales a los lados (desktop). CTA: Descargar CV (primario), Ver el registro (secundario).
3. **Projects.** Índice de cinco paneles verticales (Macintosh). Cada panel es una carpeta de arcilla con recorte de captura. ERP textil sin foto usa un patrón geométrico, no un mock inventado. Título e impacto siempre en el DOM.
4. **About.** Bio en tarjeta de papel; una captura tapada con cinta. La nota `.com`/`.dev` baja de peso.
5. **Competencies.** Tres etiquetas onduladas de color, no filas de archivo.
6. **Experience / Education.** Siguen siendo filas-registro sobre papel (no placa negra).
7. **Contact.** Formulario sobre un sticky amarillo. Canales a la izquierda. Errores: borde doble de tinta, no rojo.

## GSAP

Módulos en `src/scripts/`, testeables. `gsap.matchMedia()`. Reduced motion: se deja de mover, no de responder.

- `hero.ts`: line-lift de palabras enteras (igual que hoy) + trazo de la caja del nombre.
- `atelier.ts`: flotación de pastillas, acordeón de paneles en desktop, inclinación de polaroids al hover. ScrollTrigger solo para el pin del índice si el CSS no alcanza.
- Contenido visible por defecto. Animar `transform` / `clip-path` / `stroke-dashoffset`.
- Un marquee máximo: cero. Sin hijack de scroll en móvil.

## Tokens

| Rol | Valor | Uso |
|---|---|---|
| paper | `#F3EEE4` | fondo rayado |
| ink | `#171412` | texto |
| mid | `#5C564E` | secundario, ≥4.5:1 sobre paper |
| violet | `#6D28D9` | acento, foco, sello |
| marker | `#E2C44D` | pastillas, sticky, Home |
| clay-navy | `#1C2740` | panel 01 |
| clay-blue | `#3D6FBF` | panel 03 |
| clay-orange | `#D4743A` | panel 04 |

## Pruebas

Los tests actuales de Hero, Projects, Navbar, Contact, GEO y motion deben seguir verdes. Añadir cobertura del acordeón (markup visible, sin `[hidden]` en paneles).
