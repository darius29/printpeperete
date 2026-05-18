// ─────────────────────────────────────────────────────────────────────────────
// SDG PRINT & Design — Animații globale, SEO config & Ghid implementare Next.js
// Faza 5 · v1.0
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HOOK-URI GLOBALE DE ANIMAȚIE — /src/hooks/useAnimations.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const ANIMATION_HOOKS_CODE = `
// /src/hooks/useAnimations.ts
import { useEffect, useRef, useState } from "react";

/** Detectează când un element intră în viewport */
export function useInView(threshold = 0.12, once = true) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, inView] as const;
}

/** Counter animat de la 0 la target */
export function useCounter(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

/** Typewriter effect cu cuvinte rotative */
export function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2200
) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), typingSpeed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), deletingSpeed);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, deletingSpeed, pauseDuration]);

  return display;
}

/** Parallax pe scroll */
export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      el.style.transform = \`translateY(\${offset}px)\`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return ref;
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FRAMER MOTION VARIANTS — /src/lib/motionVariants.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const FRAMER_VARIANTS_CODE = `
// /src/lib/motionVariants.ts
import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const cardHover = {
  rest: { y: 0, borderColor: "#2A2A2A", boxShadow: "none" },
  hover: {
    y: -6,
    borderColor: "#F97316",
    boxShadow: "0 16px 48px rgba(249,115,22,0.12)",
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 3. SEO CONFIG — /src/lib/seo.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const SEO_CONFIG_CODE = `
// /src/lib/seo.ts
import type { Metadata } from "next";

const BASE_URL = "https://printpeperete.com"; // Schimbă cu domeniul final

const DEFAULT_OG_IMAGE = \`\${BASE_URL}/og-default.jpg\`; // 1200×630px

export const defaultSEO: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SDG Print & Design — Print UV pe perete | Timișoara",
    template: "%s | SDG Print & Design",
  },
  description:
    "Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România. Transformăm orice suprafață în vizual cu impact. Livrare 48h, consultanță gratuită.",
  keywords: [
    "print pe perete", "print UV", "printare perete Timișoara",
    "gravare laser CO2", "personalizare obiecte", "print textile Timișoara",
    "wall print", "mural personalizat", "branding vizual Timișoara",
    "print UV direct", "SDG Print", "printpeperete",
  ],
  authors: [{ name: "SDG Print & Design", url: BASE_URL }],
  creator: "SDG Print & Design",
  publisher: "SDG Print & Design",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: BASE_URL,
    siteName: "SDG Print & Design",
    title: "SDG Print & Design — Print UV pe perete | Timișoara",
    description:
      "Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România. Transformăm orice suprafață în vizual cu impact.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "SDG Print & Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDG Print & Design — Print UV pe perete | Timișoara",
    description: "Print UV direct pe perete și gravare laser în Timișoara.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: BASE_URL },
};

// Per-pagină SEO
export const pageSEO = {
  home: {
    title: "SDG Print & Design — Print UV pe perete | Timișoara",
    description: "Print UV direct pe perete, gravare laser CO₂ și personalizare în Timișoara. Transformăm spații comerciale și rezidențiale. Livrare 48h.",
    alternates: { canonical: BASE_URL },
  },
  servicii: {
    title: "Servicii print UV și laser CO₂",
    description: "Wall Print UV, gravare laser CO₂, obiecte personalizate și print textile în Timișoara. Calculator preț instant. Consultanță gratuită.",
    alternates: { canonical: \`\${BASE_URL}/servicii\` },
  },
  portofoliu: {
    title: "Portofoliu proiecte print UV și laser",
    description: "Exemple reale de proiecte livrate — spații comerciale, rezidențiale, textile și obiecte personalizate. Timișoara și toată România.",
    alternates: { canonical: \`\${BASE_URL}/portofoliu\` },
  },
  despreNoi: {
    title: "Despre noi — Atelier print UV Timișoara",
    description: "Suntem un atelier din Timișoara specializat în print UV și laser CO₂. Echipamente industriale, execuție precisă, livrare 48h.",
    alternates: { canonical: \`\${BASE_URL}/despre-noi\` },
  },
  beforeAfter: {
    title: "Înainte și după — Transformări reale",
    description: "Comparații reale înainte și după transformarea spațiilor. Recepții, showroom-uri, birouri și locuințe în Timișoara și România.",
    alternates: { canonical: \`\${BASE_URL}/before-after\` },
  },
  contact: {
    title: "Contact — Cere ofertă personalizată",
    description: "Contactează SDG Print & Design pentru o ofertă de print UV sau gravare laser. Răspuns în 24h. Timișoara, România.",
    alternates: { canonical: \`\${BASE_URL}/contact\` },
  },
};
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 4. STRUCTURED DATA (JSON-LD) — /src/components/StructuredData.tsx
// ═══════════════════════════════════════════════════════════════════════════════

export const STRUCTURED_DATA_CODE = `
// /src/components/StructuredData.tsx
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://printpeperete.com",
    name: "SDG Print & Design",
    alternateName: "SDG Print",
    description: "Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.",
    url: "https://printpeperete.com",
    telephone: "+40779281047",
    email: "contact@printpeperete.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Timișoara",
      addressRegion: "Timiș",
      addressCountry: "RO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7489,
      longitude: 21.2087,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "14:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii print și personalizare",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Print UV pe perete" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gravare laser CO₂" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Print textile" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Obiecte personalizate" } },
      ],
    },
    areaServed: { "@type": "Country", name: "Romania" },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 5. NEXT.JS APP ROUTER LAYOUT — /src/app/layout.tsx
