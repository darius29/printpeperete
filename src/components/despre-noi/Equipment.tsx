"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";
import EquipmentCard from "./EquipmentCard";

const equipment: {
  tag: string;
  name: string;
  subtitle: string;
  icon: string;
  specs: [string, string][];
}[] = [
  {
    tag: "Wall Print",
    name: "Wall Printer UV",
    subtitle: "Sistem print UV direct pe perete",
    icon: "🖨️",
    specs: [
      ["Înălțime maximă print", "290 cm"],
      ["Sistem culori", "CMYK"],
      ["Rezoluție maximă", "2880 DPI"],
      ["Viteză", "2–6 m²/oră"],
      ["Tehnologie cerneală", "UV, uscare instant"],
      ["Nivel miros", "Low-odor, non-toxic"],
    ],
  },
  {
    tag: "Laser CO₂",
    name: "Junlong Laser CO₂",
    subtitle: "Mașină industrială gravare & debitare",
    icon: "⚡",
    specs: [
      ["Tip laser", "CO₂"],
      ["Precizie", "Industrială"],
      ["Operație", "Gravare + debitare"],
      ["Materiale", "10+ tipuri"],
      ["Contact material", "Zero (non-contact)"],
      ["Finisaj", "Curat, fără bavuri"],
    ],
  },
];

export default function Equipment() {
  const [ref, inView] = useInView(0.08);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section section-divider"
      style={{
        background: "var(--bg-surface)",
        padding: "96px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <video autoPlay muted loop playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src="/assets/videos/LoopSmallDustFlameParticle.mp4" type="video/mp4" />
        <source src="/assets/videos/LoopSmallDustFlameParticle.mov" type="video/quicktime" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(12,12,12,0.80)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHeader
          label="Echipamentele noastre"
          title={
            <>
              Tehnologie de
              <br />
              nivel industrial
            </>
          }
          subtitle="Investim în echipamente de calitate pentru că rezultatele finale depind direct de precizia și fiabilitatea utilajelor folosite."
          inView={inView}
        />
        <div className="grid-2-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {equipment.map((eq, i) => (
            <EquipmentCard
              key={i}
              tag={eq.tag}
              name={eq.name}
              subtitle={eq.subtitle}
              icon={eq.icon}
              specs={eq.specs}
              inView={inView}
              delay={0.15 + i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
