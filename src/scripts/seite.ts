/**
 * Seitenweites Verhalten: Einblenden beim Scrollen, Erscheinungsbild,
 * mobiles Menü, Schattenkante am Header.
 *
 * Alles läuft über IntersectionObserver. Es gibt bewusst keinen
 * scroll-Listener am window, der bei jedem Frame feuern würde.
 */

const wurzel = document.documentElement;

/* ---- Einblenden beim Scrollen ------------------------------------- */
function einblendenStarten(): void {
  const elemente = document.querySelectorAll<HTMLElement>('[data-auf]');
  if (elemente.length === 0) return;

  const sparsam = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sparsam) {
    elemente.forEach((el) => el.classList.add('sichtbar'));
    return;
  }

  const beobachter = new IntersectionObserver(
    (eintraege) => {
      for (const eintrag of eintraege) {
        if (!eintrag.isIntersecting) continue;
        eintrag.target.classList.add('sichtbar');
        beobachter.unobserve(eintrag.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );

  elemente.forEach((el) => beobachter.observe(el));
}

/* ---- Helles und dunkles Erscheinungsbild --------------------------- */
function modusStarten(): void {
  const schalter = document.getElementById('modus-schalter');
  if (!schalter) return;

  schalter.addEventListener('click', () => {
    const jetztDunkel = wurzel.classList.toggle('dark');
    try {
      localStorage.setItem('schuemmer-modus', jetztDunkel ? 'dunkel' : 'hell');
    } catch {
      /* Ohne Speicher gilt die Wahl nur für diese Seite. */
    }
  });
}

/* ---- Mobiles Menü -------------------------------------------------- */
function menueStarten(): void {
  const schalter = document.getElementById('menue-schalter');
  const menue = document.getElementById('mobilmenue');
  if (!schalter || !menue) return;

  const schliessen = () => {
    menue.hidden = true;
    schalter.setAttribute('aria-expanded', 'false');
    schalter.setAttribute('aria-label', 'Menü öffnen');
  };

  schalter.addEventListener('click', () => {
    const offen = schalter.getAttribute('aria-expanded') === 'true';
    if (offen) {
      schliessen();
      return;
    }
    menue.hidden = false;
    schalter.setAttribute('aria-expanded', 'true');
    schalter.setAttribute('aria-label', 'Menü schließen');
  });

  // Nach einem Sprung zu einem Anker soll das Menü nicht offen stehen bleiben.
  menue.addEventListener('click', (ereignis) => {
    if ((ereignis.target as HTMLElement).closest('a')) schliessen();
  });

  document.addEventListener('keydown', (ereignis) => {
    if (ereignis.key === 'Escape' && !menue.hidden) {
      schliessen();
      schalter.focus();
    }
  });

  // Beim Wechsel auf große Bildschirme übernimmt die normale Navigation.
  const gross = window.matchMedia('(min-width: 1024px)');
  gross.addEventListener('change', (ereignis) => {
    if (ereignis.matches) schliessen();
  });
}

/* ---- Schattenkante am Header --------------------------------------- */
function kopfschattenStarten(): void {
  const kopf = document.getElementById('kopf');
  if (!kopf) return;

  const wache = document.createElement('div');
  wache.setAttribute('aria-hidden', 'true');
  wache.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none';
  document.body.prepend(wache);

  new IntersectionObserver(
    ([eintrag]) => {
      if (eintrag.isIntersecting) kopf.removeAttribute('data-gescrollt');
      else kopf.setAttribute('data-gescrollt', '');
    },
    { threshold: 0 },
  ).observe(wache);
}

einblendenStarten();
modusStarten();
menueStarten();
kopfschattenStarten();
