/**
 * Baustoffsortiment, übernommen aus der bestehenden Sortimentsliste.
 * Weitere Körnungen und Materialien auf Anfrage.
 */

export type Baustoff = {
  name: string;
  koernung?: string;
  hinweis?: string;
};

export type Baustoffgruppe = {
  id: string;
  name: string;
  icon: string;
  einleitung: string;
  bildKategorie: string;
  posten: Baustoff[];
};

export const baustoffgruppen: Baustoffgruppe[] = [
  {
    id: 'kies-sand',
    name: 'Kies und Sand',
    icon: 'ph:grains-bold',
    einleitung:
      'Die Grundlage für Fundament, Bettung und Estrich. Lose auf dem Kipper oder im BigBag bis vor die Haustür.',
    bildKategorie: 'baustoffe',
    posten: [
      { name: 'Bergkies' },
      { name: 'Betonkies', koernung: '0/16' },
      { name: 'Betonkies', koernung: '0/32' },
      { name: 'Rollkies', koernung: '16/32' },
      { name: 'Abdecksand', koernung: '0/1' },
      { name: 'Estrichsand', koernung: '0/2' },
      { name: 'Mauersand' },
      { name: 'Spielsand', hinweis: 'Fallschutzsand für Spielflächen' },
    ],
  },
  {
    id: 'splitt-schotter',
    name: 'Splitt und Schotter',
    icon: 'ph:diamonds-four-bold',
    einleitung:
      'Tragschicht, Drainage und Fugenmaterial. Von der feinen Einkehrung bis zum groben Wasserbaustein.',
    bildKategorie: 'baustoffe',
    posten: [
      { name: 'Kalkstein', koernung: '0/32' },
      { name: 'Kalkstein', koernung: '2/5' },
      { name: 'Basaltsplitt', koernung: '2/5' },
      { name: 'Basaltsplitt', koernung: '11/16' },
      { name: 'Basaltsplitt', koernung: '16/22' },
      { name: 'Basalt Einkehrsand', koernung: '0/2' },
      { name: 'Diabas', koernung: '5/8' },
      { name: 'Grauwacke', koernung: '60/120' },
    ],
  },
  {
    id: 'zierschotter',
    name: 'Zierkies und Naturstein',
    icon: 'ph:sparkle-bold',
    einleitung:
      'Für Beet, Weg und Sichtachse. Farbige Körnungen und Findlinge, die eine Fläche erst zum Gestaltungselement machen.',
    bildKategorie: 'baustoffe',
    posten: [
      { name: 'Yellow Sun', koernung: '16/32' },
      { name: 'Ardenner Blaustein', koernung: '14/20' },
      { name: 'Ardenner Blaustein', koernung: '32/63' },
      { name: 'Ardenner Wasserbausteine' },
      { name: 'Findlinge', hinweis: 'Einzelstücke nach Verfügbarkeit' },
      { name: 'Basalt für Gabionen', koernung: '50/120' },
    ],
  },
  {
    id: 'garten',
    name: 'Garten und Landschaft',
    icon: 'ph:plant-bold',
    einleitung:
      'Alles, was wachsen soll oder wachsen lassen soll. Auch in haushaltsüblichen Mengen als Sackware.',
    bildKategorie: 'baustoffe',
    posten: [
      { name: 'Mutterboden', koernung: '0/8' },
      { name: 'Pflanzensubstratboden' },
      { name: 'Rindenmulch', koernung: '0/40', hinweis: 'lose' },
      { name: 'Rindenmulch', koernung: '10/25 mm', hinweis: '70 Liter Sack' },
      { name: 'Humus Kompost', koernung: '0/10 mm', hinweis: '40 Liter Sack' },
      { name: 'Blumen- und Pflanzenerde', hinweis: '40 Liter Sack' },
    ],
  },
  {
    id: 'recyclingbaustoff',
    name: 'Recyclingbaustoff',
    icon: 'ph:recycle-bold',
    einleitung:
      'Aus aufbereitetem Bauschutt der eigenen Anlage. Gütegesichert, günstiger als Primärmaterial und ohne neuen Eingriff in die Landschaft.',
    bildKategorie: 'recycling',
    posten: [
      { name: 'RCL Recyclingschotter', koernung: '0/32' },
      { name: 'RCL Recyclingschotter', koernung: '0/45' },
    ],
  },
  {
    id: 'sonstiges',
    name: 'Weiteres Sortiment',
    icon: 'ph:package-bold',
    einleitung: 'Was auf einer Baustelle oder im Hof sonst noch gebraucht wird.',
    bildKategorie: 'fuhrpark',
    posten: [
      { name: 'Brennholz', hinweis: 'lose in der Gitterbox' },
      { name: 'Gebrauchte Paletten', hinweis: 'Stückpreis auf Anfrage' },
    ],
  },
];

export const anzahlBaustoffe = baustoffgruppen.reduce(
  (summe, gruppe) => summe + gruppe.posten.length,
  0,
);
