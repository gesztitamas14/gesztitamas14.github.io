# Gestware weboldal

A Gestware (Geszti Tamás e.v.) weboldala: https://gestware.web.app. Statikus HTML és CSS, build nélkül, Firebase Hostingon.

```
index.html
en/index.html
adatkezeles.html
en/privacy.html
404.html
assets/css/style.css
assets/js/main.js 
assets/fonts/
assets/img/
demo/             mintaoldalak (egy-egy önálló index.html, közös betűk: demo/fonts/)
pontjo/           a Pont jó app jogi oldalai (ÁSZF, adatvédelem) – másolat, lásd lent
firebase.json 
.firebaserc 
```

## Helyi futtatás

Az útvonalak gyökér-relatívak (`/assets/...`), ezért fájlként megnyitva nem működnek, kell egy szerver:

```
python -m http.server 8000
```

vagy `npx serve .`, utána http://localhost:8000.

## Közzététel (Firebase Hosting)

Feltöltés (minden módosítás után):

```
npx firebase-tools deploy --only hosting
```

Utána az oldal a https://gestware.web.app (és a https://gestware.firebaseapp.com) címen él.

## A Pont jó jogi oldalai

A `pontjo/` fájljai az app repójának `web/legal/` mappájából jönnek (ott a forrás,
az app ugyanezeket mutatja offline). Ha a jogi szöveg változik, másold át, majd deploy:

```
cp ../felveteli-gyakorlo/web/legal/{adatvedelem.html,aszf.html,legal.css} pontjo/
```

Címek: https://gestware.web.app/pontjo/adatvedelem.html (ez van a Play Console-ban)
és https://gestware.web.app/pontjo/aszf.html.

## Mintaoldalak

A `demo/` mappában kitalált vállalkozások demóoldalai vannak (`noindex`, nincsenek a sitemapben). Mindegyik egyetlen statikus `index.html`, inline CSS-sel és JS-sel; a betűk a `demo/fonts/fonts.css`-ből jönnek (fontsource, OFL). A főoldal előnézeti képei: `assets/img/demo-*.jpg` (1280×800-as nézet, 0,75-ös skálával).
