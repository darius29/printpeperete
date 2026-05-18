"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";
import DifferentiatorCard from "./DifferentiatorCard";

const diffs = [
  {
    icon: "🎯",
    val: "2880 DPI",
    title: "Print UV direct pe suprafață",
    desc: "Cernelurile UV se fixează direct pe perete, metal, sticlă sau lemn fără tapet sau folie intermediară. Rezultatul este net și durabil.",
  },
  {
    icon: "🌈",
    val: "UV-curat",
    title: "Culori vibrante, rezistente",
    desc: "Formulele UV sunt rezistente la UV, umiditate și frecare. Culorile rămân vii ani de zile fără să pălească sau să se exfolieze.",
  },
  {
    icon: "⚡",
    val: "48h",
    title: "Execuție rapidă",
    desc: "De la confirmare la predare, procesul nostru este optimizat pentru a livra în 48h pentru comenzi standard, fără compromisuri de calitate.",
  },
  {
    icon: "✏️",
    val: "Full custom",
    title: "Design adaptat pe brief",
    desc: "Nu folosim template-uri. Fiecare design este creat sau adaptat specific pentru suprafața, locația și identitatea vizuală a clientului.",
  },
  {
    icon: "🧱",
    val: "10+ materiale",
    title: "Suprafețe multiple",
    desc: "Printăm pe gresie, beton, MDF, metal, textile și obiecte promoționale cu aceeași acuratețe, indiferent de textură sau dimensiune.",
  },
  {
    icon: "🤝",
    val: "Non-invaziv",
    title: "Fără deteriorarea suprafeței",
    desc: "Procesul de aplicare este neinvaziv. Nu există risc de deteriorare a peretelui sau suprafeței — ideal pentru spații închiriate sau renovate.",
  },
];

export default function Differentiators() {
  const [ref, inView] = useInView(0.08);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-section section-divider" style={{ padding: "96px 40px", background: "radial-gradient(ellipse 140% 65% at 25% 35%, rgba(249,115,22,0.13) 0%, transparent 65%), radial-gradient(ellipse 80% 50% at 85% 80%, rgba(249,115,22,0.08) 0%, transparent 55%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          label="De ce suntem diferiți"
          title={
            <>
              Ce face printul
              <br />
              nostru diferit
            </>
          }
          subtitle="Nu toate printurile sunt la fel. Iată ce înseamnă concret tehnologia UV directă pe care o folosim."
          inView={inView}
        />
        <div className="grid-3-main" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {diffs.map((d, i) => (
            <DifferentiatorCard
              key={i}
              icon={d.icon}
              val={d.val}
              title={d.title}
              desc={d.desc}
              inView={inView}
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
