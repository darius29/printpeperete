"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import ServiceCard from "./ServiceCard";

const SERVICES = [
  { icon: "\uD83D\uDDA8\uFE0F", tag: "Principal", title: "Printare pe perete", desc: "Print UV direct pe perete pentru spa\u021bii comerciale \u0219i reziden\u021biale, cu rezolu\u021bie ridicat\u0103, culori durabile \u0219i aplicare rapid\u0103.", chips: ["Rezolu\u021bie 2880 DPI", "Culori durabile", "Aplicare rapid\u0103", "Suprafe\u021be multiple"] },
  { icon: "\uD83C\uDF81", tag: "Custom", title: "Obiecte personalizate", desc: "Personalizare pentru serii mici sau mari, ideale pentru activ\u0103ri de brand, pachete promo\u021bionale \u0219i cadouri memorabile.", chips: ["Serii mici/mari", "Culori vibrante", "Mockup rapid", "Branding corporate"] },
  { icon: "\uD83D\uDC55", tag: "Textile", title: "Print textile", desc: "Solu\u021bii textile pentru echipe, evenimente \u0219i merchandising, cu aten\u021bie la detalii fine \u0219i rezisten\u021b\u0103 \u00een timp.", chips: ["Calitate long-term", "Detalii fine", "Rezisten\u021b\u0103 la sp\u0103l\u0103ri", "Merchandising"] },
  { icon: "\uD83C\uDFA8", tag: "Design", title: "Design personalizat", desc: "Pornim de la brief \u0219i direc\u021bie vizual\u0103 clar\u0103, livr\u0103m design complet adaptat suprafe\u021bei \u0219i obiectivelor de business.", chips: ["Brief & direc\u021bie", "Concept vizual", "Adaptare suport", "Coeren\u021b\u0103 brand"] },
];

export default function ServiciiMainServices() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={i} {...s} inView={inView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
