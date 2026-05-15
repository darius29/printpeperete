"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  { num: "01", title: "Ne trimi\u021bi detaliile", desc: "Dimensiuni, suprafa\u021b\u0103, stil vizual, termen \u0219i loca\u021bia proiectului.", icon: "\uD83D\uDCCB" },
  { num: "02", title: "Valid\u0103m designul", desc: "Adapt\u0103m materialele grafice pentru un rezultat impecabil. Revizii incluse.", icon: "\u270F\uFE0F" },
  { num: "03", title: "Program\u0103m execu\u021bia", desc: "Stabilim calendarul ideal \u0219i confirm\u0103m toate detaliile cu tine.", icon: "\uD83D\uDCC5" },
  { num: "04", title: "Print\u0103m & pred\u0103m", desc: "Execu\u021bie atent\u0103, curat\u0103, cu predare final\u0103 \u0219i recomand\u0103ri de \u00EEntre\u021binere.", icon: "\uD83D\uDE80" },
];

export default function ProcessSteps() {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 56, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Procesul nostru</span>
            <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            Proces detaliat \u00Een 4 pa\u0219i
          </h2>
        </div>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 16, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 20, alignItems: "flex-start",
                padding: "24px 32px", borderBottom: i < 3 ? "1px solid #1a1a1a" : "none",
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-24px)",
                transition: `opacity .6s ${0.2 + i * 0.1}s, transform .6s ${0.2 + i * 0.1}s`,
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
              {i < 3 && <div style={{ fontSize: 20, color: "var(--bg-border)", alignSelf: "center", flexShrink: 0 }}>\u2192</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
