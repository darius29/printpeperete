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
      className="resp-section"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--bg-border)",
        borderBottom: "1px solid var(--bg-border)",
        padding: "96px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
