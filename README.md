# Prosjektdokumentasjon

## Innholdsfortegnelse

- [Introduksjon](#introduksjon)
- [Installasjon](#installasjon)
- [Prosess og utvikling](#prosess-og-utvikling)
- [Backend API Dokumentasjon](#Backend-API-Dokumentasjon)

## Introduksjon

_Dette prosjektet er en enkel bloggapplikasjon som tillater brukere å lese blogginnlegg og for administratorer å logge inn og opprette nye innlegg. 
Formålet med prosjektet er å demonstrere grunnleggende fullstack-utvikling med Node.js og Express for backend, og vanlig HTML, CSS, og JavaScript for frontend._

## Installasjon

_For å installere og kjøre prosjektet lokalt, følg disse stegene_

### Installere prosjektet

```bash
npm install express cors
```

### Kjøre prosjektet

```bash
npm node app.js
```

## Prosess og utvikling

_Prosjektet består av en enkel Express-server som håndterer API-forespørsler for å lese og opprette blogginnlegg, samt håndtere pålogging for administratorer. 
Frontend-delen er en enkel HTML-side som bruker JavaScript for å kommunisere med backend-APIet._

## Backend API Dokumentasjon
_Backend API-en består av følgende endepunkter:

GET /api/blogginnlegg
Henter alle blogginnlegg.

URL: /api/blogginnlegg
Metode: GET
Data-parametere: Ingen
Suksessrespons:
Kode: 200 OK
Innhold: En liste av blogginnlegg
Eksempel: curl http://localhost:5000/api/blogginnlegg


POST /api/blogginnlegg
Oppretter et nytt blogginnlegg. Krever at brukeren er logget inn som administrator.

URL: /api/blogginnlegg
Metode: POST
URL-parametere: Ingen
Data-parametere:
{
    "id": 1,
    "title": "Eksempel",
    "content": "Dette er eksempel blogginlegg",
    "dateCreated": "2024-03-09T13:46:16.489Z"
}
Suksessrespons:
Kode: 201 Created
Innhold: Detaljer om det opprettede innlegget


POST /api/login
Validerer pålogging for administrator.

URL: /api/login
Metode: POST
URL-parametere: Ingen
Data-parametere:
{
  "username": "[Admin]",
  "password": "[Gokstad2023]"
}
Suksessrespons:
Kode: 200 OK
Innhold: {"message": "Pålogging vellykket"}

Feilrespons:
Kode: 401 Unauthorized
Innhold: {"message": "Ugyldig brukernavn eller passord"}_