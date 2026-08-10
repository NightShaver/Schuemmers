/**
 * Die fünf Leistungsbereiche. Reihenfolge ist die Reihenfolge auf der
 * Startseite und in der Navigation.
 */

export type Leistung = {
  id: string;
  name: string;
  navName: string;
  pfad: string;
  icon: string;
  /** Steht unter der Überschrift auf der Startseite. Kurz halten. */
  anriss: string;
  punkte: string[];
  bildKategorie: string;
};

export const leistungen: Leistung[] = [
  {
    id: 'container',
    name: 'Containerdienst',
    navName: 'Container',
    pfad: '/container',
    icon: 'ph:shipping-container-bold',
    anriss:
      'Absetz- und Abrollcontainer von 1,8 bis 40 m³. Gestellt, gewechselt und abgeholt, wenn es in Ihren Bauablauf passt.',
    punkte: [
      'Fünfzehn Größen für jede Stellfläche',
      'Übernahme gefährlicher Abfälle mit elektronischem Nachweis',
      'Beratung zur richtigen Trennung vor der Anlieferung',
    ],
    bildKategorie: 'container',
  },
  {
    id: 'baustoffe',
    name: 'Baustoffe',
    navName: 'Baustoffe',
    pfad: '/baustoffe',
    icon: 'ph:grains-bold',
    anriss:
      'Kies, Sand, Splitt, Mutterboden und Recyclingschotter. Geliefert mit eigenen Fahrzeugen oder zur Abholung bereit.',
    punkte: [
      'Vom Recyclingmaterial bis zum Edelsplitt',
      'Lieferung lose, im BigBag oder als Sackware',
      'Recyclingschotter aus eigener Aufbereitung',
    ],
    bildKategorie: 'baustoffe',
  },
  {
    id: 'recycling',
    name: 'Recyclinganlage',
    navName: 'Recycling',
    pfad: '/recycling',
    icon: 'ph:recycle-bold',
    anriss:
      'Eigene Aufbereitung seit 2016. Aus Bauschutt wird wieder Baustoff, statt ihn auf einer Deponie zu verlieren.',
    punkte: [
      'Sortierung und Separierung von Wertstoffen',
      'Störstoffe werden umweltgerecht ausgeschleust',
      'Prozesswasser wird aufbereitet und wiederverwendet',
    ],
    bildKategorie: 'recycling',
  },
  {
    id: 'entsorgung',
    name: 'Entsorgung und Annahme',
    navName: 'Entsorgung',
    pfad: '/entsorgung',
    icon: 'ph:recycle-bold',
    anriss:
      'Selbstanlieferung auf dem Recyclinghof, Abholung beim Kunden und die komplette Nachweisführung als Entsorgungsfachbetrieb.',
    punkte: [
      'Annahme für Haushalt, Handwerk, Handel und Industrie',
      'Verwiegung auf geeichter Waage',
      'Nachweise nach Kreislaufwirtschaftsgesetz',
    ],
    bildKategorie: 'gelaende',
  },
  {
    id: 'bigbags',
    name: 'BigBags und Transporte',
    navName: 'BigBags',
    pfad: '/bigbags',
    icon: 'ph:bag-bold',
    anriss:
      'Für Kleinmengen, wenn kein Container auf das Grundstück passt. Dazu Baustoff-, Silo- und Maschinentransporte bis 93 m³.',
    punkte: [
      'BigBag befüllt mit Baustoff Ihrer Wahl',
      'Lieferung und Abholung nach Absprache',
      'Transporte für Stapler, Minibagger und Schüttgut',
    ],
    bildKategorie: 'bigbags',
  },
];

export function leistung(id: string): Leistung | undefined {
  return leistungen.find((l) => l.id === id);
}
