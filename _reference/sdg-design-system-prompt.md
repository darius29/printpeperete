# Prompt — SDG PRINT & Design System (Claude Artifact)

Copiază tot textul de mai jos și trimite-l lui Claude într-o conversație nouă.
Funcționează cel mai bine cu Claude Sonnet 4.6 sau Opus 4.6.

---

## PROMPTUL (copiază de aici în jos)

---

Creează un **design system interactiv complet** ca artifact React pentru brandul **SDG PRINT & Design** — un atelier de print UV și gravare laser din Timișoara, România.

---

### IDENTITATE VIZUALĂ

**Ton:** Modern, creativ, industrial-premium. Dark theme dominant cu accente portocalii vii.

**Fonturi Google Fonts (importă în artifact):**
- Display / titluri: `Bebas Neue` (weight 400) — pentru H1, H2, numere mari, hero
- UI / body: `DM Sans` (weight 400, 500, 600) — pentru paragrafe, labels, butoane, navigație

**Paleta de culori — tokeni CSS:**
```
--bg-void:        #0C0C0C   /* fundal principal */
--bg-surface:     #141414   /* carduri / secțiuni */
--bg-elevated:    #1E1E1E   /* hover / input fill */
--bg-border:      #2A2A2A   /* borduri / separatoare */
--accent:         #F97316   /* CTA principal — portocaliu viu */
--accent-deep:    #EA580C   /* hover CTA / gradient end */
--accent-glow:    rgba(249,115,22,0.15)
--text-primary:   #FFFFFF
--text-secondary: #9CA3AF
--text-tertiary:  #6B7280
--success:        #22C55E
--error:          #EF4444
--info:           #3B82F6
```

---

### STRUCTURA ARTIFACT

Construiește o **aplicație React cu sidebar de navigație** care conține 10 secțiuni. Sidebar-ul e fix pe stânga (200px lățime, dark), conținutul se schimbă la click pe tab. Layout: `display: flex`, sidebar + main content area.

Header persistent în top: logo text `SDG PRINT & Design` (Bebas Neue, "PRINT" portocaliu) + badges "Dark Theme", "Next.js Ready", "v1.0".

---

### SECȚIUNILE (sidebar tabs)

#### 1. 🎨 Culori
- Afișează toate cele 16 tokeni de culoare grupați în 4 categorii: Backgrounds, Accent, Text, Semantic
- Fiecare swatch: dreptunghi colorat 52px înălțime + info (token name în `--kebab-case`, hex, rol)
- Click pe swatch copiază valoarea hex (navigator.clipboard)
- Indicator vizual când s-a copiat (border portocaliu pe card)

#### 2. Aa Tipografie
- Afișează perechea de fonturi: Bebas Neue (display) + DM Sans (UI) în carduri side-by-side
- Scala completă de dimensiuni: 80px, 64px, 48px, 36px, 28px, 22px, 18px, 15px, 13px, 11px
- Fiecare dimensiune: token name, px size, exemplu de text real în română (ex: "TRANSFORMĂM PEREȚII", "Print UV Direct pe Perete", "Culori vii CMYK · Uscare instant")
- Arată fontul corect pentru fiecare dimensiune (Bebas Neue pentru display/H1/H2, DM Sans pentru restul)

#### 3. ↔ Spacing
- Scala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 px
- Vizualizare: bară portocalie cu lățimea egală cu valoarea + eticheta px + descriere utilizare
  - 4px=Border gaps, 8px=Icon padding, 12px=Tag inner, 16px=Card sm, 24px=Card inner, 32px=Section inner, 48px=Component gap, 64px=Section padding, 96px=Page section, 128px=Section xl

#### 4. ⬜ Butoane
- **Primary:** background #F97316, text alb, border-radius 8px, padding 12px 24px, animație `pulse-ring` (box-shadow pulsation portocalie)
- **Outline:** border 1px #F97316, text portocaliu, background transparent
- **Dark:** background #1E1E1E, border 1px #2A2A2A, text alb
- **WhatsApp button:** background #25D366, text alb, icon 📱
- **Text link:** fără border, text #9CA3AF cu underline subtil, hover portocaliu
- Toate dimensiunile: XS(11px), SM(13px), MD(14px), LG(15px), XL(16px)
- Butonul primary are `@keyframes pulse-ring` cu box-shadow portocalie pulsantă (animat continuu)
- State loading: text "Se trimite..." + culoare mai închisă

