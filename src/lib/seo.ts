// /src/lib/seo.ts
import type { Metadata } from "next";

const BASE_URL = "https://printpeperete.com"; // Schimbă cu domeniul final

const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph-image`;

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
    alternates: { canonical: `${BASE_URL}/servicii` },
  },
  portofoliu: {
    title: "Portofoliu proiecte print UV și laser",
    description: "Exemple reale de proiecte livrate — spații comerciale, rezidențiale, textile și obiecte personalizate. Timișoara și toată România.",
    alternates: { canonical: `${BASE_URL}/portofoliu` },
  },
  despreNoi: {
    title: "Despre noi — Atelier print UV Timișoara",
    description: "Suntem un atelier din Timișoara specializat în print UV și laser CO₂. Echipamente industriale, execuție precisă, livrare 48h.",
    alternates: { canonical: `${BASE_URL}/despre-noi` },
  },
  beforeAfter: {
    title: "Înainte și după — Transformări reale",
    description: "Comparații reale înainte și după transformarea spațiilor. Recepții, showroom-uri, birouri și locuințe în Timișoara și România.",
    alternates: { canonical: `${BASE_URL}/before-after` },
  },
  contact: {
    title: "Contact — Cere ofertă personalizată",
    description: "Contactează SDG Print & Design pentru o ofertă de print UV sau gravare laser. Răspuns în 24h. Timișoara, România.",
    alternates: { canonical: `${BASE_URL}/contact` },
  },
};
