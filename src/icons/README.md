# `src/icons/` — SVG propios (opcional)

Acá van los SVG que reemplazan íconos de interfaz. **No es obligatorio**: hoy todo el set sale de Lucide.

## Regla

El nombre del archivo define qué reemplaza:

| Archivo | Reemplaza |
|---|---|
| `arrow-down.svg` | Bajar |
| `arrow-up.svg` | Volver arriba |
| `share.svg` | Compartir |
| `link.svg` | Enlace |
| `external.svg` | Fuente externa |
| `mail.svg` | Correo |
| `mountain.svg` | Altitud |
| `sprout.svg` | El origen |
| `snowflake.svg` | Germoplasma |
| `plate.svg` | Platos |
| `bowl.svg` | Cocina |
| `globe.svg` | El vuelo |
| `drop.svg` | Nutrientes |
| `layers.svg` | Variedades |

Si el nombre no está en la lista, es un ícono nuevo: hay que decir dónde se usa.

## Requisitos del archivo

Un SVG descargado casi nunca viene listo:

- `viewBox` definido, **sin** `width`/`height` fijos
- **Sin colores hardcodeados** — `fill="none"` + `stroke="currentColor"`
- **Sin** `style="..."` inline
- **Sin** metadatos de Figma o Illustrator

## Cómo se conectan

Esta carpeta es la **bandeja de entrada**, no un mecanismo automático. Cuando dejes un archivo acá:

1. Lo normalizo (viewBox, colores, metadatos)
2. Lo conecto en `Icon.astro` en una línea
3. Verifico que renderice

No se cargan solos a propósito: un SVG con `fill="#000"` rompería el color del sistema.

## Los logos NO van acá

El logo del header y el del footer son **PNG en `src/assets/`**:

- `src/assets/logo-header.png`
- `src/assets/logo-footer.png`
