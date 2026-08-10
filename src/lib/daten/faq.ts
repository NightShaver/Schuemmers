/**
 * Fragen, die bei uns täglich am Telefon ankommen. Sie stehen hier, weil
 * eine beantwortete Frage vor der Bestellung eine Rückfrage danach spart,
 * und weil Google sie als FAQ-Snippet ausspielt.
 */

export type Frage = {
  frage: string;
  antwort: string;
  /** Auf welchen Seiten die Frage erscheint. */
  seiten: ('start' | 'container' | 'entsorgung' | 'baustoffe' | 'ort')[];
};

export const fragen: Frage[] = [
  {
    frage: 'Welche Containergröße brauche ich?',
    antwort:
      'Das hängt weniger vom Volumen ab, als man denkt. Bei Bauschutt und Erdaushub ist die Mulde schwer, bevor sie voll ist, hier reichen 3 bis 7 m³ fast immer. Bei leichtem Material wie Holz, Dämmung oder Verpackung zählt der Platz, dann sind 20 bis 40 m³ richtig. Der Konfigurator auf dieser Seite schlägt Ihnen eine Größe vor, und im Zweifel klären wir es in zwei Minuten am Telefon.',
    seiten: ['start', 'container', 'ort'],
  },
  {
    frage: 'Wie viel Platz muss ich für den Container freihalten?',
    antwort:
      'Für einen Absetzcontainer brauchen wir eine freie Fläche in Containerlänge plus etwa zwei Meter, und darüber freien Himmel ohne Äste oder Leitungen. Ein Abrollcontainer braucht zusätzlich rund zehn Meter Rangierweg nach hinten. Wenn Sie unsicher sind, schicken Sie uns ein Foto der Zufahrt, dann sagen wir Ihnen, welche Bauart passt.',
    seiten: ['container', 'ort'],
  },
  {
    frage: 'Brauche ich eine Genehmigung, wenn der Container auf der Straße steht?',
    antwort:
      'Ja. Sobald der Container auf öffentlichem Grund steht, also auf Straße, Gehweg oder einem öffentlichen Parkplatz, ist eine Sondernutzungserlaubnis der Stadt nötig. Auf dem eigenen Grundstück brauchen Sie keine. Sagen Sie uns bei der Bestellung Bescheid, wo der Container stehen soll, dann sagen wir Ihnen, was Ihre Kommune verlangt.',
    seiten: ['container', 'ort'],
  },
  {
    frage: 'Wie schnell steht der Container?',
    antwort:
      'Im Regelfall innerhalb von ein bis zwei Werktagen. Bei kurzfristigem Bedarf lohnt der Anruf immer: Unser Fuhrpark fährt täglich durch die Städteregion, und was auf einer bestehenden Tour mitgeht, geht oft noch am selben Tag.',
    seiten: ['start', 'container', 'ort'],
  },
  {
    frage: 'Wie lange darf der Container stehen bleiben?',
    antwort:
      'Die Standzeit stimmen wir auf Ihren Bauablauf ab. Für kurze Projekte reichen ein paar Tage, für laufende Baustellen richten wir feste Wechseltermine ein. Melden Sie sich einfach, wenn er voll ist oder länger stehen soll.',
    seiten: ['container'],
  },
  {
    frage: 'Kann ich Abfall selbst anliefern?',
    antwort:
      'Ja. Privatkunden und Gewerbe können auf unserem Recyclinghof an der Albertstraße 63a in Eschweiler selbst anliefern. Abgerechnet wird nach Gewicht über unsere Waage. Wichtig: Das letzte Einwiegen ist 15 Minuten vor Schließung.',
    seiten: ['start', 'entsorgung'],
  },
  {
    frage: 'Was kostet ein Container?',
    antwort:
      'Der Preis hängt von Größe, Abfallart, Standzeit und Ort ab, deshalb gibt es keine Pauschale, die für alle stimmt. Sie bekommen von uns ein konkretes Angebot, meist noch am selben Tag, und darin steht, was am Ende auf der Rechnung steht.',
    seiten: ['start', 'container', 'ort'],
  },
  {
    frage: 'Was passiert mit dem Abfall nach der Abholung?',
    antwort:
      'Er kommt auf unsere Recyclinganlage in Eschweiler. Dort wird sortiert, Wertstoffe werden separiert und gehen zurück in den Kreislauf, Störstoffe werden ordnungsgemäß entsorgt. Aufbereiteter Bauschutt wird bei uns wieder zu Recyclingschotter, den Sie kaufen können.',
    seiten: ['entsorgung', 'start'],
  },
  {
    frage: 'Übernehmen Sie auch gefährliche Abfälle?',
    antwort:
      'Ja, als zertifizierter Entsorgungsfachbetrieb. Für gefährliche Abfälle ist die elektronische Nachweisführung vorgeschrieben, diese Abwicklung übernehmen wir für Sie. Bitte rufen Sie vorher an, damit wir die Deklaration und den passenden Behälter klären.',
    seiten: ['entsorgung'],
  },
  {
    frage: 'Liefern Sie Baustoffe auch in kleinen Mengen?',
    antwort:
      'Ja. Größere Mengen kommen lose auf dem Kipper, kleinere im BigBag direkt an die Stelle, wo Sie das Material brauchen. Erde, Kompost und Rindenmulch gibt es zusätzlich als Sackware zum Mitnehmen.',
    seiten: ['baustoffe'],
  },
];

export function fragenFuer(seite: Frage['seiten'][number]): Frage[] {
  return fragen.filter((f) => f.seiten.includes(seite));
}
