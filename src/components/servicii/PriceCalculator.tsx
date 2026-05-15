"use client";
import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

type ServiceKey = "wall" | "laser" | "textile" | "objects";
type QualityKey = "standard" | "premium" | "pro";

interface ServiceCfg {
  label: string;
  icon: string;
  unit: string;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  materials: string[];
  basePrice: Record<QualityKey, number>;
  desc: string;
}

const SERVICE_CONFIG: Record<ServiceKey, ServiceCfg> = {
  wall: {
    label: "Wall Print UV", icon: "\uD83D\uDDA8\uFE0F",
    unit: "m\u00B2", unitLabel: "Suprafa\u021b\u0103 (m\u00B2)",
    min: 1, max: 30, step: 0.5,
    materials: ["Perete tencuit", "Perete lavabil", "MDF", "Sticl\u0103", "Metal", "Gresie"],
    basePrice: { standard: 45, premium: 68, pro: 95 },
    desc: "Pre\u021b per m\u00B2 \u00B7 Pre\u021bul final depinde de suprafa\u021b\u0103 \u0219i complexitatea designului",
  },
  laser: {
    label: "Gravare laser CO\u2082", icon: "\u26A1",
    unit: "piese", unitLabel: "Cantitate (piese)",
    min: 1, max: 100, step: 1,
    materials: ["Lemn / MDF", "Acril", "Piele", "Sticl\u0103", "Anodizat", "Plute"],
    basePrice: { standard: 25, premium: 40, pro: 65 },
    desc: "Pre\u021b per pies\u0103 \u00B7 Variaz\u0103 \u00Een func\u021bie de complexitate \u0219i material",
  },
  textile: {
    label: "Print textile", icon: "\uD83D\uDC55",
    unit: "buc", unitLabel: "Cantitate (buc\u0103\u021bi)",
    min: 1, max: 200, step: 1,
    materials: ["Tricou bumbac", "Tricou poliester", "Hanorac", "\u015Aapc\u0103", "Geant\u0103 textil\u0103", "\u015Eort"],
    basePrice: { standard: 35, premium: 50, pro: 75 },
    desc: "Pre\u021b per buc\u0103t\u0103 \u00B7 Discount progresiv la comenzi \u2265 10 buc",
  },
  objects: {
    label: "Obiecte personalizate", icon: "\uD83C\uDF81",
    unit: "buc", unitLabel: "Cantitate (buc\u0103\u021bi)",
    min: 1, max: 500, step: 1,
    materials: ["Can\u0103 ceramic\u0103", "Hus\u0103 telefon", "Cutie cadou", "Agend\u0103", "Pix gravat", "Trofeu"],
    basePrice: { standard: 20, premium: 32, pro: 48 },
    desc: "Pre\u021b per buc\u0103t\u0103 \u00B7 Discount la cantitate \u00B7 Ambalare inclus\u0103",
  },
};

function calcPrice(cfg: ServiceCfg, qty: number, quality: QualityKey) {
  const base = cfg.basePrice[quality];
  let price = base * qty;
  if (qty >= 50) price *= 0.82;
  else if (qty >= 20) price *= 0.88;
  else if (qty >= 10) price *= 0.93;
  const designFee = quality === "pro" ? 0 : quality === "premium" ? 80 : 120;
  return { subtotal: Math.round(price), design: designFee, total: Math.round(price) + designFee };
}

