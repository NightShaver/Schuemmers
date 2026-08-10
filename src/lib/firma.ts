/**
 * Einzige Quelle für alle Firmendaten.
 *
 * Telefonnummer, Adresse oder Öffnungszeiten ändern sich? Nur hier anpassen.
 * Header, Footer, Kontaktseite, Ortsseiten und die strukturierten Daten für
 * Google ziehen alle aus diesem Objekt.
 */

export const firma = {
  name: 'Schümmer Containerdienst',
  nameLang: 'Peter Schümmer Container & Entsorgungsdienste e.K.',
  inhaber: 'Michael Schümmer',
  claim: 'Kompetenz in Entsorgung',

  strasse: 'Albertstraße 63a',
  plz: '52249',
  ort: 'Eschweiler',
  land: 'Deutschland',
  landCode: 'DE',

  /** Erste Nummer ist die überall sichtbare Hauptnummer. */
  telefone: [
    { anzeige: '02402 29915', wahl: '+4924029915', label: 'Zentrale Eschweiler' },
    { anzeige: '02403 29915', wahl: '+4924039915', label: 'Zweitanschluss' },
  ],
  fax: '02402 84204',
  email: 'info@schuemmer-containerdienst.de',

  oeffnungszeiten: [
    { tage: 'Montag bis Freitag', zeit: '07:00 bis 17:00 Uhr', tageKurz: 'Mo-Fr', von: '07:00', bis: '17:00' },
    { tage: 'Samstag', zeit: '07:00 bis 13:00 Uhr', tageKurz: 'Sa', von: '07:00', bis: '13:00' },
  ],
  /** Betrieblich wichtig genug, um überall neben den Zeiten zu stehen. */
  hinweisWaage: 'Letztes Einwiegen 15 Minuten vor Schließung',

  gegruendet: 1966,
  recyclingSeit: 2016,

  /** Handelsregister und Steuerdaten aus dem bestehenden Impressum. */
  handelsregister: 'HRA 5885',
  registergericht: 'Amtsgericht Aachen',
  ustId: 'DE 242771276',

  /** Über Nominatim für Albertstraße 63a, 52249 Eschweiler bestätigt. */
  geo: { breite: 50.781379, laenge: 6.2701637 },
  kartenSuche: 'Albertstraße 63a, 52249 Eschweiler',

  extern: {
    containerShop: 'https://www.baulogistik-online.de/',
    bigbagShop: 'https://www.der-sack.de/',
  },
} as const;

export const telefonHaupt = firma.telefone[0];

export const adresseEinzeilig = `${firma.strasse}, ${firma.plz} ${firma.ort}`;

export const kartenLink = `https://www.google.com/maps?q=${encodeURIComponent(firma.kartenSuche)}`;

export const kartenEinbettung = `https://www.google.com/maps?q=${encodeURIComponent(
  firma.kartenSuche,
)}&output=embed`;

/** Volle Jahre seit der Gründung, damit im Text keine Zahl veraltet. */
export const jahreErfahrung = new Date().getFullYear() - firma.gegruendet;
