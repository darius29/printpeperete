# Audit producție — SDG Print & Design

**Data:** 2026-05-16
**Scop:** Checklist complet pentru lansarea în producție a site-ului printpeperete.com
**Abordare:** Sprint prioritizat — Critical → Legal → Completeness

---

## Grupa 1 — Critical

### 1. Contact Form funcțional via Resend

**Problema:** `handleSubmit` în `ContactForm.tsx` simulează un submit cu `setTimeout`. Nu există API route. Formularul nu trimite nimic.

**Soluția:**
- Instalare `resend` package
- Creare `src/app/api/contact/route.ts` — Next.js API Route (POST)
  - Validare server-side a câmpurilor (nume, telefon, email, serviciu, mesaj)
  - Trimitere email către `contact@printpeperete.com` via Resend SDK
  - Email include toate câmpurile + atașamentul (dacă există, trimis ca base64)
  - Return JSON `{ ok: true }` sau `{ ok: false, error: string }`
- Modificare `ContactForm.tsx`:
  - `handleSubmit` devine `async`, face `fetch('/api/contact', { method: 'POST', body: FormData })`
  - Gestionare răspuns: succes → stare `submitted`, eroare → mesaj inline
- Creare `.env.local` cu `RESEND_API_KEY=re_...`
- `.env.local` adăugat în `.gitignore` (verificat că nu e deja ignorat)

**Constrângeri:**
- Atașamentul (fișier design) se trimite ca atașament email, nu se stochează pe server
- Validare duplicată: client-side (existent) + server-side (nou)
- From: `onboarding@resend.dev` inițial (până se verifică domeniul `printpeperete.com` în Resend)

### 2. Favicon + App Icons

**Problema:** Nu există niciun fișier în `public/` la rădăcină. Favicon lipsă complet.

**Soluția:**
- Generare favicon SVG inline (inițiale "SDG" pe `#0C0C0C` cu `#F97316`)
- Conversie și export:
  - `public/favicon.ico` (32×32)
  - `public/icon.png` (512×512) — utilizat de Next.js App Router metadata
  - `public/apple-touch-icon.png` (180×180)
- Declarare în `layout.tsx` via `metadata.icons`:
  ```ts
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  }
  ```

### 3. OG Image

**Problema:** `DEFAULT_OG_IMAGE = /og-default.jpg` referit în `seo.ts` dar fișierul nu există în `public/`.

**Soluția:**
- Creare imagine OG (1200×630px) cu branding SDG: fundal `#0C0C0C`, titlu "SDG Print & Design", tagline, accent portocaliu
- Salvare ca `public/og-default.jpg`
- Nu se modifică `seo.ts` — path-ul e deja corect

### 4. Reparare link-uri `#`

**Problema:** Multiple link-uri `href="#"` care nu duc nicăieri.

**Mapping reparații:**

| Fișier | Link | Destinație |
|--------|------|-----------|
| `Footer.tsx` | "Pregătire fișiere" | `/servicii` |
| `Footer.tsx` | "Termeni și condiții" | `/termeni` |
| `Footer.tsx` | "Politică confidențialitate" | `/confidentialitate` |
| `Footer.tsx` | "Politică cookies" | `/cookies` |
| `Footer.tsx` | "ANPC" | `https://anpc.gov.ro` (external, `target="_blank"`) |
| `ContactForm.tsx` | "Termenii și condițiile" | `/termeni` |
| `BeforeAfterPreview.tsx` | link `#` (linia 301) | `/before-after` |

Paginile `/termeni`, `/confidentialitate`, `/cookies` vor fi create în Grupa 2 — link-urile se setează acum, paginile vin după.

---

## Grupa 2 — Legal

### 5. Pagini legale (3 pagini)

**Rute noi:**
- `src/app/termeni/page.tsx`
- `src/app/confidentialitate/page.tsx`
- `src/app/cookies/page.tsx`

**Design:** Server components, text pe fundal `--bg-void`, același Nav/Footer, fără componente complexe. Secțiuni cu `<h2>` Bebas Neue + paragrafe DM Sans. Nicio dependință nouă.

**Conținut adaptat pentru SDG Print & Design (firmă de print, România):**

**Termeni și condiții** — secțiuni:
- Obiectul contractului (servicii la comandă)
- Procesul de comandă și confirmare ofertă
- Prețuri și modalități de plată
- Termene de execuție și livrare
- Dreptul de retractare (limitat pentru produse personalizate, conform OUG 34/2014 art. 16 lit. c)
- Proprietatea intelectuală (designul clientului)
- Limitarea răspunderii
- Legea aplicabilă (drept român, instanțe Timișoara)

**Politică de confidențialitate** — secțiuni:
- Operator de date (SDG Print & Design, adresa Timișoara)
- Date colectate (formular contact: nume, telefon, email, locație)
- Scopul prelucrării (răspuns la cereri, emitere oferte)
- Temeiul legal (consimțământ / executarea contractului)
- Durata stocării
- Drepturi GDPR (acces, rectificare, ștergere, portabilitate, opoziție)
- Contact DPO: `contact@printpeperete.com`

