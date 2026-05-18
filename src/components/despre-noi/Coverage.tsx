"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";

const coverageCards = [
  { icon: "📍", title: "Sediu principal", val: "Timișoara", sub: "județul Timiș", color: "#F97316" },
  { icon: "🚗", title: "Deplasare wall print", val: "Vest & Centru", sub: "România + național la cerere", color: "#22C55E" },
  { icon: "📦", title: "Expediere națională", val: "Toată România", sub: "Gravură, obiecte, textile", color: "#3B82F6" },
];

const judete = [
  "Timiș",
  "Arad",
  "Bihor",
  "Cluj",
  "Alba",
  "Hunedoara",
  "Caraș-Severin",
  "Mehedinți",
  "Mureș",
  "Sibiu",
  "+ toată România la cerere",
];

export default function Coverage() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section"
      style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 55%), radial-gradient(ellipse 55% 60% at 0% 100%, rgba(34,197,94,0.06) 0%, transparent 60%), radial-gradient(ellipse 45% 50% at 100% 0%, rgba(59,130,246,0.05) 0%, transparent 55%), var(--bg-surface)",
        borderTop: "1px solid var(--bg-border)",
        padding: "96px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          label="Zonă de acoperire"
          title={
            <>
              Lucrăm în Timișoara
              <br />
              și toată România
            </>
          }
          subtitle="Sediul principal este în Timișoara, dar ne deplasăm pentru proiecte de wall print în toată țara. Gravura laser și obiectele se expediază oriunde în România."
          inView={inView}
        />

        {/* Coverage cards */}
        <div
          className="grid-3-main"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 32,
            opacity: inView ? 1 : 0,
            transition: "opacity .7s .2s",
          }}
        >
          {coverageCards.map((c) => (
            <div
              key={c.title}
              style={{
                background: "var(--bg-elevated)",
                border: `1px solid ${c.color}25`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: c.color,
                  letterSpacing: "0.03em",
                  marginBottom: 4,
                }}
              >
                {c.val}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* County chips */}
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: 12,
            padding: 24,
            opacity: inView ? 1 : 0,
            transition: "opacity .7s .35s",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
            }}
          >
            Zone în care lucrăm
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {judete.map((j) => {
              const isHighlight = j.includes("+");
              return (
                <span
                  key={j}
                  style={{
                    fontSize: 12,
                    background: "#1E1E1E",
                    color: isHighlight ? "var(--accent)" : "var(--text-secondary)",
                    border: isHighlight ? "1px solid rgba(249,115,22,.3)" : "1px solid var(--bg-border)",
                    borderRadius: 6,
                    padding: "5px 12px",
                    fontWeight: isHighlight ? 600 : 400,
                  }}
                >
                  {j}
                </span>
              );
            })}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 16 }}>
            <strong style={{ color: "#fff" }}>Ai un proiect în altă zonă?</strong> Contactează-ne — evaluăm fiecare
            proiect individual și găsim cea mai bună soluție logistică.
          </p>
        </div>
      </div>
    </section>
  );
}
