/**
 * Presseberichte und Erwähnungen.
 *
 * Hier trägt der Betrieb ein, wo über ihn berichtet wurde. Die Liste
 * `pressestimmen` ist bewusst leer, solange nichts vorliegt: die Sektion
 * blendet sich dann auf der veröffentlichten Seite von selbst aus, statt
 * mit Platzhaltern zu füllen. Zum Ansehen im Entwicklungsserver gibt es
 * weiter unten drei Beispieleinträge.
 *
 * So sieht ein Eintrag aus:
 *
 * {
 *   quelle: 'Aachener Zeitung',
 *   datum: '2026-03-14',
 *   titel: 'Aus Bauschutt wird wieder Baustoff',
 *   auszug:
 *     'Ein Satz oder zwei aus dem Artikel, der den Kern trifft. Kein ' +
 *     'ganzer Absatz, sondern das, was hängen bleibt.',
 *   link: 'https://www.aachener-zeitung.de/...',   // wenn online lesbar
 *   datei: '/dokumente/az-2026-03-14.pdf',         // wenn als PDF vorliegt
 * }
 *
 * `link` und `datei` sind beide freiwillig. Ist keins von beiden gesetzt,
 * erscheint der Eintrag ohne Verweis. PDFs kommen nach
 * `public/dokumente/` und werden dann mit vorangestelltem Schrägstrich
 * eingetragen.
 *
 * Das Datum immer im Format Jahr-Monat-Tag. Die Ausgabe in deutscher
 * Schreibweise macht die Seite selbst.
 */

export type Pressestimme = {
  quelle: string;
  datum: string;
  titel: string;
  auszug: string;
  link?: string;
  datei?: string;
};

export const pressestimmen: Pressestimme[] = [];

/**
 * Beispieleinträge, nur zum Ansehen im Entwicklungsserver.
 *
 * Sie zeigen die drei möglichen Zustände einer Karte: mit Verweis auf einen
 * Online-Artikel, mit PDF und ganz ohne Verweis. Auf der veröffentlichten
 * Seite tauchen sie nie auf, dafür sorgt `pressestimmenSortiert`. Es kann
 * also nichts Erfundenes online gehen, auch wenn diese Liste stehen bleibt.
 *
 * Echte Berichte kommen nach `pressestimmen` oben, nicht hierher.
 */
const beispielstimmen: Pressestimme[] = [
  {
    quelle: 'Beispielzeitung',
    datum: '2026-05-21',
    titel: 'So sieht ein Eintrag mit Verweis auf den Online-Artikel aus',
    auszug:
      'Hier steht das Zitat aus dem Artikel, zwei bis drei Zeilen. Kurz genug, dass man es im Vorbeigehen liest, lang genug, dass es etwas sagt.',
    link: 'https://example.org/',
  },
  {
    quelle: 'Beispiel-Wochenblatt',
    datum: '2026-02-08',
    titel: 'So sieht ein Eintrag mit PDF aus',
    auszug:
      'Wenn der Artikel nicht online steht, legt man das eingescannte PDF nach public/dokumente und trägt den Pfad als datei ein.',
    datei: '/dokumente/agb-schuemmer.pdf',
  },
  {
    quelle: 'Beispiel-Anzeiger',
    datum: '2025-09-30',
    titel: 'So sieht ein Eintrag ganz ohne Verweis aus',
    auszug:
      'Ohne link und ohne datei bleibt die Karte stehen, nur der Knopf am unteren Rand fällt weg. Für Erwähnungen, die man nicht verlinken kann.',
  },
];

/**
 * Neueste zuerst. Im Entwicklungsserver hängen die Beispiele hinten an,
 * damit man das Aussehen prüfen kann, ohne etwas Erfundenes zu
 * veröffentlichen.
 */
export function pressestimmenSortiert(): Pressestimme[] {
  const quelle = import.meta.env.DEV ? [...pressestimmen, ...beispielstimmen] : pressestimmen;
  return [...quelle].sort((a, b) => b.datum.localeCompare(a.datum));
}

export function datumLesbar(datum: string): string {
  const zeitpunkt = new Date(datum);
  if (Number.isNaN(zeitpunkt.getTime())) return datum;
  return zeitpunkt.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
