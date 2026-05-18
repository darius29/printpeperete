export interface Service {
  id: string;
  icon: string;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  href: string;
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

