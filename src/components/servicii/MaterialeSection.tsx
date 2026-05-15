"use client";
import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

const TABS = [
  { label: "Semnalistic\u0103", icon: "\uD83E\uDEA7", items: ["Pl\u0103cu\u021be firme", "Litere volumetrice", "Indicatoare direc\u021bionale", "Pl\u0103ci informative", "Numere apartament", "Logos acril"] },
  { label: "Gifting premium", icon: "\uD83C\uDF81", items: ["Cutii cadou gravate", "Trofee personalizate", "Rame foto", "Agende leather", "Portofele gravate", "Seturi corporate"] },
  { label: "Retail branding", icon: "\uD83C\uDFEA", items: ["Etichete produse", "Display-uri produs", "Standuri acril", "Pre\u021biere premium", "Packagig personalizat", "Pop-up cards"] },
  { label: "Corporate kits", icon: "\uD83D\uDCBC", items: ["Kit onboarding", "Carduri acril", "Insigne personalizate", "Suportul prezent\u0103ri", "Dosare gravate", "Sticle personalizate"] },
  { label: "Prototipare", icon: "\u2699\uFE0F", items: ["Modele scale 1:1", "Piese func\u021bionale", "Forme personalizate", "Testare materiale", "Jigs & fixtures", "Decup\u0103je precise"] },
  { label: "Serii scurte", icon: "\uD83D\uDCE6", items: ["10\u2013500 buc\u0103\u021bi", "Produc\u021bie rapid\u0103", "Control calitate", "Mix materiale", "Varietate finisaje", "Livrare curier"] },
  { label: "Cutii personalizate", icon: "\uD83D\uDCEE", items: ["Cutii rigide MDF", "Cutii acril", "Casete bijuterii", "Packaging luxos", "Cutiu\u021be condimente", "Wine boxes"] },
  { label: "Edi\u021bii limitate", icon: "\u2B50", items: ["Numerotare unic\u0103", "Certificate autenticitate", "Branding exclusiv", "Colec\u021bii sezoniere", "Colabor\u0103ri art\u0103", "Tiraje mici"] },
];
const MATERIALS = ["Lemn", "MDF", "Acril", "Sticl\u0103", "Piele", "Anodizat", "Plute", "Aluminiu", "Cauciuc", "Silicon"];
const FEATURES = [
  { icon: "\uD83C\uDFAF", text: "Fiabilitate produc\u021bie repetat\u0103" },
  { icon: "\u2702\uFE0F", text: "Linii curate la dimensiuni mici" },
  { icon: "\uD83D\uDCE6", text: "Loturi mixte \u2014 personalizare eficient\u0103" },
  { icon: "\uD83C\uDFA8", text: "Integrare u\u0219oar\u0103 \u00Een identitate vizual\u0103" },
];

export default function MaterialeSection() {
  const [ref, inView] = useInView(0.1);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Laser CO\u2082 profesional</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
          Categorii rapide<br />pentru gravur\u0103 personalizat\u0103
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, opacity: inView ? 1 : 0, transition: "opacity .7s .25s", marginBottom: 32 }}>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 12, padding: 24 }}>
          <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 20, letterSpacing: "0.03em", marginBottom: 16, color: "#fff" }}>
            {TABS[activeTab].icon} {TABS[activeTab].label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TABS[activeTab].items.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 8, padding: "11px 14px", transition: "border-color 0.2s" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>\u25B8</span>
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
                <span key={m} style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--bg-border)", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 500 }}>{m}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {FEATURES.map(f => (
              <div key={f.text} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 10, padding: "14px 12px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", opacity: inView ? 1 : 0, transition: "opacity .7s .35s" }}>
        <button className="btn-primary">Cere ofert\u0103 gravare laser \u2192</button>
      </div>
    </section>
  );
}
