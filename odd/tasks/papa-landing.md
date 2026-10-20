# Papa Peruana — Landing con scroll cinematográfico

Objetivo: una landing donde el scroll controla el recorrido de una papa peruana, desde las terrazas andinas hasta el plato. Pieza de portafolio para publicar en LinkedIn.
Rama: `main` · Entrega: `single-pr` · Runner: `npm run build` (Astro) · Guion vigente: Obsidian `Papa Peruana - Clips.md`

## Specs

**S1 — El recorrido son 7 clips en descenso continuo.**
Cada clip arranca exactamente donde terminó el anterior. El contenido de los 7 clipes está definido en Obsidian `Papa Peruana - Clips.md` y esa nota es la fuente de verdad, no este archivo.
Aceptación: los 7 clips existen, cada uno con su último frame idéntico al primer frame del siguiente.

**S2 — Formato 16:9 con zona segura central.**
Todos los clips se generan en 16:9 y la acción importante vive en el centro. El sujeto nunca toca el 20% exterior de cada lado.
Aceptación: al recortar a 9:16, el sujeto sigue en cuadro.

**S3 — No se generan dos veces.**
Un solo master 16:9. El móvil recibe un recorte al centro calculado en el export.
Aceptación: existe un solo set de clips crudos y dos exports derivados de él.

**S4 — Stack: Astro 5 + GSAP ScrollTrigger.**
Sin React, sin Framer Motion, sin shadcn. La página más pesada del sitio tiene que ser la más liviana.
Aceptación: el JS que llega al cliente es Astro + GSAP y nada más.

**S5 — `src/data/scenes.ts` es la única fuente de verdad.**
Guarda por escena: frame de inicio, cantidad de frames, texto, color de acento. Guarda rangos, no asume duraciones parejas.
Aceptación: cambiar la duración de un clip se resuelve editando ese archivo, sin tocar componentes.

**S6 — Secciones de la página, en este orden.**
`Hero` → `ScrollStage` → `La papa en datos` → `Cómo se hizo` → `CTA` → `Footer`.
Aceptación: no se agregan navbar, galería, mapa, nutrición, FAQ ni formularios.

**S7 — Hosting en Cloudflare R2.**
Los frames WebP y el master MP4 viven en R2. Los clips crudos, normalizados y masters de trabajo no salen del disco local ni entran al repo.
Aceptación: `clips-raw/`, `norm/` y `master/` están en `.gitignore`.

**S8 — Un solo pase de compresión.**
Nunca recomprimir. El export es la única compresión. Cuando un beat se pasa del presupuesto, se baja resolución antes que fps.
Aceptación: cada export sale de los crudos una sola vez.

**S9 — Verificación automática de la cadena.**
Por cada clip: duración, resolución, fps, formato, peso, y la comparación del último frame del clip N contra el primer frame del clip N+1.
Aceptación: la comparación de frames reporta si el enganche es correcto o dónde se rompe.

## Tasks

| ID | Tarea | Specs | Ruta | Estado |
|----|-------|-------|------|--------|
| T1 | Historial y andamiaje del repo (Astro 5, tsconfig, gitignore) | S4, S7 | inline | **hecho** |
| T2 | `src/data/scenes.ts` con rangos por escena | S5 | inline | **hecho** |
| T3 | `ScrollStage` — canvas, pin, scrub, texto y barra de progreso | S1, S5 | inline | **hecho** |
| T4 | Secciones: Hero, La papa en datos, Cómo se hizo, CTA, Footer | S6 | inline | en curso |
| T5 | Scripts: último frame, normalizar, unir, exportar frames | S8, S9 | inline | pendiente |
| T6 | Verificador de cadena entre clips | S9 | inline | pendiente |
| T7 | Subida a R2 y deploy en Cloudflare Pages | S7 | inline | pendiente |

## Log

**Estado:** base construida y compilando. `npm run build` pasa. Falta conectar los frames reales.

**Pendiente de optimizar:** el bundle de cliente pesa 117 kB (47 kB gzip), casi todo GSAP. Importar solo lo necesario antes de publicar.

**L1** — "puedes leer mi obsidian y busca la nota que diga de landing papa"

**L2** — El usuario acota el alcance: "solo haré lo de landing papa peruana para subirlo como un post de linkedin mostrando que se puede hacer"

**L3** — Corrección de dirección: el video debe ser VIDEO real, no imágenes animadas. "yo no quiero nada de querer imagenes sino videos"

**L4** — Restricción dura: sin presupuesto. "siempre se busca lo más económico"

**L5** — El usuario define la división del trabajo: "yo haré todos los videos de forma manual mientras que tú vas construyendo la landing"

**L6** — El usuario pide una sección adicional con más información sobre la papa peruana y el footer, porque la pieza no puede quedarse solo en el video con scroll.

**L7** — El usuario advierte que el contenido de los clips va a cambiar y pide que cada modificación quede registrada en Obsidian para no perder historial.

### Decisiones tomadas

- **Sin SDD.** Los requerimientos ya están claros y documentados en la bóveda del usuario. Se usa este documento de seguimiento en su lugar.
- **Un solo master 16:9, dos exports.** El recorte a 9:16 para móvil se hace en el export, no en la generación. Cero créditos extra.
- **Sin crossfades.** Como el último frame de un clip es idéntico al primero del siguiente, la unión ya es invisible.