#### 5. ▭ Carduri
**Service card** (hover interactiv):
- Background #141414, border 1px #2A2A2A, border-radius 12px, padding 24px
- Hover: translateY(-4px) + border portocaliu + box-shadow `0 8px 32px rgba(249,115,22,0.12)` + bg #1E1E1E
- Conținut: emoji icon (28px) + titlu Bebas Neue (20px) + descriere (13px, #9CA3AF) + "Detalii →" portocaliu
- Afișează 4 carduri în grid 2x2: 🖨️ Print UV pe perete, ⚡ Gravare laser CO₂, 🎁 Obiecte personalizate, 👕 Print textile

**Stat card:**
- Grid 4 coloane, background #141414, border 1px #2A2A2A
- Număr mare Bebas Neue 32px portocaliu + unitate 18px + label 11px gri
- Date: 2880 DPI, 48h, 290 cm, 10+

**Feature badge card:**
- Grid 3 coloane, ✓ portocaliu + text gri, border 1px #2A2A2A
- 6 avantaje: "Print direct pe perete — fără folie", "Design permanent și rezistent", "Culori vii CMYK", "Execuție rapidă", "Spații comerciale și rezidențiale", "Fără miros, non-toxic"

#### 6. ✏ Formulare
**Formular complet ofertă (stânga):**
- Câmpuri: Nume + Telefon (grid 2 col), Email, Tip serviciu (select cu opțiuni: Wall Print UV / Gravare laser CO₂ / Tricouri & Hanorace / Obiecte personalizate / Design personalizat), Locație, Mesaj (textarea)
- Drag & drop upload zone: border 1px dashed #2A2A2A, icon 📎, text "Trage fișierul design aici sau selectează", sub-text "PDF, AI, PNG, JPG — max 20MB"
- Buton submit portocaliu full-width: "Trimite cererea →"
- Style input: background #141414, border 1px #2A2A2A, color #fff, border-radius 8px, padding 11px 14px

**Stări input (dreapta):**
- Default: border #2A2A2A
- Focus: border #F97316
- Filled: border #2A2A2A, text alb
- Error: border #EF4444 + mesaj "⚠ Câmp obligatoriu" roșu dedesubt
- Success: border #22C55E
- Disabled: opacity 0.4

#### 7. 🏷 Badges & Chips
**Status badges** (rounded-full, fiecare cu bg+color+border unice):
- Principal: bg orange 12%, color #F97316
- Nou: bg green 12%, color #22C55E
- Popular: bg blue 12%, color #3B82F6
- Laser CO₂: bg violet 12%, color #A78BFA
- Timișoara: bg #1E1E1E, color #9CA3AF
- 48h: bg green, color verde

**Chips filtrare** (state toggle cu useState):
- 9 județe: Timișoara, Arad, Cluj-Napoca, Bihor, Alba, Hunedoara, Caraș-Severin, Mureș, Sibiu
- Click toggles active state: background #F97316 + text alb când activ, #141414 + gri când inactiv

**Chips suprafețe** (outline only, non-interactive):
- Pereți tencuiți, Lemn & MDF, Sticlă, Metal, Plastic rigid, Beton, Gresie

#### 8. ☰ Navigație
**Navbar desktop (glassmorphism):**
- background: rgba(12,12,12,0.92), backdropFilter: blur(16px)
- border 1px #2A2A2A, border-radius 12px
- Stânga: logo Bebas Neue "SDG PRINT & Design" ("PRINT" portocaliu)
- Centru: links navigație (Acasă, Despre Noi, Servicii, Portofoliu, Before/After, Contact) — linkul activ (Servicii) are color #F97316 și border-bottom portocaliu
- Dreapta: buton "Cere ofertă" portocaliu

**Sticky mobile bar:**
- 3 butoane egale: 📞 Sună acum (#1E1E1E), 📱 WhatsApp (#25D366), ✉ Cere ofertă (#F97316)
- Fiecare buton: icon 18px + label text, flex column, border-radius 8px

**WhatsApp floating widget:**
- Simulare fixed bottom-right: tooltip "Chat rapid pe WhatsApp →" + buton circular 48px verde cu 📱
- box-shadow: 0 4px 16px rgba(37,211,102,0.3)

#### 9. ⟶ Proces & UI

**Proces 3 pași cu conector:**
- Grid 3 coloane, centrat
- Fiecare pas: cerc 56px cu border 2px portocaliu + număr Bebas Neue (01, 02, 03) + titlu (Bebas Neue 17px) + descriere (12px, gri)
- Linie conector între pași: `linear-gradient(to right, #F97316, #2A2A2A)`, height 1px, position absolute
- Texte: "01 Discuție & obiective", "02 Propunere creativă", "03 Execuție & predare"

**Tabel comparativ SDG vs. Clasic:**
- Header row: Criteriu | SDG Print (#F97316) | Metoda clasică (gri)
- 6 rânduri: Aplicare, Durabilitate, Personalizare, Timp execuție, Suprafețe, Risc deteriorare
- SDG: ✓ verde + text; Clasic: ✗ gri + text
- Background #141414, border-radius 12px, border separator intern 1px #1E1E1E

#### 10. </> CSS / Tailwind
- Tab switcher: "CSS Variables" | "Tailwind Config"
- Afișează codul complet în `<pre>` dark (#0C0C0C bg, text #E2E8F0)
- CSS: toate variabilele `--bg-void`, `--accent`, `--font-display`, `--radius-*`, `--ease-out`, `--duration-*`
- Tailwind: obiectul `theme.extend` cu colors, fontFamily, borderRadius

---

### DETALII TEHNICE

```jsx
// Importă fonturile în <style> inline
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

// Animație pulse-ring pentru butonul CTA
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
  70%  { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
  100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
}

// Scrollbar custom
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0C0C0C; }
::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
```

- Folosește `useState` pentru: tab activ sidebar, card hover, chip toggle, tab CSS/Tailwind, loading button, copiere culori
- Sidebar sticky cu `position: sticky, top: 0, height: calc(100vh - 69px), overflowY: auto`
- Conținut main scrollabil separat de sidebar
- Tot codul în un singur fișier `.jsx` cu `export default`
- Fără Tailwind în artifact — doar inline styles cu variabilele de mai sus
- Nu folosi librării externe în afară de React (useState)
- Inputurile și select-urile au `color-scheme: dark` în CSS global
- Titlul fiecărei secțiuni: număr în cerc portocaliu (1-10) + text Bebas Neue 28px + linie gradient portocaliu→transparent dedesubt

---

### REZULTAT AȘTEPTAT

Un artifact React complet funcțional care:
- Se încarcă cu fonturile Bebas Neue + DM Sans
- Are sidebar cu 10 taburi navigabile, fiecare afișând componentele relevante
- Toate componentele sunt interactive (hover, click, toggle, copy)
- Respectă strict paleta dark cu accent portocaliu
- Poate fi folosit ca referință vizuală pentru implementarea website-ului SDG PRINT & Design în Next.js
