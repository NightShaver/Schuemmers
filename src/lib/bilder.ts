import type { ImageMetadata } from 'astro';

/**
 * Automatische Bildverwaltung.
 *
 * Wer ein Bild auf der Seite haben will, legt die Datei in
 * `src/assets/bilder/<kategorie>/` ab. Mehr ist nicht nötig: der nächste
 * Build findet sie, rechnet AVIF- und WebP-Varianten in mehreren Breiten
 * aus und setzt sie in die passende Sektion.
 *
 * Reihenfolge steuert man über eine Zahl am Dateianfang (`01-`, `02-`).
 * Der Bildtext entsteht aus dem Dateinamen und lässt sich in
 * `bildtexte.json` überschreiben, wenn er genauer sein soll.
 */

export type Kategorie =
  | 'hero'
  | 'fuhrpark'
  | 'container'
  | 'baustoffe'
  | 'recycling'
  | 'bigbags'
  | 'team'
  | 'gelaende';

export type Bild = {
  quelle: ImageMetadata;
  alt: string;
  /** Dateiname ohne Sortierziffer und Endung, dient als stabiler Schlüssel. */
  schluessel: string;
  kategorie: string;
};

const dateien = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/bilder/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

const texte = import.meta.glob<{ default: Record<string, string> }>(
  '/src/assets/bilder/bildtexte.json',
  { eager: true },
);

const ueberschriebeneTexte: Record<string, string> =
  Object.values(texte)[0]?.default ?? {};

/** Wörter, die der Dateiname klein schreibt, die im Text aber groß gehören. */
const schreibweisen: Record<string, string> = {
  lkw: 'LKW',
  bigbag: 'BigBag',
  bigbags: 'BigBags',
  schuemmer: 'Schümmer',
  m3: 'm³',
  cbm: 'm³',
  rc: 'RC',
  eschweiler: 'Eschweiler',
  aachen: 'Aachen',
  stolberg: 'Stolberg',
  abrollcontainer: 'Abrollcontainer',
  absetzcontainer: 'Absetzcontainer',
};

function altAusDateiname(schluessel: string): string {
  const woerter = schluessel.split('-').filter(Boolean);
  const lesbar = woerter
    .map((wort) => {
      const treffer = schreibweisen[wort.toLowerCase()];
      if (treffer) return treffer;
      return wort.charAt(0).toUpperCase() + wort.slice(1);
    })
    .join(' ');
  return lesbar || 'Schümmer Containerdienst';
}

function auslesen(): Bild[] {
  return Object.entries(dateien).map(([pfad, modul]) => {
    const teile = pfad.split('/');
    const dateiname = teile.pop() ?? '';
    const kategorie = teile.pop() ?? 'sonstiges';
    const ohneEndung = dateiname.replace(/\.[^.]+$/, '');
    // Führende Sortierziffer gehört nicht in den Bildtext.
    const schluessel = ohneEndung.replace(/^\d+[-_]?/, '');

    return {
      quelle: modul.default,
      schluessel,
      kategorie,
      alt:
        ueberschriebeneTexte[`${kategorie}/${dateiname}`] ??
        ueberschriebeneTexte[dateiname] ??
        altAusDateiname(schluessel),
      // Der volle Dateiname bleibt nur intern für die Sortierung erhalten.
      _sortierung: ohneEndung,
    } as Bild & { _sortierung: string };
  });
}

const alle = auslesen().sort((a, b) =>
  (a as Bild & { _sortierung: string })._sortierung.localeCompare(
    (b as Bild & { _sortierung: string })._sortierung,
    'de',
    { numeric: true },
  ),
);

/**
 * Alle Bilder einer Kategorie. Mehrere Kategorien werden der Reihe nach
 * durchprobiert, sodass eine leere Kategorie automatisch auf eine
 * gefüllte zurückfällt statt eine Lücke auf der Seite zu hinterlassen.
 */
export function bilderAus(...kategorien: (Kategorie | string)[]): Bild[] {
  for (const kategorie of kategorien) {
    const treffer = alle.filter((bild) => bild.kategorie === kategorie);
    if (treffer.length > 0) return treffer;
  }
  return [];
}

/** Erstes Bild der ersten gefüllten Kategorie, sonst undefined. */
export function bild(...kategorien: (Kategorie | string)[]): Bild | undefined {
  return bilderAus(...kategorien)[0];
}

/**
 * Bild an fester Position, umlaufend gezählt. Damit bekommt jede Sektion
 * ein anderes Motiv, auch wenn nur zwei Dateien im Ordner liegen.
 */
export function bildAn(index: number, ...kategorien: (Kategorie | string)[]): Bild | undefined {
  const liste = bilderAus(...kategorien);
  if (liste.length === 0) return undefined;
  return liste[index % liste.length];
}

export const bilderVorhanden = alle.length > 0;

/**
 * Alle vorhandenen Bilder über alle Kategorien hinweg. Die Galerie greift
 * darauf zurück, solange im Ordner `galerie` noch nichts liegt, damit dort
 * nie eine leere Fläche steht.
 */
export function alleBilder(): Bild[] {
  return alle;
}
