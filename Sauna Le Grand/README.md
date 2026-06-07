# Le Grand App

Mobiele web-app (prototype) voor **Saunaclub Le Grand**, Zundert. Donker + goud huisstijl, volledig in het Nederlands, met 18+ toegangspoort.

> Statische app — geen build-stap nodig. Open `index.html` of host de map op een statische host (Vercel, Netlify, GitHub Pages).

## Functies

- **Intro / 18+ poort** met goud logo-reveal (3 stijlen: foto, stoom, minimaal — instelbaar via het Tweaks-paneel).
- **Home** — hero, snelkoppelingen, wie is vandaag aanwezig, faciliteiten, uitgelicht tarief, events, webshop-teaser, reviews-slider, locatie.
- **Onze dames** — overzicht (respectvol; foto's via sleepvakken) + detailpagina met talen, herkomst en aanwezige dagen.
- **Events** — Strippers Night, BBQ Time, Orange Summer Party, met detailpagina + reserveer-CTA.
- **Webshop** — productoverzicht (badjas, slippers, combideal), productpagina, **werkende winkelmand** (aantallen/verwijderen), **afrekenen** met bezorgformulier en orderbevestiging.
- **Meer** — hub naar Reserveren, Faciliteiten, Tarieven, Openingstijden, **Vacatures** (met sollicitatie) en contact.
- **Reserveren** — volledige flow: datum → tijd → arrangement → bevestiging.
- **Tweaks-paneel** — intro-stijl, goud-tint en lettertype live aanpasbaar.

## Structuur

```
index.html              ← entry point (kopie van "Le Grand App.html")
Le Grand App.html       ← zelfde app (werkbestand in de editor)
app/
  app.jsx               ← shell: navigatie (5 tabs), overlay-stack, winkelmand-state
  data.jsx              ← alle content (dames, events, producten, tarieven, reviews, venue)
  ui.jsx                ← gedeelde UI (knoppen, kaarten, tags, foto-slot, headers)
  icons.jsx             ← line-icons
  opening.jsx           ← intro + 18+ poort
  reviews-slider.jsx    ← Google-reviews carousel
  screen-*.jsx          ← schermen (home, dames, events, shop, vacatures, reserveren, info, meer)
  ios-frame.jsx         ← iPhone-bezel (starter component)
  image-slot.js         ← sleep-je-eigen-foto component
  tweaks-panel.jsx      ← Tweaks-paneel (starter component)
  assets/               ← logo + sfeerbeeld
  fonts/                ← (Palatino is een systeemfont; deze fonts worden niet meer gebruikt)
reference/              ← oorspronkelijke design-export (ter referentie)
```

## Lokaal draaien

Open `index.html` met een statische server (vanwege relatieve scripts):

```bash
npx serve .
# of
python3 -m http.server
```

## Deployen naar Vercel

1. Push deze repo naar GitHub.
2. Vercel → **Add New → Project** → importeer de repo.
3. Framework preset: **Other** · Build command: *leeg* · Output directory: `.`
4. Deploy → open de URL op je telefoon.

## Let op

- **Foto's** in de sleepvakken (`<image-slot>`) blijven alleen bewaard binnen de oorspronkelijke editor; op een externe host zijn ze read-only. Vervang ze door echte beelden in de `src`-attributen of bouw een eigen upload-backend.
- **Reviews** zijn representatieve placeholders — vervang met echte Google-reviews.
- React/Babel laden via CDN; voor productie kun je dit later pre-compilen.
- 18+ — uitsluitend voor volwassenen.
