"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import ServiceCard from "./ServiceCard";

const SERVICES = [
  { icon: "🖨️", tag: "Principal", title: "Printare pe perete", desc: "Print UV direct pe perete pentru spații comerciale și rezidențiale, cu rezoluție ridicată, culori durabile și aplicare rapidă.", chips: ["Rezoluție 2880 DPI", "Culori durabile", "Aplicare rapidă", "Suprafețe multiple"], image: "/assets/servicii/uv-wall-printer.png" },
  { icon: "🎁", tag: "Custom", title: "Obiecte personalizate", desc: "Personalizare pentru serii mici sau mari, ideale pentru activări de brand, pachete promoționale și cadouri memorabile.", chips: ["Serii mici/mari", "Culori vibrante", "Mockup rapid", "Branding corporate"], image: "/assets/servicii/custom-printed-objects.png" },
  { icon: "👕", tag: "Textile", title: "Print textile", desc: "Soluții textile pentru echipe, evenimente și merchandising, cu atenție la detalii fine și rezistență în timp.", chips: ["Calitate long-term", "Detalii fine", "Rezistență la spălări", "Merchandising"], image: "/assets/servicii/textile-printing.png" },
  { icon: "🎨", tag: "Design", title: "Design personalizat", desc: "Pornim de la brief și direcție vizuală clară, livrăm design complet adaptat suprafeței și obiectivelor de business.", chips: ["Brief & direcție", "Concept vizual", "Adaptare suport", "Coerență brand"], image: "/assets/servicii/laser-engraved-finisher-products.png" },
];

export default function ServiciiMainServices() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-px" style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
      <div className="grid-2-services" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={i} {...s} inView={inView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
