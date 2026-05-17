"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  { num: "01", title: "Ne trimiteți detaliile", desc: "Dimensiuni, suprafață, stil vizual, termen și locația proiectului.", icon: "📋" },
  { num: "02", title: "Validăm designul", desc: "Adaptăm materialele grafice pentru un rezultat impecabil. Revizii incluse.", icon: "✏️" },
  { num: "03", title: "Programăm execuția", desc: "Stabilim calendarul ideal și confirmăm toate detaliile cu tine.", icon: "📅" },
  { num: "04", title: "Printăm & predăm", desc: "Execuție atentă, curată, cu predare finală și recomandări de întreținere.", icon: "🚀" },
];

export default function ProcessSteps() {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-section-80" style={{ padding: "80px 40px", background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 65%), radial-gradient(ellipse 30% 50% at 100% 100%, rgba(249,115,22,0.04) 0%, transparent 55%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 56, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Procesul nostru</span>
            <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            Proces detaliat în 4 pași
          </h2>
        </div>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 16, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`process-row slide-left stagger-${i + 2} ${inView ? "is-visible" : ""}`}
              style={{
                display: "flex", gap: 20, alignItems: "flex-start",
                padding: "24px 32px", borderBottom: i < 3 ? "1px solid #1a1a1a" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.3)", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 20, color: "var(--accent)", letterSpacing: "0.04em" }}>{s.num}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 20, letterSpacing: "0.03em", color: "#fff" }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
              {i < 3 && <div style={{ fontSize: 20, color: "var(--bg-border)", alignSelf: "center", flexShrink: 0 }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
