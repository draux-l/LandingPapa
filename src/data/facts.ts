/**
 * Verified facts for the editorial section.
 *
 * RULE: `sourceUrl` is required. A fact without a citable source does not ship.
 * Every figure below was read from the organisation's own site — do not add a
 * number here that you have not opened and read.
 */

export type Fact = {
  /** Icon name resolved by src/components/Icon.astro */
  icon: string;
  /** Small category label. */
  label: string;
  /** The headline figure. */
  value: string;
  /** One supporting sentence. Plain language, no adjectives doing the work. */
  body: string;
  /** Accent used for this card's top rule. */
  accent: string;
  source: {
    name: string;
    /** Required. Never leave this empty. */
    url: string;
    year: string;
  };
};

export const FACTS: Fact[] = [
  {
    icon: 'layers',
    label: 'Variedades nativas',
    value: '+4.000',
    body: 'En las altiplanicies de Perú, Bolivia y Ecuador se cultivan más de 4.000 variedades de papa nativa, entre los 3.500 y los 4.200 metros de altura.',
    accent: '#7B4E8C',
    source: {
      name: 'Centro Internacional de la Papa',
      url: 'https://cipotato.org/es/potato/native-potato-varieties/',
      year: '2026',
    },
  },
  {
    icon: 'mountain',
    label: 'Conservación comunitaria',
    value: '1.367',
    body: 'Cultivares de papa nativa conservados por cinco comunidades quechuas del Parque de la Papa, en Pisaq, Cusco, un modelo vigente desde 1998.',
    accent: '#7A5230',
    source: {
      name: 'Parque de la Papa',
      url: 'https://parquedelapapa.org/1-hoja-informativa-del-parque-de-la-papa-del-ano-2025/',
      year: '2025',
    },
  },
  {
    icon: 'snowflake',
    label: 'Banco de germoplasma',
    value: '+7.000',
    body: 'Accesiones de variedades nativas, silvestres y mejoradas en la colección del CIP, la más grande del mundo. Además, existen 151 especies de papa silvestre.',
    accent: '#C4622B',
    source: {
      name: 'Centro Internacional de la Papa',
      url: 'https://cipotato.org/es/potato/',
      year: '2026',
    },
  },
];
