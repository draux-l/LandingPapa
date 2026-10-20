/**
 * Site identity and author links.
 *
 * Single place to edit when the author supplies their real name and handles.
 * Every placeholder below is marked TODO — nothing here should ship as-is.
 */

export const SITE = {
  brand: 'Huayro',

  /**
   * Slogan. Sits under the wordmark in the footer.
   * Alternatives to try: "La historia de la papa peruana, en siete escalas."
   *                      "Del altiplano al plato, sin cortes."
   */
  tagline: 'Cuatro mil variedades. Una sola historia.',

  author: {
    name: 'Diego Llanos',
    role: 'Dirección, montaje y desarrollo',
  },

  links: {
    // TODO: reemplazar por los reales
    repo: 'https://github.com/tu-usuario/huayro',
    linkedin: 'https://www.linkedin.com/in/tu-usuario/',
    instagram: 'https://www.instagram.com/tu-usuario/',
    email: 'hola@tudominio.com',
  },

  year: '2026',

  /** Code licence. Choose deliberately: MIT, Apache-2.0, or 'Todos los derechos reservados'. */
  license: 'MIT',

  /** Shown as the toolchain strip in the footer. */
  tech: ['Astro', 'GSAP', 'ffmpeg', 'MiniMax H3'],

  sources: [
    { name: 'Centro Internacional de la Papa', url: 'https://cipotato.org/es/' },
    { name: 'Parque de la Papa', url: 'https://parquedelapapa.org/' },
  ],
};

/** Ordered anchors used by the header and the footer. */
export const NAV = [
  { href: '#story', label: 'La película' },
  { href: '#datos', label: 'Los datos' },
  { href: '#metodo', label: 'Cómo se hizo' },
];