// ═══════════════════════════════════════════════════════════════════════════════

export const LAYOUT_CODE = `
// /src/app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { defaultSEO } from "@/lib/seo";
import { LocalBusinessSchema } from "@/components/StructuredData";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = defaultSEO;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={\`\${bebasNeue.variable} \${dmSans.variable}\`}>
      <head>
        <LocalBusinessSchema />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0C0C0C" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ background: "#0C0C0C" }}>
        {children}
      </body>
    </html>
  );
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 6. GLOBAL CSS — /src/app/globals.css
// ═══════════════════════════════════════════════════════════════════════════════

export const GLOBALS_CSS_CODE = `
/* /src/app/globals.css */

:root {
  --font-display: 'Bebas Neue', sans-serif;
  --font-ui:      'DM Sans', sans-serif;

  /* Backgrounds */
  --bg-void:        #0C0C0C;
  --bg-surface:     #141414;
  --bg-elevated:    #1E1E1E;
  --bg-border:      #2A2A2A;

  /* Accent */
  --accent:         #F97316;
  --accent-deep:    #EA580C;
  --accent-glow:    rgba(249, 115, 22, 0.15);

  /* Text */
  --text-primary:   #FFFFFF;
  --text-secondary: #9CA3AF;
  --text-tertiary:  #6B7280;

  /* Semantic */
  --success:        #22C55E;
  --error:          #EF4444;
  --info:           #3B82F6;

  /* Radius */
  --r-sm:  4px;
  --r-md:  8px;
  --r-lg:  12px;
  --r-xl:  16px;
  --r-2xl: 24px;

  /* Transitions */
  --ease-out:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in:    cubic-bezier(0.55, 0, 1, 0.45);
  --t-fast:     150ms;
  --t-normal:   250ms;
  --t-slow:     400ms;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  background: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-ui);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-void); }
