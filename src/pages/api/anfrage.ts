import type { APIRoute } from 'astro';
import { firma } from '~/lib/firma';

/**
 * Zugriff auf die Cloudflare-Bindungen. Seit Astro 6 kommen sie aus
 * `cloudflare:workers` und nicht mehr aus `Astro.locals.runtime.env`.
 *
 * Der Import läuft absichtlich zur Laufzeit und in einem try-Block: der
 * Entwicklungsserver von Astro startet ohne Cloudflare-Adapter, dort gibt
 * es dieses Modul nicht. Statt eines Serverfehlers landet der Besucher
 * dann auf der Kontaktseite mit einem Hinweis.
 */
type Versand = { send: (nachricht: Record<string, unknown>) => Promise<unknown> };

async function emailBindung(): Promise<Versand | undefined> {
  try {
    const modul = await import(/* @vite-ignore */ 'cloudflare:workers');
    return (modul.env as unknown as Record<string, unknown>).EMAIL as Versand | undefined;
  } catch {
    return undefined;
  }
}

/**
 * Nimmt das Anfrageformular entgegen und schickt es per E-Mail an den
 * Betrieb. Läuft als einzige Route dieser Seite zur Laufzeit auf
 * Cloudflare, alles andere ist vorgerendertes HTML.
 *
 * Der Versand geht über die Email-Sending-Bindung von Cloudflare. Dafür
 * muss die Domain einmalig freigeschaltet sein, siehe README.
 */
export const prerender = false;

/** Reihenfolge und Beschriftung der Felder in der E-Mail. */
const felder: { name: string; beschriftung: string }[] = [
  { name: 'abfallart', beschriftung: 'Abfallart' },
  { name: 'container', beschriftung: 'Container' },
  { name: 'ort', beschriftung: 'Ort' },
  { name: 'strasse', beschriftung: 'Straße' },
  { name: 'termin', beschriftung: 'Wunschtermin' },
  { name: 'stellplatz', beschriftung: 'Stellplatz' },
  { name: 'name', beschriftung: 'Name' },
  { name: 'firma', beschriftung: 'Firma' },
  { name: 'telefon', beschriftung: 'Telefon' },
  { name: 'email', beschriftung: 'E-Mail' },
  { name: 'nachricht', beschriftung: 'Anmerkungen' },
];

const MAX_LAENGE = 2000;

function saeubern(wert: FormDataEntryValue | null): string {
  if (typeof wert !== 'string') return '';
  return wert.replace(/\s+/g, ' ').trim().slice(0, MAX_LAENGE);
}

function maskieren(text: string): string {
  return text.replace(/[<>&"]/g, (z) => `&#${z.charCodeAt(0)};`);
}

function zurueck(pfad: string, status: string): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: `${pfad}?status=${status}` },
  });
}

export const POST: APIRoute = async ({ request, url }) => {
  let daten: FormData;
  try {
    daten = await request.formData();
  } catch {
    return zurueck('/kontakt', 'fehler');
  }

  // Versteckt im Formular. Nur automatische Ausfüller schreiben hier etwas
  // hinein, deshalb wird ohne Fehlermeldung abgebrochen.
  if (saeubern(daten.get('bot-feld'))) {
    return zurueck('/danke', 'ok');
  }

  const werte = new Map<string, string>();
  for (const feld of felder) werte.set(feld.name, saeubern(daten.get(feld.name)));

  const email = werte.get('email') ?? '';
  const pflichtErfuellt =
    (werte.get('name') ?? '').length > 1 &&
    (werte.get('telefon') ?? '').length > 4 &&
    /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email) &&
    daten.get('datenschutz') !== null;

  if (!pflichtErfuellt) {
    return zurueck('/kontakt', 'unvollstaendig');
  }

  // Das Datumsfeld liefert 2026-08-20. In der E-Mail soll es lesbar sein.
  const termin = werte.get('termin') ?? '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(termin)) {
    const [jahr, monat, tag] = termin.split('-');
    werte.set('termin', `${tag}.${monat}.${jahr}`);
  }

  const zeilen = felder
    .map((feld) => ({ ...feld, wert: werte.get(feld.name) ?? '' }))
    .filter((feld) => feld.wert !== '');

  const betreff = `Containeranfrage${werte.get('ort') ? ` ${werte.get('ort')}` : ''} von ${werte.get('name')}`;

  const text = [
    'Neue Anfrage über die Website.',
    '',
    ...zeilen.map((z) => `${z.beschriftung}: ${z.wert}`),
    '',
    `Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}`,
    `Absenderseite: ${url.origin}`,
  ].join('\n');

  const html = `<!doctype html><html lang="de"><body style="margin:0;background:#f6f8fa;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#161d25">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dde3ea">
<tr><td style="background:#051b2e;padding:20px 24px">
  <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff">Neue Anfrage über die Website</p>
  <p style="margin:6px 0 0;font-size:13px;color:#a9c9e4">${maskieren(betreff)}</p>
</td></tr>
<tr><td style="padding:8px 24px 24px">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">
  ${zeilen
    .map(
      (z) => `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #eceff4;color:#4f5d6e;width:34%;vertical-align:top">${maskieren(z.beschriftung)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eceff4;font-weight:bold;vertical-align:top">${maskieren(z.wert)}</td>
    </tr>`,
    )
    .join('')}
  </table>
  <p style="margin:20px 0 0;font-size:13px;color:#6b7b8e">
    Antworten Sie einfach auf diese E-Mail, dann geht die Antwort direkt an
    ${maskieren(werte.get('name') ?? '')}.
  </p>
</td></tr>
</table></body></html>`;

  // Die Bindung fehlt nur, wenn Email Sending noch nicht eingerichtet ist.
  // Dann geht die Anfrage nicht verloren, sondern der Kunde bekommt eine
  // sichtbare Fehlermeldung mit der Telefonnummer.
  const versand = await emailBindung();

  if (!versand) {
    console.error('Email-Bindung EMAIL fehlt. Anfrage konnte nicht verschickt werden:', text);
    return zurueck('/kontakt', 'fehler');
  }

  try {
    await versand.send({
      to: firma.email,
      from: { email: `anfrage@${firma.email.split('@')[1]}`, name: 'Website Anfrage' },
      replyTo: { email, name: werte.get('name') },
      subject: betreff,
      text,
      html,
    });
  } catch (fehler) {
    console.error('Versand fehlgeschlagen:', fehler, text);
    return zurueck('/kontakt', 'fehler');
  }

  return zurueck('/danke', 'ok');
};

/** Ein direkter Aufruf der Adresse im Browser landet auf dem Formular. */
export const GET: APIRoute = () =>
  new Response(null, { status: 303, headers: { Location: '/kontakt' } });
