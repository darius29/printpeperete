"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";

const rows: [string, string, string][] = [
  ["Aplicare", "Direct pe suprafață, fără intermediar", "Tapet sau folie aplicată separat"],
  ["Durabilitate", "UV-rezistent, ani de zile fără degradare", "Se dezlipește, pălește în timp"],
  ["Personalizare", "Orice design, orice dimensiune", "Limitată la modele disponibile"],
  ["Timp execuție", "Livrare în 48h pentru standard", "Zile sau săptămâni pentru custom"],
  ["Suprafețe compatibile", "Beton, metal, lemn, sticlă, textile", "Doar suprafețe plane netede"],
  ["Risc deteriorare", "Zero — proces complet neinvaziv", "Risc la dezlipire sau umiditate"],
];

export default function ComparisonTable() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-section section-divider" style={{ padding: "96px 40px", background: "radial-gradient(ellipse 140% 65% at 50% 25%, rgba(249,115,22,0.13) 0%, transparent 65%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          label="Comparație directă"
          title={
            <>
              Print UV vs.
              <br />
              Metode clasice
            </>
          }
          inView={inView}
        />
        <div
          className="comparison-scroll"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: 16,
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transition: "opacity .7s .2s",
          }}
        >
          {/* Table header */}
          <div
            className="comparison-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: "var(--bg-elevated)",
              padding: "14px 24px",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "var(--text-tertiary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Criteriu
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--accent)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              SDG Print ✓
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-tertiary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Metoda clasică
            </span>
          </div>

          {/* Rows */}
          {rows.map(([c, sdg, cls], i) => (
            <div
              key={c}
              className="comparison-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "14px 24px",
                borderTop: "1px solid #1a1a1a",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-16px)",
                transition: `opacity .5s ${0.25 + i * 0.06}s, transform .5s ${0.25 + i * 0.06}s`,
              }}
            >
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{c}</span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <span style={{ flexShrink: 0, marginTop: 1 }}>✓</span>
                {sdg}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#4B5563",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <span style={{ flexShrink: 0, marginTop: 1 }}>✗</span>
                {cls}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
