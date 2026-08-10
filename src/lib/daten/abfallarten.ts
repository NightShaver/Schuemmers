/**
 * Abfallarten für den Container-Konfigurator und die Entsorgungsseite.
 *
 * Die Auswahl folgt der Aufzählung der bisherigen Recyclinganlagen-Seite:
 * gemischte Bau- und Abbruchabfälle, Holz, Beton, Steine, Sand, Schotter,
 * Bitumenasphaltdecken und Erde, dazu gefährliche Abfälle mit
 * elektronischem Nachweisverfahren. Was der Betrieb nicht nachweislich
 * annimmt, steht hier bewusst nicht.
 *
 * Die Trennhinweise unter `gehoertNichtRein` sind der übliche Grund für
 * teure Nachsortierung: ein einziger Sack Gips im Bauschutt macht die
 * ganze Mulde zum Mischabfall. Deshalb stehen sie direkt am Auswahlpunkt
 * und nicht irgendwo im Kleingedruckten.
 */

export type Abfallart = {
  id: string;
  name: string;
  kurz: string;
  icon: string;
  beschreibung: string;
  gehoertRein: string[];
  gehoertNichtRein: string[];
  /** Schwere Materialien brauchen kleine Container, leichte große. */
  dichte: 'schwer' | 'mittel' | 'leicht';
  /** Container-Id, die der Konfigurator als Erstes vorschlägt. */
  empfehlung: string;
  hinweis?: string;
};

export const abfallarten: Abfallart[] = [
  {
    id: 'bauschutt',
    empfehlung: 'absetz-6',
    name: 'Bauschutt, Beton und Steine',
    kurz: 'Bauschutt',
    icon: 'ph:wall-bold',
    beschreibung:
      'Mineralischer Abbruch aus Rückbau und Sanierung. Sortenrein angeliefert geht er direkt in unsere Aufbereitung und wird wieder zu Baustoff.',
    gehoertRein: ['Beton und Stahlbeton', 'Ziegel und Mauerwerk', 'Fliesen und Keramik', 'Steine und Schotter', 'Estrich'],
    gehoertNichtRein: ['Gipskarton und Rigips', 'Holz', 'Kunststoff und Folien', 'Dämmwolle', 'Metall'],
    dichte: 'schwer',
    hinweis: 'Bei Bauschutt zählt das Gewicht, nicht das Volumen. Kleinere Mulden sind hier fast immer richtig.',
  },
  {
    id: 'erdaushub',
    empfehlung: 'abroll-10',
    name: 'Erde, Sand und Schotter',
    kurz: 'Erdaushub',
    icon: 'ph:mountains-bold',
    beschreibung:
      'Aushub aus Baugrube, Leitungsgraben oder Garten- und Landschaftsbau. Unbelasteter Boden lässt sich verwerten statt deponieren.',
    gehoertRein: ['Mutterboden', 'Lehm und Ton', 'Sand und Kies', 'Schotter', 'Steiniger Aushub'],
    gehoertNichtRein: ['Bauschutt', 'Wurzelstöcke', 'Baustellenabfall', 'Belasteter Boden ohne Analyse'],
    dichte: 'schwer',
    hinweis: 'Bei Verdacht auf Belastung bitte vorher anrufen. Dann klären wir die nötige Deklaration gemeinsam.',
  },
  {
    id: 'gemischt',
    empfehlung: 'abroll-20',
    name: 'Gemischte Bau- und Abbruchabfälle',
    kurz: 'Baumischabfall',
    icon: 'ph:stack-bold',
    beschreibung:
      'Der klassische Baustellencontainer, wenn sich Materialien nicht sauber trennen lassen. Auf unserer Anlage wird nachsortiert und der Wertstoffanteil zurückgewonnen.',
    gehoertRein: ['Holz und Verpackung', 'Kunststoff und Folien', 'Dämmstoffe', 'Tapeten und Bodenbeläge', 'Kleinmengen Bauschutt'],
    gehoertNichtRein: ['Asbest und künstliche Mineralfasern', 'Farben, Lacke, Chemikalien', 'Elektrogeräte', 'Altreifen'],
    dichte: 'leicht',
  },
  {
    id: 'holz',
    empfehlung: 'abroll-20',
    name: 'Altholz',
    kurz: 'Holz',
    icon: 'ph:tree-evergreen-bold',
    beschreibung:
      'Von der Dachlatte bis zur Palette. Sortenrein gesammeltes Holz geht in die stoffliche oder energetische Verwertung.',
    gehoertRein: ['Bauholz und Latten', 'Paletten und Kisten', 'Spanplatten', 'Türblätter und Zargen', 'Schalholz'],
    gehoertNichtRein: ['Imprägnierte Bahnschwellen', 'Holz mit Teeranstrich', 'Mineralischer Bauschutt'],
    dichte: 'leicht',
  },
  {
    id: 'asphalt',
    empfehlung: 'absetz-6',
    name: 'Bitumenasphaltdecken',
    kurz: 'Asphalt',
    icon: 'ph:road-horizon-bold',
    beschreibung:
      'Straßenaufbruch aus dem Straßen- und Tiefbau. Sehr schwer, deshalb zählt hier die Tragfähigkeit der Mulde und nicht ihr Volumen.',
    gehoertRein: ['Asphaltaufbruch', 'Fräsgut', 'Bitumengebundene Tragschichten'],
    gehoertNichtRein: ['Teerhaltiger Straßenaufbruch ohne Deklaration', 'Beton', 'Erdaushub'],
    dichte: 'schwer',
    hinweis:
      'Teerhaltiges Material ist ein gefährlicher Abfall und wird getrennt abgewickelt. Rufen Sie im Zweifel vorher an.',
  },
  {
    id: 'gefaehrlich',
    empfehlung: 'absetz-3',
    name: 'Gefährliche Abfälle',
    kurz: 'Gefahrgut',
    icon: 'ph:warning-octagon-bold',
    beschreibung:
      'Als Entsorgungsfachbetrieb übernehmen wir auch gefährliche Abfälle und führen den elektronischen Nachweis nach eANV für Sie.',
    gehoertRein: ['Kontaminierter Boden nach Analyse', 'Teerhaltiger Straßenaufbruch', 'Belastete Bauabfälle'],
    gehoertNichtRein: [],
    dichte: 'schwer',
    hinweis:
      'Gefährliche Abfälle werden immer im Vorfeld besprochen. Rufen Sie an, bevor Sie einen Container bestellen.',
  },
];

export function abfallart(id: string): Abfallart | undefined {
  return abfallarten.find((a) => a.id === id);
}
