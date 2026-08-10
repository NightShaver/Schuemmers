/**
 * Baut eine rein statische Fassung der Seite, wie GitHub Pages sie
 * ausliefern kann.
 *
 * Unterschiede zum normalen Build:
 * - Kein Cloudflare-Worker. Die Route /api/anfrage wird für die Dauer des
 *   Builds beiseitegelegt, weil sie einen Server bräuchte.
 * - Das Anfrageformular öffnet stattdessen das E-Mail-Programm des
 *   Besuchers mit fertig ausgefüllter Nachricht.
 * - Die Testfassung wird für Suchmaschinen gesperrt, damit sie nicht
 *   gegen die echte Seite antritt.
 *
 * Aufruf:
 *   node scripts/pages-bauen.mjs
 *   node scripts/pages-bauen.mjs --basis /name-des-repos
 *
 * Die zweite Form ist nötig, wenn die Seite unter
 * benutzername.github.io/name-des-repos liegt und nicht unter einer
 * eigenen Domain. Alle Verweise werden danach umgeschrieben.
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const API_ORDNER = join('src', 'pages', 'api');
const API_PARKPLATZ = join('src', '_api-pause');
const AUSGABE = 'dist';

const basisIndex = process.argv.indexOf('--basis');
let basis = basisIndex > -1 ? (process.argv[basisIndex + 1] ?? '') : '';

// Git Bash unter Windows macht aus einem führenden Schrägstrich einen
// Laufwerkspfad wie C:/Program Files/Git/name. Dann zählt nur das letzte
// Stück. Deshalb ist `--basis name` ohne Schrägstrich die sichere Form.
if (/^[A-Za-z]:[\\/]/.test(basis)) basis = basis.split(/[\\/]/).pop() ?? '';
basis = basis.replace(/^\/+|\/+$/g, '');
if (basis) basis = `/${basis}`;

async function alleDateien(verzeichnis) {
  const gefunden = [];
  for (const eintrag of await readdir(verzeichnis, { withFileTypes: true })) {
    const pfad = join(verzeichnis, eintrag.name);
    if (eintrag.isDirectory()) gefunden.push(...(await alleDateien(pfad)));
    else gefunden.push(pfad);
  }
  return gefunden;
}

/**
 * Setzt den Unterpfad vor alle Verweise, die an der Wurzel beginnen.
 * Ausgenommen sind Adressen mit Schema und protokollrelative Angaben,
 * sowie Pfade, die den Unterpfad bereits tragen.
 */
function pfadeUmschreiben(inhalt) {
  const schonGesetzt = new RegExp(`^${basis}(/|$)`);
  return inhalt.replace(
    /(\s(?:href|src|action|content)=")\/(?!\/)([^"]*)"/g,
    (treffer, davor, rest) => (schonGesetzt.test(`/${rest}`) ? treffer : `${davor}${basis}/${rest}"`),
  )
    // srcset trägt mehrere Adressen in einer Angabe.
    .replace(/(\ssrcset=")([^"]+)"/g, (_, davor, liste) => {
      const neu = liste
        .split(',')
        .map((teil) => teil.trim())
        .map((teil) => (teil.startsWith('/') && !schonGesetzt.test(teil) ? `${basis}${teil}` : teil))
        .join(', ');
      return `${davor}${neu}"`;
    })
    // Schriften und Bilder aus dem Stylesheet.
    .replace(/url\((["']?)\/(?!\/)/g, (_, anfuehrung) => `url(${anfuehrung}${basis}/`);
}

console.log('[pages] Räume das fertige Verzeichnis auf.');
await rm(AUSGABE, { recursive: true, force: true });

const apiVorhanden = existsSync(API_ORDNER);
if (apiVorhanden) {
  console.log('[pages] Lege die Formularroute für diesen Build beiseite.');
  await rm(API_PARKPLATZ, { recursive: true, force: true });
  await rename(API_ORDNER, API_PARKPLATZ);
}

try {
  console.log('[pages] Baue.');
  execFileSync('npx', ['astro', 'build'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, SCHUEMMER_STATISCH: 'ja' },
  });
} finally {
  if (apiVorhanden) {
    await rename(API_PARKPLATZ, API_ORDNER);
    console.log('[pages] Formularroute zurückgelegt.');
  }
}

// GitHub Pages würde den Ordner sonst durch Jekyll schicken und alles
// verwerfen, was mit einem Unterstrich beginnt. Das trifft _astro.
await writeFile(join(AUSGABE, '.nojekyll'), '');

// Die Testfassung soll nicht in den Suchergebnissen auftauchen.
await writeFile(join(AUSGABE, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

if (basis) {
  console.log(`[pages] Setze ${basis} vor alle Verweise.`);
  let geaendert = 0;
  for (const pfad of await alleDateien(AUSGABE)) {
    if (!['.html', '.css', '.js', '.xml'].includes(extname(pfad))) continue;
    const alt = await readFile(pfad, 'utf8');
    const neu = pfadeUmschreiben(alt);
    if (neu !== alt) {
      await writeFile(pfad, neu);
      geaendert += 1;
    }
  }
  console.log(`[pages] ${geaendert} Dateien angepasst.`);
}

// Aufräumen der ungenutzten Originalbilder, wie beim normalen Build.
execFileSync('node', [join('scripts', 'aufraeumen.mjs')], { stdio: 'inherit' });

console.log('');
console.log('[pages] Fertig. Der Ordner dist/ kann jetzt zu GitHub Pages.');
console.log('[pages] Achtung: Das Formular verschickt hier nichts über einen Server,');
console.log('[pages] sondern öffnet das E-Mail-Programm des Besuchers.');
