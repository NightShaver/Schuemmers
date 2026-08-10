/**
 * Einsatzorte für die lokalen Landingpages.
 *
 * Jeder Ort bekommt eine eigene Seite unter /containerdienst/<slug>.
 * Die Entfernungen sind gerundete Fahrstrecken ab dem Betriebshof in
 * Eschweiler und dienen der Einordnung, nicht der Abrechnung.
 */

export type Ort = {
  slug: string;
  name: string;
  /** Zweiter Fall, für Sätze wie "im Norden von Aachen". */
  imOrt: string;
  kreis: string;
  entfernungKm: number;
  plz: string[];
  stadtteile: string[];
  /** Was an diesem Ort baulich typisch ist. Kein Füllsatz, sondern der Grund für die Seite. */
  lage: string;
  schwerpunkt: string;
};

export const orte: Ort[] = [
  {
    slug: 'eschweiler',
    name: 'Eschweiler',
    imOrt: 'in Eschweiler',
    kreis: 'Städteregion Aachen',
    entfernungKm: 0,
    plz: ['52249'],
    stadtteile: ['Weisweiler', 'Dürwiß', 'Kinzweiler', 'Röhe', 'Nothberg', 'Bergrath'],
    lage:
      'Unser Betriebshof steht an der Albertstraße, mitten im Einsatzgebiet. Kürzere Wege gibt es nirgends: Container stehen hier oft schon am Tag der Bestellung.',
    schwerpunkt:
      'Vom Reihenhaus in Dürwiß bis zur Gewerbefläche in Weisweiler stellen wir jede Größe. Selbstanlieferer fahren direkt auf den Recyclinghof.',
  },
  {
    slug: 'aachen',
    name: 'Aachen',
    imOrt: 'in Aachen',
    kreis: 'Städteregion Aachen',
    entfernungKm: 18,
    plz: ['52062', '52064', '52066', '52068', '52070', '52072', '52074', '52076', '52078', '52080'],
    stadtteile: ['Brand', 'Eilendorf', 'Haaren', 'Laurensberg', 'Burtscheid', 'Kornelimünster'],
    lage:
      'Altbaubestand, enge Innenstadtstraßen und viele Sanierungen im Bestand. Wo der Abrollcontainer nicht rangieren kann, kommt der Absetzcontainer oder der BigBag.',
    schwerpunkt:
      'Wohnungssanierung, Dachausbau und Ladenumbau. Für Stellplätze im öffentlichen Raum sagen wir Ihnen, welche Genehmigung die Stadt verlangt.',
  },
  {
    slug: 'stolberg',
    name: 'Stolberg',
    imOrt: 'in Stolberg',
    kreis: 'Städteregion Aachen',
    entfernungKm: 7,
    plz: ['52222', '52223', '52224'],
    stadtteile: ['Büsbach', 'Mausbach', 'Vicht', 'Breinig', 'Gressenich', 'Atsch'],
    lage:
      'Hanglagen, schmale Zufahrten und viel Altbestand aus der Industriegeschichte. Wir kennen die Straßen, in denen ein langer Abrollcontainer nicht mehr um die Kurve kommt.',
    schwerpunkt:
      'Bauschutt aus Sanierungen und Erdaushub aus Hangbebauung. Für Stellplätze an der Straße beraten wir zur passenden Bauart.',
  },
  {
    slug: 'alsdorf',
    name: 'Alsdorf',
    imOrt: 'in Alsdorf',
    kreis: 'Städteregion Aachen',
    entfernungKm: 9,
    plz: ['52477'],
    stadtteile: ['Mariadorf', 'Hoengen', 'Busch', 'Ofden', 'Broichweiden'],
    lage:
      'Ehemalige Bergbauflächen, die heute neu bebaut werden, dazu große Wohnsiedlungen aus den Nachkriegsjahren mit hohem Sanierungsbedarf.',
    schwerpunkt:
      'Rückbau und Neubau auf Konversionsflächen, Fassaden- und Dachsanierung im Bestand.',
  },
  {
    slug: 'wuerselen',
    name: 'Würselen',
    imOrt: 'in Würselen',
    kreis: 'Städteregion Aachen',
    entfernungKm: 12,
    plz: ['52146'],
    stadtteile: ['Broichweiden', 'Bardenberg', 'Euchen', 'Morsbach'],
    lage:
      'Viel Einfamilienhausbestand mit Gärten und Auffahrten. Absetzcontainer bis 10 m³ passen hier fast immer auf das eigene Grundstück.',
    schwerpunkt:
      'Gartenumbau, Terrassen, Anbauten und Kellerentrümpelung. Baustoffe liefern wir auf derselben Tour mit.',
  },
  {
    slug: 'herzogenrath',
    name: 'Herzogenrath',
    imOrt: 'in Herzogenrath',
    kreis: 'Städteregion Aachen',
    entfernungKm: 18,
    plz: ['52134'],
    stadtteile: ['Kohlscheid', 'Merkstein', 'Straß', 'Pannesheide'],
    lage:
      'Grenzlage zu den Niederlanden mit gewachsenen Ortskernen und Gewerbegebieten entlang der Bahn.',
    schwerpunkt:
      'Gewerbliche Dauerstandplätze und private Sanierung. Für laufende Baustellen tauschen wir Container nach festem Turnus.',
  },
  {
    slug: 'baesweiler',
    name: 'Baesweiler',
    imOrt: 'in Baesweiler',
    kreis: 'Städteregion Aachen',
    entfernungKm: 13,
    plz: ['52499'],
    stadtteile: ['Setterich', 'Oidtweiler', 'Beggendorf', 'Puffendorf'],
    lage:
      'Ländlich geprägt mit großen Grundstücken und landwirtschaftlichen Betrieben. Platz für große Abrollcontainer ist hier selten das Problem.',
    schwerpunkt:
      'Hofsanierung, Scheunenrückbau und Erdaushub. Baustofflieferung direkt auf das Grundstück.',
  },
  {
    slug: 'langerwehe',
    name: 'Langerwehe',
    imOrt: 'in Langerwehe',
    kreis: 'Kreis Düren',
    entfernungKm: 10,
    plz: ['52379'],
    stadtteile: ['Jüngersdorf', 'Merode', 'Schlich', 'D`horn', 'Stütgerloch'],
    lage:
      'Übergang von der Städteregion in den Kreis Düren, viel Bestand aus den 60er und 70er Jahren, der jetzt energetisch saniert wird.',
    schwerpunkt:
      'Dach und Fassade, Heizungstausch, Kellerentrümpelung. Kurze Anfahrt über die B264.',
  },
  {
    slug: 'dueren',
    name: 'Düren',
    imOrt: 'in Düren',
    kreis: 'Kreis Düren',
    entfernungKm: 20,
    plz: ['52349', '52351', '52353', '52355'],
    stadtteile: ['Birkesdorf', 'Gürzenich', 'Rölsdorf', 'Merken', 'Arnoldsweiler'],
    lage:
      'Industriestandort mit Papier- und Metallverarbeitung, dazu ein großer Wohnungsbestand aus dem Wiederaufbau.',
    schwerpunkt:
      'Gewerbliche Entsorgung mit regelmäßigem Containerwechsel und private Sanierungsprojekte.',
  },
];

export function ort(slug: string): Ort | undefined {
  return orte.find((o) => o.slug === slug);
}

/** Alle Orte außer dem übergebenen, für die Verlinkung untereinander. */
export function andereOrte(slug: string): Ort[] {
  return orte.filter((o) => o.slug !== slug);
}