export default function PriceCalculator() {
  const [ref, inView] = useInView(0.08);
  const [service, setService] = useState<ServiceKey>("wall");
  const [qty, setQty] = useState(6);
  const [quality, setQuality] = useState<QualityKey>("standard");
  const [material, setMaterial] = useState("Perete tencuit");
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);

  const cfg = SERVICE_CONFIG[service];
  const prices = calcPrice(cfg, qty, quality);
  const sliderPct = ((qty - cfg.min) / (cfg.max - cfg.min)) * 100;

  function handleCalculate() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setCalculated(true); }, 900);
  }

  function handleServiceChange(k: ServiceKey) {
    setService(k);
    setCalculated(false);
    setQty(SERVICE_CONFIG[k].min);
    setMaterial(SERVICE_CONFIG[k].materials[0]);
  }

  const stepNum = (n: string) => (
    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
  );

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="calculator" style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "96px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Estimare instant\u0103</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px,5vw,60px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
              Calculator<br />pre\u021b estimativ
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 480 }}>
              Ob\u021bine o estimare rapid\u0103 pentru proiectul t\u0103u. Pre\u021bul final se stabile\u0219te dup\u0103 consultan\u021b\u0103 gratuit\u0103.
            </p>
          </div>
          <div style={{ background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.2)", borderRadius: 12, padding: "14px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Consultan\u021b\u0103 gratuit\u0103</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>R\u0103spuns \u00Een max 24h dup\u0103 trimitere</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, opacity: inView ? 1 : 0, transition: "opacity .7s .2s" }}>
          {/* Left: controls */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 16, padding: 32 }}>
            {/* Step 1: Service */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                {stepNum("1")}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Alege serviciul</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {(Object.entries(SERVICE_CONFIG) as [ServiceKey, ServiceCfg][]).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => handleServiceChange(k)}
                    style={{
                      background: service === k ? "rgba(249,115,22,.1)" : "var(--bg-surface)",
                      border: `1px solid ${service === k ? "var(--accent)" : "var(--bg-border)"}`,
                      borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                      fontFamily: "var(--font-dm-sans)", transition: "all 0.2s",
                      textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{v.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: service === k ? "var(--accent)" : "var(--text-secondary)", letterSpacing: "0.03em", lineHeight: 1.3 }}>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Material */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                {stepNum("2")}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Material / Produs</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cfg.materials.map(m => (
                  <button
                    key={m}
                    onClick={() => { setMaterial(m); setCalculated(false); }}
                    style={{
                      background: material === m ? "rgba(249,115,22,.12)" : "#1E1E1E",
                      color: material === m ? "var(--accent)" : "var(--text-secondary)",
                      border: `1px solid ${material === m ? "var(--accent)" : "var(--bg-border)"}`,
                      borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 500,
                      cursor: "pointer", fontFamily: "var(--font-dm-sans)", transition: "all .15s",
                    }}
                  >{m}</button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                {stepNum("3")}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>{cfg.unitLabel}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
                <input
                  type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={qty}
                  style={{
                    flex: 1, accentColor: "var(--accent)", cursor: "pointer",
                    height: 4, borderRadius: 2, outline: "none", border: "none",
                    background: `linear-gradient(to right, var(--accent) ${sliderPct}%, var(--bg-border) ${sliderPct}%)`,
                  }}
                  onChange={e => { setQty(Number(e.target.value)); setCalculated(false); }}
                />
                <div style={{ background: "#1E1E1E", border: "1px solid var(--bg-border)", borderRadius: 8, padding: "8px 14px", minWidth: 80, textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 22, color: "var(--accent)", letterSpacing: "0.02em" }}>{qty}</span>
                  <span style={{ fontSize: 11, color: "#6B7280", marginLeft: 4 }}>{cfg.unit}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#6B7280" }}>Min: {cfg.min} {cfg.unit}</span>
                {((service === "textile" && qty >= 10) || (service === "objects" && qty >= 20)) && (
                  <span style={{ fontSize: 11, color: "#22C55E" }}>\u2713 Discount cantitate activ</span>
                )}
                <span style={{ fontSize: 11, color: "#6B7280" }}>Max: {cfg.max} {cfg.unit}</span>
              </div>
            </div>

            {/* Step 4: Quality */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                {stepNum("4")}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Nivel serviciu</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {([
                  { k: "standard" as QualityKey, label: "Standard", price: `de la ${cfg.basePrice.standard} lei/${cfg.unit}`, desc: "Design basic inclus", popular: false },
                  { k: "premium" as QualityKey, label: "Premium", price: `de la ${cfg.basePrice.premium} lei/${cfg.unit}`, desc: "Design custom + revizii", popular: true },
                  { k: "pro" as QualityKey, label: "Pro", price: `de la ${cfg.basePrice.pro} lei/${cfg.unit}`, desc: "Dedicat brand enterprise", popular: false },
                ] as const).map(q => (
                  <button
                    key={q.k}
                    onClick={() => { setQuality(q.k); setCalculated(false); }}
                    style={{
                      background: quality === q.k ? "rgba(249,115,22,.08)" : "#1E1E1E",
                      border: `1px solid ${quality === q.k ? "var(--accent)" : "var(--bg-border)"}`,
                      borderRadius: 10, padding: "14px 12px", cursor: "pointer",
                      fontFamily: "var(--font-dm-sans)", textAlign: "left", transition: "all .2s",
                      position: "relative",
                    }}
                  >
                    {q.popular && (
                      <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap", letterSpacing: "0.05em" }}>POPULAR</span>
                    )}
                    <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 17, letterSpacing: "0.04em", color: quality === q.k ? "var(--accent)" : "#fff", marginBottom: 4 }}>{q.label}</div>
                    <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginBottom: 3 }}>{q.price}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{q.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              style={{
                width: "100%", background: "var(--accent)", color: "#fff", border: "none",
                borderRadius: 10, padding: "15px 24px", fontSize: 16, fontWeight: 700,
                cursor: loading ? "wait" : "pointer", fontFamily: "var(--font-dm-sans)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "background .2s, transform .15s", opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
                  Se calculeaz\u0103...
                </>
              ) : "Calculeaz\u0103 estimare \u2192"}
            </button>
            <p style={{ fontSize: 11, color: "#6B7280", textAlign: "center", marginTop: 10 }}>{cfg.desc}</p>
          </div>

          {/* Right: result panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              background: calculated ? "linear-gradient(135deg,var(--bg-surface),#1a1a1a)" : "var(--bg-surface)",
              border: `1px solid ${calculated ? "var(--accent)" : "var(--bg-border)"}`,
              borderRadius: 16, padding: 28, transition: "all .4s", flex: 1,
              boxShadow: calculated ? "0 0 40px rgba(249,115,22,.12)" : "none",
            }}>
              {!calculated ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "40px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 48, opacity: 0.3 }}>\uD83E\uDDF2</div>
                  <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, maxWidth: 240 }}>
                    Configureaz\u0103 op\u021biunile din st\u00E2nga \u0219i apas\u0103 &quot;Calculeaz\u0103&quot; pentru estimare.
                  </div>
                </div>
              ) : (
                <div style={{ animation: "fadeUp .4s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
                    <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimare calculat\u0103</span>
                  </div>
                  {/* Summary */}
                  <div style={{ background: "var(--bg-void)", borderRadius: 10, padding: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sumar comand\u0103</div>
                    {[
                      ["Serviciu", cfg.label],
                      ["Material", material],
                      ["Cantitate", `${qty} ${cfg.unit}`],
                      ["Nivel", quality.charAt(0).toUpperCase() + quality.slice(1)],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #1a1a1a" }}>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{k}</span>
                        <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {/* Price breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Produc\u021bie ({qty} {cfg.unit})</span>
                      <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{prices.subtotal.toLocaleString("ro")} lei</span>
                    </div>
                    {prices.design > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Design / Preg\u0103tire fi\u0219iere</span>
                        <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{prices.design} lei</span>
                      </div>
                    )}
                    {((service === "textile" && qty >= 10) || (service === "objects" && qty >= 20) || (service === "laser" && qty >= 20)) && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#22C55E" }}>Discount cantitate</span>
                        <span style={{ fontSize: 14, color: "#22C55E", fontWeight: 600 }}>-{qty >= 50 ? "18%" : qty >= 20 ? "12%" : "7%"}</span>
                      </div>
                    )}
                    <div style={{ height: 1, background: "var(--bg-border)", margin: "4px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Total estimat</span>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 32, letterSpacing: "0.02em", color: "var(--accent)", lineHeight: 1 }}>
                          {prices.total.toLocaleString("ro")} <span style={{ fontSize: 18 }}>lei</span>
                        </div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>f\u0103r\u0103 TVA</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "rgba(249,115,22,.06)", border: "1px solid rgba(249,115,22,.15)", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginBottom: 3 }}>\u26A0 Estimare orientativ\u0103</div>
                    <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5 }}>Pre\u021bul final se stabile\u0219te dup\u0103 analiza proiectului. Consultan\u021ba este gratuit\u0103.</div>
                  </div>
                  <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: 13 }}>
                    Cere ofert\u0103 exact\u0103 \u2192
                  </button>
                  <button className="btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: 11, marginTop: 8 }}
                    onClick={() => setCalculated(false)}>
                    Recalculeaz\u0103
                  </button>
                </div>
              )}
            </div>
            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: "\u26A1", label: "R\u0103spuns rapid", desc: "Max 24h" },
                { icon: "\uD83C\uDFA8", label: "Design inclus", desc: "La Premium/Pro" },
                { icon: "\uD83D\uDCE6", label: "Livrare", desc: "48h standard" },
                { icon: "\u2713", label: "F\u0103r\u0103 surprize", desc: "Pre\u021b fix" },
              ].map(c => (
                <div key={c.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
