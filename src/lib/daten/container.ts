/**
 * Containerdaten. Volumen und Maße stammen aus der bestehenden
 * Größenübersicht von schuemmer-containerdienst.de.
 *
 * `passtZu` und `typisch` sind Orientierungshilfen für den Konfigurator,
 * keine Zusage. Die verbindliche Empfehlung kommt weiterhin aus der
 * Beratung am Telefon.
 */

export type Bauart = 'absetz' | 'abroll';

export type Container = {
  id: string;
  bauart: Bauart;
  volumen: number;
  hoehe: number;
  breite: number;
  tiefe: number;
  /** Abweichende Maße der tiefen Ausführung, falls vorhanden. */
  tiefeAusfuehrung?: { hoehe: number; tiefe: number };
  deckel?: boolean;
  /** Schlüssel aus abfallarten.ts */
  passtZu: string[];
  typisch: string;
};

export const container: Container[] = [
  {
    id: 'absetz-1-8',
    bauart: 'absetz',
    volumen: 1.8,
    hoehe: 800,
    breite: 1000,
    tiefe: 1000,
    passtZu: ['bauschutt', 'erdaushub', 'gefaehrlich'],
    typisch: 'Kleinmengen schwerer Materialien, passt in enge Hofeinfahrten',
  },
  {
    id: 'absetz-3',
    bauart: 'absetz',
    volumen: 3,
    hoehe: 950,
    breite: 2000,
    tiefe: 2450,
    deckel: true,
    passtZu: ['bauschutt', 'erdaushub', 'gemischt', 'asphalt', 'gefaehrlich'],
    typisch: 'Badsanierung, kleine Abbrucharbeiten, Fliesen und Estrich',
  },
  {
    id: 'absetz-4',
    bauart: 'absetz',
    volumen: 4,
    hoehe: 1000,
    breite: 1600,
    tiefe: 2950,
    deckel: true,
    passtZu: ['bauschutt', 'erdaushub', 'gemischt', 'holz', 'asphalt'],
    typisch: 'Terrassenabriss, Gartenumbau, kleinere Renovierung',
  },
  {
    id: 'absetz-6',
    bauart: 'absetz',
    volumen: 6,
    hoehe: 1350,
    breite: 1700,
    tiefe: 3250,
    tiefeAusfuehrung: { hoehe: 1400, tiefe: 3500 },
    deckel: true,
    passtZu: ['bauschutt', 'erdaushub', 'gemischt', 'holz', 'asphalt'],
    typisch: 'Dachausbau, Innenausbau, Estrich herausnehmen',
  },
  {
    id: 'absetz-7',
    bauart: 'absetz',
    volumen: 7,
    hoehe: 1400,
    breite: 1700,
    tiefe: 4200,
    tiefeAusfuehrung: { hoehe: 1500, tiefe: 4250 },
    deckel: true,
    passtZu: ['bauschutt', 'gemischt', 'holz', 'asphalt'],
    typisch: 'Kernsanierung einzelner Räume, Rückbau von Innenwänden',
  },
  {
    id: 'absetz-10',
    bauart: 'absetz',
    volumen: 10,
    hoehe: 1700,
    breite: 1700,
    tiefe: 4200,
    tiefeAusfuehrung: { hoehe: 1850, tiefe: 4250 },
    deckel: true,
    passtZu: ['bauschutt', 'gemischt', 'holz'],
    typisch: 'Dachstuhl, Trockenbau, größerer Umbau',
  },
  {
    id: 'absetz-15',
    bauart: 'absetz',
    volumen: 15,
    hoehe: 2020,
    breite: 1700,
    tiefe: 4800,
    passtZu: ['gemischt', 'holz'],
    typisch: 'Voluminöser leichter Abfall, wenn der Stellplatz schmal bleibt',
  },
  {
    id: 'abroll-10',
    bauart: 'abroll',
    volumen: 10,
    hoehe: 700,
    breite: 2300,
    tiefe: 6500,
    passtZu: ['bauschutt', 'erdaushub', 'asphalt'],
    typisch: 'Schwerer Bauschutt, niedrige Bordwand für bequemes Beladen',
  },
  {
    id: 'abroll-13',
    bauart: 'abroll',
    volumen: 13,
    hoehe: 1250,
    breite: 2350,
    tiefe: 4500,
    passtZu: ['bauschutt', 'erdaushub', 'gemischt', 'asphalt'],
    typisch: 'Kompakter Abrollcontainer für Baustellen mit engem Zuweg',
  },
  {
    id: 'abroll-15',
    bauart: 'abroll',
    volumen: 15,
    hoehe: 1200,
    breite: 2300,
    tiefe: 6600,
    passtZu: ['bauschutt', 'erdaushub', 'gemischt', 'holz'],
    typisch: 'Rohbau, Abbruch, laufende Baustellenversorgung',
  },
  {
    id: 'abroll-20',
    bauart: 'abroll',
    volumen: 20,
    hoehe: 1500,
    breite: 2300,
    tiefe: 6600,
    passtZu: ['bauschutt', 'gemischt', 'holz'],
    typisch: 'Der Standard auf der Baustelle, gemischte Bau- und Abbruchabfälle',
  },
  {
    id: 'abroll-24',
    bauart: 'abroll',
    volumen: 24,
    hoehe: 1500,
    breite: 2300,
    tiefe: 7000,
    passtZu: ['gemischt', 'holz'],
    typisch: 'Größere Baustellen mit hohem Durchsatz',
  },
  {
    id: 'abroll-30',
    bauart: 'abroll',
    volumen: 30,
    hoehe: 2250,
    breite: 2300,
    tiefe: 6600,
    passtZu: ['gemischt', 'holz'],
    typisch: 'Leichte, voluminöse Abfälle wie Verpackung, Dämmung, Holz',
  },
  {
    id: 'abroll-36',
    bauart: 'abroll',
    volumen: 36,
    hoehe: 2400,
    breite: 2300,
    tiefe: 6500,
    passtZu: ['gemischt', 'holz'],
    typisch: 'Gewerbliche Dauerstandplätze, Industrie und Handel',
  },
  {
    id: 'abroll-40',
    bauart: 'abroll',
    volumen: 40,
    hoehe: 2400,
    breite: 2400,
    tiefe: 7000,
    passtZu: ['gemischt', 'holz'],
    typisch: 'Maximales Volumen für Rückbau und Abbruch',
  },
];

export const bauarten: Record<Bauart, { name: string; kurz: string; erklaerung: string }> = {
  absetz: {
    name: 'Absetzcontainer',
    kurz: 'Absetz',
    erklaerung:
      'Wird mit zwei Auslegern senkrecht abgesetzt. Braucht wenig Rangierfläche und passt dadurch in Hofeinfahrten und auf schmale Stellplätze.',
  },
  abroll: {
    name: 'Abrollcontainer',
    kurz: 'Abroll',
    erklaerung:
      'Wird über eine Hakenanlage nach hinten abgerollt. Braucht mehr Platz in der Länge, fasst dafür deutlich mehr und lässt sich niedriger beladen.',
  },
};

export const kleinstesVolumen = Math.min(...container.map((c) => c.volumen));
export const groesstesVolumen = Math.max(...container.map((c) => c.volumen));

/** Container, die zu einer Abfallart passen, aufsteigend nach Volumen. */
export function containerFuer(abfallart: string): Container[] {
  return container
    .filter((c) => c.passtZu.includes(abfallart))
    .sort((a, b) => a.volumen - b.volumen);
}
