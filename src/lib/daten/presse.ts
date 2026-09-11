/**
 * Presseberichte und Erwähnungen.
 *
 * Hier trägt der Betrieb ein, wo über ihn berichtet wurde. Die Liste
 * `pressestimmen` ist bewusst leer, solange nichts vorliegt: die Sektion
 * blendet sich dann auf der veröffentlichten Seite von selbst aus, statt
 * mit Platzhaltern zu füllen. Zum Ansehen gibt es weiter unten vier
 * Beispieleinträge.
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
  /**
   * Kennzeichnet einen Beispieleintrag. Solche Karten tragen auf der Seite
   * sichtbar den Hinweis "Beispiel", damit niemand sie für einen echten
   * Bericht hält. Echte Einträge setzen dieses Feld nicht.
   */
  beispiel?: true;
};

export const pressestimmen: Pressestimme[] = [];

/**
 * Beispieleinträge für die Vorführung.
 *
 * Zweck: zeigen, wie der Bereich mit Inhalt aussieht, bevor echte Berichte
 * vorliegen. Die Quellen sind erfundene Gattungsnamen, keine bestehenden
 * Zeitungen, und jede Karte trägt sichtbar den Hinweis "Beispiel".
 *
 * Sichtbar sind sie im Entwicklungsserver und in der Vorführfassung
 * (`SCHUEMMER_DEMO=ja`, so baut `npm run build:pages`). Im normalen Build
 * für die echte Domain bleiben sie weg, dafür sorgt `beispieleSichtbar`.
 *
 * Echte Berichte kommen nach `pressestimmen` oben, nicht hierher. Sobald
 * dort der erste Eintrag steht, sollten die Beispiele abgeschaltet werden:
 * `npm run build:pages -- --ohne-beispiele`.
 */
const beispielstimmen: Pressestimme[] = [
  {
    quelle: 'Regionalzeitung (Beispiel)',
    datum: '2026-05-21',
    titel: 'Aus Bauschutt wird wieder Baustoff',
    auszug:
      'Was auf der Baustelle abgerissen wird, verlässt den Hof an der Albertstraße als Recyclingschotter. Der Weg dahin ist kurz: sortieren, brechen, sieben, prüfen.',
    link: 'https://example.org/',
    beispiel: true,
  },
  {
    quelle: 'Wochenblatt (Beispiel)',
    datum: '2026-02-08',
    titel: 'Seit sechzig Jahren am selben Ort',
    auszug:
      'Angefangen hat der Betrieb 1966 als Containerdienst für die Region. Heute stehen Umschlaghalle und Recyclinganlage auf demselben Grundstück.',
    datei: '/dokumente/agb-schuemmer.pdf',
    beispiel: true,
  },
  {
    quelle: 'Branchenmagazin (Beispiel)',
    datum: '2025-11-12',
    titel: 'Fünfzehn Containergrößen für jede Zufahrt',
    auszug:
      'Nicht jede Einfahrt trägt einen Abrollcontainer. Wer vorher fragt, bekommt die Größe, die tatsächlich vor das Haus passt.',
    beispiel: true,
  },
  {
    quelle: 'Lokalanzeiger (Beispiel)',
    datum: '2025-09-30',
    titel: 'Entsorgung für die Baustellen der Städteregion',
    auszug:
      'Von Eschweiler aus fahren die Lastwagen nach Aachen, Stolberg, Alsdorf und Würselen. Kurze Wege sind hier keine Werbeaussage, sondern Fahrzeit.',
    beispiel: true,
  },
];

/**
 * Sollen die Beispiele mitlaufen?
 *
 * Immer im Entwicklungsserver. Darüber hinaus nur, wenn der Build
 * ausdrücklich als Vorführfassung läuft. Die Vorführfassung ist zusätzlich
 * für Suchmaschinen gesperrt, siehe scripts/pages-bauen.mjs.
 */
function beispieleSichtbar(): boolean {
  if (import.meta.env.DEV) return true;
  return typeof process !== 'undefined' && process.env?.SCHUEMMER_DEMO === 'ja';
}

/** Trifft auf mindestens eine ausgegebene Karte der Beispielhinweis zu? */
export function zeigtBeispiele(): boolean {
  return pressestimmenSortiert().some((stimme) => stimme.beispiel === true);
}

/**
 * Neueste zuerst. Beispiele hängen hinten an, damit echte Berichte immer
 * zuerst stehen, sobald welche eingetragen sind.
 */
export function pressestimmenSortiert(): Pressestimme[] {
  const quelle = beispieleSichtbar() ? [...pressestimmen, ...beispielstimmen] : pressestimmen;
  return [...quelle].sort((a, b) => {
    if (Boolean(a.beispiel) !== Boolean(b.beispiel)) return a.beispiel ? 1 : -1;
    return b.datum.localeCompare(a.datum);
  });
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
