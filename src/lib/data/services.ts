export interface Service {
  id: string;
  icon: string;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  href: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: string;
}

export interface LaserCategory {
  label: string;
  icon: string;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    id: "wall-print",
    icon: "🖨️",
    tag: "Principal",
    title: "Printare pe perete",
    desc: "Print UV direct pe perete pentru spații comerciale și rezidențiale, cu rezoluție ridicată, culori durabile și aplicare rapidă.",
    chips: ["Rezoluție 2880 DPI", "Culori durabile", "Aplicare rapidă", "Suprafețe multiple"],
    href: "#wall-print",
  },
  {
    id: "obiecte",
    icon: "🎁",
    tag: "Custom",
    title: "Obiecte personalizate",
    desc: "Personalizare pentru serii mici sau mari, ideale pentru activări de brand, pachete promoționale și cadouri memorabile.",
    chips: ["Serii mici/mari", "Culori vibrante", "Mockup rapid", "Branding corporate"],
    href: "#obiecte",
  },
  {
    id: "textile",
    icon: "👕",
    tag: "Textile",
    title: "Print textile",
    desc: "Soluții textile pentru echipe, evenimente și merchandising, cu atenție la detalii fine și rezistență în timp.",
    chips: ["Calitate long-term", "Detalii fine", "Rezistență la spălări", "Merchandising"],
    href: "#textile",
  },
  {
    id: "design",
    icon: "🎨",
    tag: "Design",
    title: "Design personalizat",
    desc: "Pornim de la brief și direcție vizuală clară, livrăm design complet adaptat suprafeței și obiectivelor de business.",
    chips: ["Brief & direcție", "Concept vizual", "Adaptare suport", "Coerență brand"],
    href: "#design",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Ne trimiți detaliile",
    desc: "Dimensiuni, suprafață, stil vizual, termen și locația proiectului.",
    icon: "📋",
  },
  {
    num: "02",
    title: "Validăm designul",
    desc: "Adaptăm materialele grafice pentru un rezultat impecabil. Revizii incluse.",
    icon: "✏️",
  },
  {
    num: "03",
    title: "Programăm execuția",
    desc: "Stabilim calendarul ideal și confirmăm toate detaliile cu tine.",
    icon: "📅",
  },
  {
    num: "04",
    title: "Printăm & predăm",
    desc: "Execuție atentă, curată, cu predare finală și recomandări de întreținere.",
    icon: "🚀",
  },
];

export const LASER_CATEGORIES: LaserCategory[] = [
  {
    label: "Semnalistică",
    icon: "🪧",
    items: ["Plăcuțe firme", "Litere volumetrice", "Indicatoare direcționale", "Plăci informative", "Numere apartament", "Logos acril"],
  },
  {
    label: "Gifting premium",
    icon: "🎁",
    items: ["Cutii cadou gravate", "Trofee personalizate", "Rame foto", "Agende leather", "Portofele gravate", "Seturi corporate"],
  },
  {
    label: "Retail branding",
    icon: "🏪",
    items: ["Etichete produse", "Display-uri produs", "Standuri acril", "Prețiere premium", "Packagig personalizat", "Pop-up cards"],
  },
  {
    label: "Corporate kits",
    icon: "💼",
    items: ["Kit onboarding", "Carduri acril", "Insigne personalizate", "Suportul prezentări", "Dosare gravate", "Sticle personalizate"],
  },
  {
    label: "Prototipare",
    icon: "⚙️",
    items: ["Modele scale 1:1", "Piese funcționale", "Forme personalizate", "Testare materiale", "Jigs & fixtures", "Decupaje precise"],
  },
  {
    label: "Serii scurte",
    icon: "📦",
    items: ["10–500 bucăți", "Producție rapidă", "Control calitate", "Mix materiale", "Varietate finisaje", "Livrare curier"],
  },
  {
    label: "Cutii personalizate",
    icon: "📮",
    items: ["Cutii rigide MDF", "Cutii acril", "Casete bijuterii", "Packaging luxos", "Cutiuțe condimente", "Wine boxes"],
  },
  {
    label: "Ediții limitate",
    icon: "⭐",
    items: ["Numerotare unică", "Certificate autenticitate", "Branding exclusiv", "Colecții sezoniere", "Colaborări artă", "Tiraje mici"],
  },
];

export const LASER_MATERIALS: string[] = [
  "Lemn", "MDF", "Acril", "Sticlă", "Piele", "Anodizat", "Plutăe", "Aluminiu", "Cauciuc", "Silicon",
];