::-webkit-scrollbar-thumb { background: var(--bg-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* Selection */
::selection { background: rgba(249, 115, 22, 0.3); color: #fff; }

/* Inputs dark */
input, select, textarea { color-scheme: dark; }
input::placeholder, textarea::placeholder { color: #4B5563; }

/* ── Animations ─────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(249,115,22,.45); }
  70%  { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
  100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes grain {
  0%,100% { transform: translate(0,0); }
  10%     { transform: translate(-2%,-3%); }
  30%     { transform: translate(3%,2%); }
  50%     { transform: translate(-1%,4%); }
  70%     { transform: translate(4%,-1%); }
  90%     { transform: translate(-3%,3%); }
}
@keyframes waBounce {
  0%,100% { transform: translateY(0); }
  30%     { transform: translateY(-8px); }
  60%     { transform: translateY(-4px); }
}
@keyframes checkPop {
  0%   { transform: scale(0); }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* ── Utility classes ─────────────────────────────── */
.font-display { font-family: var(--font-display); }
.font-ui      { font-family: var(--font-ui); }

.text-accent   { color: var(--accent); }
.text-muted    { color: var(--text-secondary); }
.text-hint     { color: var(--text-tertiary); }

.bg-surface    { background: var(--bg-surface); }
.bg-elevated   { background: var(--bg-elevated); }

.border-default { border: 1px solid var(--bg-border); }
.border-accent  { border: 1px solid var(--accent); }

.rounded-sm  { border-radius: var(--r-sm); }
.rounded-md  { border-radius: var(--r-md); }
.rounded-lg  { border-radius: var(--r-lg); }
.rounded-xl  { border-radius: var(--r-xl); }
.rounded-2xl { border-radius: var(--r-2xl); }

.transition-default { transition: all var(--t-normal) var(--ease-out); }

/* Pulse CTA */
.btn-pulse { animation: pulse-ring 2.5s infinite; }
.btn-pulse:hover { animation: none; }
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 7. SITEMAP — /src/app/sitemap.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const SITEMAP_CODE = `
// /src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://printpeperete.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: BASE_URL,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: \`\${BASE_URL}/servicii\`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: \`\${BASE_URL}/portofoliu\`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: \`\${BASE_URL}/despre-noi\`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: \`\${BASE_URL}/before-after\`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: \`\${BASE_URL}/contact\`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: \`\${BASE_URL}/faq\`,           lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: \`\${BASE_URL}/pregatire-fisiere\`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 8. ROBOTS.TXT — /src/app/robots.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const ROBOTS_CODE = `
// /src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://printpeperete.com/sitemap.xml",
  };
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 9. PERFORMANCE CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════

export const PERFORMANCE_CHECKLIST = `
## Checklist performanță înainte de lansare

### Imagini
[ ] Toate imaginile convertite în WebP sau AVIF
[ ] Componenta next/image folosită pentru toate imaginile
[ ] Atribute width + height specificate (evită CLS)
[ ] Imaginea hero are priority={true}
[ ] Placeholder blur pentru imagini mari

### Fonturi
[ ] Bebas Neue + DM Sans încărcate via next/font/google
[ ] display: "swap" setat
[ ] Subsets: ["latin"] specificat

### Core Web Vitals target
[ ] LCP < 2.5s (optimizează hero image)
[ ] FID / INP < 100ms (evită JS blocant)
[ ] CLS < 0.1 (dimensiuni fixe pe imagini)

### SEO tehnic
[ ] Sitemap generat și accesibil la /sitemap.xml
[ ] robots.txt corect
[ ] Canonical URLs pe toate paginile
[ ] JSON-LD LocalBusiness pe toate paginile
[ ] Meta tags title + description unice per pagină
[ ] Open Graph images 1200×630px

### Accesibilitate
[ ] Alt text pe toate imaginile
[ ] Contrast ratio > 4.5:1 pe text important
[ ] Focus visible pe toate elementele interactive
[ ] Aria-labels pe butoane icon-only
[ ] Skip to main content link

### Mobile
[ ] Viewport meta tag prezent
[ ] Touch targets min 44×44px
[ ] Safe area inset pentru iPhone notch
[ ] Sticky mobile bar cu padding-bottom env()

### Analytics & tracking
[ ] Google Analytics 4 sau Plausible
[ ] Google Search Console conectat și sitemap submis
[ ] Event tracking pe: CTA click, form submit, WhatsApp click, calculator use
`;

// ═══════════════════════════════════════════════════════════════════════════════
// 10. STRUCTURA DE FIȘIERE NEXT.JS RECOMANDATĂ
// ═══════════════════════════════════════════════════════════════════════════════

export const FOLDER_STRUCTURE = `
sdg-print/
├── public/
│   ├── favicon.ico
│   ├── icon.svg
│   ├── apple-touch-icon.png
│   ├── og-default.jpg          # 1200×630 Open Graph image
│   └── images/
│       ├── projects/           # Imagini proiecte portofoliu
│       └── equipment/          # Imagini echipamente
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + SEO global
│   │   ├── globals.css         # CSS global + tokeni
│   │   ├── page.tsx            # / Home
│   │   ├── servicii/page.tsx   # /servicii
│   │   ├── portofoliu/page.tsx # /portofoliu
│   │   ├── despre-noi/page.tsx # /despre-noi
│   │   ├── before-after/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WAWidget.tsx
│   │   │   └── MobileBar.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WallPrintSpotlight.tsx
│   │   │   ├── BeforeAfterPreview.tsx
│   │   │   ├── LaserSection.tsx
│   │   │   ├── Process.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── servicii/
│   │   │   ├── PriceCalculator.tsx
│   │   │   └── LaserCategories.tsx
│   │   ├── portofoliu/
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── BeforeAfterSlider.tsx
│   │   │   └── SectionHeader.tsx
│   │   └── StructuredData.tsx
│   │
│   ├── hooks/
│   │   └── useAnimations.ts    # useInView, useCounter, useTypewriter, useParallax
│   │
│   ├── lib/
│   │   ├── seo.ts              # defaultSEO + pageSEO
│   │   └── motionVariants.ts   # Framer Motion variants
│   │
│   └── types/
│       └── index.ts            # TypeScript types
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
`;

export const PACKAGE_JSON_DEPS = `
// Dependențe recomandate pentru package.json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "framer-motion": "^11.0.0"
  }
}

// Opțional pentru funcționalități avansate:
// "resend": "^3.2.0"          → Email trimitere formulare
// "uploadthing": "^6.0.0"     → Upload fișiere design
// "sharp": "^0.33.0"          → Optimizare imagini (Next.js)
// "@vercel/analytics": "^1.3" → Analytics lightweight
`;
