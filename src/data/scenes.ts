/**
 * Single source of truth for the scroll sequence.
 *
 * Everything the ScrollStage, the progress rail and the scene card need lives
 * here. Changing a clip duration or rewriting a line of copy is an edit to this
 * file only — no component changes required.
 *
 * Source of truth for the clip CONTENT is the Obsidian note
 * "10 Proyectos/LandingPages/Papa Peruana - Clips.md". Keep the two in sync.
 */

/** The translucent card shown over the film during a scene. */
export type SceneCard = {
  /** Icon name resolved by src/components/Icon.astro */
  icon: string;
  /** Small all-caps eyebrow: the category. */
  label: string;
  /** The headline figure or phrase. */
  value: string;
  /** Optional supporting line. Keep it to one sentence. */
  detail?: string;
};

export type Clip = {
  /** Stable slug. Must match the raw file name: `clips-raw/01-despertar.mp4` */
  slug: string;
  /** Internal label. Used by the progress rail tooltip. */
  title: string;
  /** Duration in seconds of the generated clip. Tune this when a clip is re-rendered. */
  seconds: number;
  /** Accent colour. Tints the rail, the card badge and the ambient glow. */
  accent: string;
  /** The single card that carries this scene's information. */
  card: SceneCard;
};

/**
 * Export targets. One master, two derivatives — see S3 in odd/tasks/papa-landing.md.
 * Mobile is a centre crop of the 16:9 master, computed at export time, not generated twice.
 */
export const EXPORT = {
  desktop: { fps: 24, width: 1600, height: 900, quality: 76 },
  mobile: { fps: 15, width: 720, height: 1280, quality: 72 },
} as const;

export const SCROLL = {
  /** Viewport heights of scroll given to each clip. Tune by narrative weight, not duration. */
  vhPerClip: 300,
  /** Card fades in at this fraction of its scene window. */
  cardIn: 0.2,
  /** Card leaves at this fraction of its scene window. */
  cardOut: 0.84,
} as const;

export const CLIPS: Clip[] = [
  {
    slug: 'despertar',
    title: 'El despertar',
    seconds: 5,
    accent: '#C9852F',
    card: {
      icon: 'sprout',
      label: 'El origen',
      value: 'Los Andes',
      detail: 'Domesticada por primera vez en las montañas de los Andes de Sudamérica.',
    },
  },
  {
    slug: 'bajada',
    title: 'La bajada',
    seconds: 4,
    accent: '#7A5230',
    card: {
      icon: 'mountain',
      label: 'Altitud',
      value: '0 – 4.700 m',
      detail: 'Donde se siembra papa: del nivel del mar a la puna.',
    },
  },
  {
    slug: 'bajo-tierra',
    title: 'Bajo tierra',
    seconds: 4,
    accent: '#5C3A22',
    card: {
      icon: 'layers',
      label: 'Variedades nativas',
      value: '+4.000',
      detail: 'De todos los colores, formas y texturas.',
    },
  },
  {
    slug: 'dentro',
    title: 'Dentro',
    seconds: 3,
    accent: '#7B4E8C',
    card: {
      icon: 'drop',
      label: 'Nutrientes',
      value: 'Potasio · C · B6',
      detail: 'Y antocianinas en las variedades de color.',
    },
  },
  {
    slug: 'pelapapas',
    title: 'El pelapapas',
    seconds: 5,
    accent: '#E3D5BE',
    card: {
      icon: 'bowl',
      label: 'Cocina',
      value: 'Mil recetas',
      detail: 'Una papa, mil recetas.',
    },
  },
  {
    slug: 'olla',
    title: 'La olla',
    seconds: 4,
    accent: '#C4622B',
    card: {
      icon: 'plate',
      label: 'Platos',
      value: '4 clásicos',
      detail: 'Huancaína, causa, rellena, pachamanca.',
    },
  },
  {
    slug: 'cierre',
    title: 'El cierre',
    seconds: 5,
    accent: '#C9852F',
    card: {
      icon: 'globe',
      label: 'El vuelo',
      value: 'De los Andes',
      detail: 'Para el mundo.',
    },
  },
];

export type Scene = Clip & {
  index: number;
  /** 1-based index of this scene's first frame in the exported sequence. */
  frameStart: number;
  /** Number of frames this scene occupies in the export. */
  frameCount: number;
  /** Seconds from the start of the master to this scene's first frame. */
  startTime: number;
};

/**
 * Derives the on-screen timeline for a given frame rate.
 *
 * Frame counts are computed, never hardcoded, so a duration change in CLIPS
 * propagates everywhere automatically.
 */
export function buildTimeline(fps: number): Scene[] {
  let frameCursor = 1;
  let timeCursor = 0;

  return CLIPS.map((clip, index) => {
    const frameCount = Math.round(clip.seconds * fps);
    const scene: Scene = {
      ...clip,
      index,
      frameStart: frameCursor,
      frameCount,
      startTime: timeCursor,
    };
    frameCursor += frameCount;
    timeCursor += clip.seconds;
    return scene;
  });
}

export const TOTAL_SECONDS = CLIPS.reduce((sum, clip) => sum + clip.seconds, 0);

/** Zero-padded frame file name, matching the ffmpeg `f_%04d.webp` pattern. */
export function frameName(n: number): string {
  return `f_${String(n).padStart(4, '0')}.webp`;
}

/** Base path for a versioned frame set. Bump the version on every re-export. */
export function frameBase(version: string, device: keyof typeof EXPORT): string {
  return `/frames/${version}/${device}`;
}
