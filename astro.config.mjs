// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// Der Cloudflare-Adapter bringt eine eigene Laufzeitumgebung mit, in der
// `astro dev` derzeit keine Seite rendert. Deshalb läuft der
// Entwicklungsserver ohne Adapter: schnelles Nachladen beim Tippen, alle
// Seiten sichtbar. Gebaut, geprüft und veröffentlicht wird mit Adapter,
// also über `npm run preview` und `npm run deploy`.
const istEntwicklungsserver = process.argv.includes('dev');

// Rein statischer Build, etwa für GitHub Pages. Dort gibt es keinen Server,
// also auch keinen Worker für das Anfrageformular. Siehe README.
const istStatisch = process.env.SCHUEMMER_STATISCH === 'ja';

export default defineConfig({
  site: 'https://www.schuemmer-containerdienst.de',
  trailingSlash: 'ignore',

  // Alle Seiten werden beim Bauen zu HTML. Einzige Ausnahme ist
  // /api/anfrage, die das Formular entgegennimmt und die Anfrage per
  // E-Mail verschickt. Diese Route markiert sich selbst mit
  // `prerender = false` und läuft dann als Cloudflare Worker.
  ...(istEntwicklungsserver || istStatisch
    ? {}
    : {
        adapter: cloudflare({
          // Bilder werden beim Bauen mit Sharp gerechnet, nicht zur Laufzeit.
          imageService: 'compile',
        }),
      }),
  build: {
    // Erzeugt /container/index.html statt /container.html.
    // Damit funktionieren die URLs auf jedem Hoster ohne Rewrite-Regeln.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Bilder aus src/assets/bilder werden beim Build optimiert.
    responsiveStyles: true,
  },
  integrations: [
    icon({ include: { ph: ['*'] } }),
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE' } },
      filter: (page) => !page.includes('/danke'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
