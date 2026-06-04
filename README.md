# Universitet Kurser

En webbplats skapad med Angular där användaren kan söka bland kurser och skapa ett eget ramschema.

Länk till publicerad webbplats:


## Funktioner

* Visa kurser från en lokal JSON-fil
* Söka kurser på kurskod och kursnamn
* Filtrera kurser efter ämne
* Sortera kurser efter kurskod, kursnamn, poäng och ämne
* Visa antal kurser i aktuell sökning
* Lägga till kurser i ett eget ramschema
* Förhindra att samma kurs läggs till flera gånger
* Visa valda kurser i ramschemat
* Visa totalt antal högskolepoäng för valda kurser
* Ta bort kurser från ramschemat
* Spara ramschemat i `localStorage`
* Läsa in sparat ramschema vid sidladdning
* Responsiv layout för olika skärmstorlekar

Projektet är byggt för att uppfylla grundkraven i projektuppgiften.

## Tekniker

Projektet är byggt med:

* Angular
* TypeScript
* HTML
* SCSS
* Angular Router
* Angular Forms / `ngModel`
* Services
* `localStorage`
* JSON-data

## Sidor

Webbplatsen består av två huvudsidor:

* **Kurser** – sida där användaren kan söka, filtrera, sortera och lägga till kurser
* **Ramschema** – sida där användaren kan se sina valda kurser, total poäng och ta bort kurser

## Services

Projektet använder två services:

* `CourseService` – hämtar kursdata från JSON-filen
* `ScheduleService` – hanterar ramschemat och sparar data i `localStorage`

## Filstruktur

```
Projekt/
├── public/
│   └── miun_courses.json
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── header/
│   │   ├── models/
│   │   │   └── course.ts
│   │   ├── pages/
│   │   │   ├── courses/
│   │   │   └── schedule/
│   │   ├── services/
│   │   │   ├── course.ts
│   │   │   └── schedule.ts
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   └── app.ts
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   └── styles.scss
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Att köra projektet lokalt

Installera dependencies:

```
npm install
```

Starta utvecklingsservern:

```
ng serve
```

Öppna sedan projektet i webbläsaren:

```
http://localhost:4200/
```

## Bygga projektet

För att bygga projektet:

```
ng build
```
