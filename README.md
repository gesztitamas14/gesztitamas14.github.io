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