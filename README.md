# Gestware weboldal

A Gestware (Geszti Tamás e.v.) weboldala: https://gestware.web.app. Statikus HTML és CSS, build nélkül, Firebase Hostingon.

A Pont jó jogi oldalai nem itt vannak, hanem a `felveteli-gyakorlo` tároló GitHub Pages oldalán (`https://gesztitamas14.github.io/felveteli-gyakorlo/...`); az oldal teljes címmel linkel rájuk.

```
index.html            magyar főoldal
en/index.html         angol főoldal
adatkezeles.html      adatkezelési tájékoztató
en/privacy.html       privacy notice
404.html
assets/css/style.css
assets/js/main.js     kapcsolati űrlap
assets/fonts/         IBM Plex Sans / Mono (helyben, nem a Google Fonts-ról)
assets/img/
firebase.json         Firebase Hosting beállítás (gyorsítótár, fejlécek)
.firebaserc           a Firebase-projekt azonosítója
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

## Teendők élesítés előtt

- [ ] Kapcsolati űrlap (lent).
- [ ] Ha megvan a Google Play-link: a „Google Play — hamarosan” sor cseréje linkre mindkét főoldalon.
- [ ] `app-ads.txt` a gyökérbe, amikor megvan az AdMob-fiók (az AdMob adja a sort).
- [ ] Play Console weboldal-ellenőrzés: ha ellenőrző fájlt vagy `<meta>` címkét kér, az ide kerül (fájl a gyökérbe, címke a két főoldal `<head>`-jébe).

## Kapcsolati űrlap (Google Űrlap)

1. https://forms.google.com → új űrlap, pl. „Gestware – ajánlatkérések”.
2. Négy kérdés, ebben a sorrendben: `Név` (rövid válasz), `E-mail` (rövid válasz), `Téma` (rövid válasz), `Üzenet` (bekezdés).
3. *Válaszok → Összekapcsolás a Táblázatokkal*, és a *Beállítások*ban értesítés kérése új válaszról.
4. ⋮ → *Előre kitöltött link beszerzése* → minden mezőbe valami (`a`, `b`, `c`, `d`) → *Link beszerzése*. A linkben benne vannak az `entry.123456789` azonosítók.
5. `assets/js/main.js`, `GOOGLE_FORM`:
   - `action`: a link eleje `viewform` helyett `formResponse`-szal;
   - `fields`: a négy `entry.…` azonosító.

Amíg az `action`-ben `FORM_ID` szerepel, a küldés gomb előre kitöltött e-mailt nyit.
