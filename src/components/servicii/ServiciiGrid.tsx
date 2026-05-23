"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const CARDS = [
  { cat: "walls", title: "Wall Print", icon: "🖨️", desc: "Grafici de impact pentru birouri, retail și HoReCa.", chips: ["Fără folii", "Detalii precise", "Cerneluri UV"] },
  { cat: "objects", title: "Promo Objects", icon: "🎁", desc: "Produse personalizate pentru campanii și onboarding.", chips: ["Loturi flexibile", "Branding consistent", "Ambalare premium"] },
  { cat: "textiles", title: "Textile Print", icon: "👕", desc: "Tricouri, hanorace și accesorii pentru echipe sau merch.", chips: ["Rezistență la spălări", "Culori vibrante", "Texturi plăcute"] },
  { cat: "design", title: "Visual Design", icon: "🎨", desc: "Concept, adaptare și layout pentru print fizic.", chips: ["Direcție artistică", "Fișiere producție", "Aliniere brand guide"] },
];
const FILTERS: [string, string][] = [["all", "Toate"], ["walls", "Walls"], ["objects", "Objects"], ["textiles", "Textiles"], ["design", "Design"]];

export default function ServiciiGrid() {
  const [filter, setFilter] = useState("all");
  const [ref, inView] = useInView(0.08);
  const visible = filter === "all" ? CARDS : CARDS.filter(c => c.cat === filter);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-section-80 section-divider" style={{ background: "transparent", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Filtrează</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
              Servicii pentru<br />branding memorabil
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTERS.map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                style={{
                  background: filter === k ? "var(--accent)" : "var(--bg-surface)",
                  color: filter === k ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${filter === k ? "var(--accent)" : "var(--bg-border)"}`,
                  borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)", transition: "background 0.18s, color 0.18s, border-color 0.18s",
                }}
              >{l}</button>
            ))}
          </div>
        </div>
        <div className="grid-2-services" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, opacity: inView ? 1 : 0, transition: "opacity .7s .2s" }}>
          {visible.map((c, i) => (
            <div
              key={`${filter}-${i}`}
              className="service-card has-icon-pop"
              style={{ animation: "fadeUp 0.3s ease both", animationDelay: `${i * 0.08}s` }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <span className="icon-pop" style={{ fontSize: 32 }}>{c.icon}</span>
                <span style={{ fontSize: 10, background: "rgba(249,115,22,.1)", color: "var(--accent)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 20, padding: "3px 10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.cat}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 22, letterSpacing: "0.03em", marginBottom: 8, color: "#fff" }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {c.chips.map(ch => (
                  <span key={ch} style={{ fontSize: 11, background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--bg-border)", borderRadius: 5, padding: "3px 9px" }}>{ch}</span>
                ))}
              </div>
              <Link href="/contact" className="btn-outline" style={{ fontSize: 13, padding: "9px 18px" }}>Cere ofertă →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
