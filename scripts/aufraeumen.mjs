/**
 * Räumt nach dem Build unbenutzte Bilddateien aus `dist/_astro` weg.
 *
 * Hintergrund: Der Bilder-Autoimport in `src/lib/bilder.ts` lädt jede Datei
 * aus `src/assets/bilder`, damit Größe und Format bekannt sind. Vite kopiert
 * daraufhin auch die Originaldatei in den Build, selbst wenn ausgeliefert nur
 * die verkleinerten AVIF-, WebP- und JPG-Varianten werden. Bei Kamerafotos
 * sind das schnell mehrere Megabyte tote Fracht auf dem Webspace.
 *
 * Dieses Skript liest alle HTML-, CSS-, JS- und XML-Dateien im Build, sammelt
 * die tatsächlich referenzierten Dateinamen und löscht den Rest.
 */

import { existsSync } from 'node:fs';
import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

// Mit dem Cloudflare-Adapter liegt das ausgelieferte HTML unter
// dist/client, ohne Adapter direkt unter dist.
const BUILD = existsSync(join('dist', 'client')) ? join('dist', 'client') : 'dist';
const ASSETS = join(BUILD, '_astro');
const BILDENDUNGEN = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const TEXTENDUNGEN = new Set(['.html', '.css', '.js', '.xml', '.json', '.txt']);

async function alleDateien(verzeichnis) {
  const gefunden = [];
  for (const eintrag of await readdir(verzeichnis, { withFileTypes: true })) {
    const pfad = join(verzeichnis, eintrag.name);
    if (eintrag.isDirectory()) gefunden.push(...(await alleDateien(pfad)));
    else gefunden.push(pfad);
  }
  return gefunden;
}

const dateien = await alleDateien(BUILD);

// Referenzen aus dem ganzen Build einsammeln, also auch aus dem
// Worker-Code, gelöscht wird aber nur im Asset-Ordner.
const gesamterBuild = await alleDateien('dist');

const referenzen = new Set();
for (const pfad of gesamterBuild) {
  if (!TEXTENDUNGEN.has(extname(pfad).toLowerCase())) continue;
  const inhalt = await readFile(pfad, 'utf8');
  for (const treffer of inhalt.matchAll(/[A-Za-z0-9._-]+\.(?:jpe?g|png|webp|avif|gif)/g)) {
    referenzen.add(treffer[0]);
  }
}

let entfernt = 0;
let gespart = 0;

for (const pfad of dateien) {
  if (!pfad.startsWith(ASSETS)) continue;
  if (!BILDENDUNGEN.has(extname(pfad).toLowerCase())) continue;
  if (referenzen.has(basename(pfad))) continue;

  gespart += (await stat(pfad)).size;
  await unlink(pfad);
  entfernt += 1;
}

if (entfernt > 0) {
  const mb = (gespart / 1024 / 1024).toFixed(1);
  console.log(`[aufraeumen] ${entfernt} unbenutzte Bilddateien entfernt, ${mb} MB gespart.`);
} else {
  console.log('[aufraeumen] Keine unbenutzten Bilddateien gefunden.');
}