**Politică cookies** — secțiuni:
- Ce sunt cookies
- Cookies utilizate (tehnice + analytics GA4)
- Cum se gestionează (browser settings + banner consent)
- Link spre Politica de confidențialitate

**SEO:** Fiecare pagină exportă `metadata` cu titlu și descriere relevante, `noindex: true` (pagini legale nu trebuie indexate).

### 6. Banner Cookie Consent (GDPR)

**Componentă:** `src/components/layout/CookieConsent.tsx` — client component

**Comportament:**
- Afișat la prima vizită (dacă `localStorage.getItem('cookie-consent')` e null)
- Dispare după alegere (animație slide-down)
- Stocare alegere: `localStorage.setItem('cookie-consent', 'accepted' | 'rejected')`
- Alegerea este expusă via un custom event `cookie-consent-change` (pentru GA4)

**Design:**
- Bar fix `position: fixed; bottom: 0`, z-index mai mare decât MobileBar — apare deasupra lui pe orice ecran. MobileBar are z-index 90, CookieConsent va folosi z-index 95.
- Fundal `--bg-elevated`, border-top `--bg-border`
- Text: "Folosim cookies pentru analytics și experiență optimă."
- Link `/cookies` inline în text
- Butoane: **Acceptă toate** (accent portocaliu) + **Refuză** (secundar gri)
- Fără librării externe

**Integrare în `layout.tsx`:** Import și adăugare după `<MobileBar />`

---

## Grupa 3 — Completeness

### 7. Google Analytics (GA4) condiționat

**Constrângere:** Nu se încarcă dacă userul a refuzat cookies.

**Implementare:**
- Creare `src/components/layout/Analytics.tsx` — client component
- Ascultă event-ul `cookie-consent-change` (sau citește `localStorage` la mount)
- Dacă `accepted`: injectează `<Script src="https://www.googletagmanager.com/gtag/js?id=..." strategy="afterInteractive" />`
- Measurement ID via `process.env.NEXT_PUBLIC_GA_ID`
- Adăugare în `layout.tsx`

**`.env.local`:**
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # placeholder, se completează când se creează contul GA4
```

**Note:** Infrastructura e completă. Când clientul creează contul GA4, adaugă ID-ul în environment variables pe hosting.

### 8. Pagini de eroare custom

**Fișiere noi:**
- `src/app/not-found.tsx` — pagina 404
- `src/app/error.tsx` — pagina de eroare generică (`"use client"`, primește `error` + `reset`)

**Design:** Consistent cu site-ul — număr eroare Bebas Neue mare (404/500), mesaj DM Sans, buton "Înapoi acasă" → `/`, buton "Încearcă din nou" pe `error.tsx`. Fundal `--bg-void`, fără Nav/Footer duplicat (Next.js folosește layout-ul existent pentru not-found).

### 9. Portofoliu — imagini lipsă

**Decizie:** Gradientele rămân ca placeholder estetic până clientul furnizează fotografii reale. Nu se modifică nimic.

Proiectele afectate (7): `id: 1, 2, 5, 6, 9, 10, 12`.

### 10. `next.config.js`

**Fișier nou:** `next.config.js` la rădăcina proiectului

**Configurare:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,  // elimină header X-Powered-By: Next.js din răspunsuri
}
module.exports = nextConfig
```

---

## Mediu și deployment

### Environment variables necesare

**`.env.local`** (local, nu se commitează):
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Pe hosting** (Vercel / orice platformă):
- `RESEND_API_KEY` — cheia Resend
- `NEXT_PUBLIC_GA_ID` — Measurement ID GA4 (de completat)

### `.gitignore`

Verificat că `.env.local` e ignorat. Dacă nu, se adaugă.

---

## Fișiere create/modificate

| Fișier | Acțiune |
|--------|---------|
| `src/app/api/contact/route.ts` | Creat |
| `src/components/contact/ContactForm.tsx` | Modificat |
| `src/components/layout/Footer.tsx` | Modificat (link-uri) |
| `src/components/home/BeforeAfterPreview.tsx` | Modificat (link #) |
| `src/app/layout.tsx` | Modificat (icons metadata, CookieConsent, Analytics) |
| `src/lib/seo.ts` | Neschimbat |
| `src/components/layout/CookieConsent.tsx` | Creat |
| `src/components/layout/Analytics.tsx` | Creat |
| `src/app/termeni/page.tsx` | Creat |
| `src/app/confidentialitate/page.tsx` | Creat |
| `src/app/cookies/page.tsx` | Creat |
| `src/app/not-found.tsx` | Creat |
| `src/app/error.tsx` | Creat |
| `public/favicon.ico` | Creat |
| `public/icon.png` | Creat |
| `public/apple-touch-icon.png` | Creat |
| `public/og-default.jpg` | Creat |
| `next.config.js` | Creat |
| `.env.local` | Creat |
| `.gitignore` | Verificat/actualizat |

---

## Ordine implementare

1. `.gitignore` + `.env.local`
2. `next.config.js`
3. Resend API Route + modificare ContactForm
4. Favicon + OG Image
5. Reparare link-uri `#`
6. Pagini legale (termeni, confidentialitate, cookies)
7. Banner CookieConsent
8. Analytics component
9. Pagini eroare (not-found, error)
