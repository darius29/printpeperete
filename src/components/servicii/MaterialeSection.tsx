"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const TABS = [
  { label: "Semnalistică", icon: "🪧", items: ["Plăcuțe firme", "Litere volumetrice", "Indicatoare direcționale", "Plăci informative", "Numere apartament", "Logos acril"] },
  { label: "Gifting premium", icon: "🎁", items: ["Cutii cadou gravate", "Trofee personalizate", "Rame foto", "Agende leather", "Portofele gravate", "Seturi corporate"] },
  { label: "Retail branding", icon: "🏪", items: ["Etichete produse", "Display-uri produs", "Standuri acril", "Prețiere premium", "Packagig personalizat", "Pop-up cards"] },
  { label: "Corporate kits", icon: "💼", items: ["Kit onboarding", "Carduri acril", "Insigne personalizate", "Suportul prezentări", "Dosare gravate", "Sticle personalizate"] },
  { label: "Prototipare", icon: "⚙️", items: ["Modele scale 1:1", "Piese funcționale", "Forme personalizate", "Testare materiale", "Jigs & fixtures", "Decupaje precise"] },
  { label: "Serii scurte", icon: "📦", items: ["10–500 bucăți", "Producție rapidă", "Control calitate", "Mix materiale", "Varietate finisaje", "Livrare curier"] },
  { label: "Cutii personalizate", icon: "📮", items: ["Cutii rigide MDF", "Cutii acril", "Casete bijuterii", "Packaging luxos", "Cutiuțe condimente", "Wine boxes"] },
  { label: "Ediții limitate", icon: "⭐", items: ["Numerotare unică", "Certificate autenticitate", "Branding exclusiv", "Colecții sezoniere", "Colaborări artă", "Tiraje mici"] },
];
const MATERIALS = ["Lemn", "MDF", "Acril", "Sticlă", "Piele", "Anodizat", "Plute", "Aluminiu", "Cauciuc", "Silicon"];
const FEATURES = [
  { icon: "🎯", text: "Fiabilitate producție repetată" },
  { icon: "✂️", text: "Linii curate la dimensiuni mici" },
  { icon: "📦", text: "Loturi mixte — personalizare eficientă" },
  { icon: "🎨", text: "Integrare ușoară în identitate vizuală" },
];

export default function MaterialeSection() {
  const [ref, inView] = useInView(0.1);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="resp-section-80" style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto", background: "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(249,115,22,0.15) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(249,115,22,0.08) 0%, transparent 55%)" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Laser CO₂ profesional</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
          Categorii rapide<br />pentru gravură personalizată
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28, opacity: inView ? 1 : 0, transition: "opacity .7s .15s" }}>
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              background: activeTab === i ? "rgba(249,115,22,.12)" : "transparent",
              color: activeTab === i ? "var(--accent)" : "var(--text-secondary)",
              border: `1px solid ${activeTab === i ? "rgba(249,115,22,.3)" : "transparent"}`,
              borderRadius: 7, padding: "8px 16px", fontSize: 12, fontWeight: 500,
              cursor: "pointer", fontFamily: "var(--font-dm-sans)", transition: "all 0.18s",
              whiteSpace: "nowrap",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="grid-2-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, opacity: inView ? 1 : 0, transition: "opacity .7s .25s", marginBottom: 32 }}>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 12, padding: 24 }}>
          <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 20, letterSpacing: "0.03em", marginBottom: 16, color: "#fff" }}>
            {TABS[activeTab].icon} {TABS[activeTab].label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TABS[activeTab].items.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 8, padding: "11px 14px", transition: "border-color 0.2s" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 12, padding: 24, marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Materiale compatibile</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {MATERIALS.map(m => (
                <span key={m} className="material-chip">{m}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {FEATURES.map(f => (
              <div key={f.text} className="feature-card has-icon-pop" style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span className="icon-pop" style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", opacity: inView ? 1 : 0, transition: "opacity .7s .35s" }}>
        <Link href="/contact" className="btn-primary">Cere ofertă gravare laser →</Link>
      </div>
    </section>
  );
}
