"use client";
import React from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function PortofoliuCTA() {
  const [ref, inView] = useInView(0.2);

  const trustPoints = ["Răspuns în max 24h", "Consultanță gratuită", "Fără angajament"];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="cta-section section-divider" style={{ padding: "0 40px 96px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="glow-pulse-border cta-card" style={{
          background: "radial-gradient(ellipse 140% 90% at 50% 50%, rgba(249,115,22,.14) 0%, transparent 65%), linear-gradient(135deg, var(--bg-surface), #1c1408)",
          border: "1px solid #2A2A2A",
          borderRadius: 20,
          padding: "64px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(28px)",
          transition: "opacity .8s, transform .8s",
        }}>
          {/* Decorative glows */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 400, height: 400,
            background: "radial-gradient(circle,rgba(249,115,22,.18) 0%,transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: 300, height: 300,
            background: "radial-gradient(circle,rgba(234,88,12,.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px,5vw,60px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 20,
            }}>
              Vrei un proiect<br />
              <span style={{ color: "var(--accent)" }}>similar?</span>
            </h2>

            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>
              Trimite-ne detaliile și construim împreună soluția vizuală perfectă pentru spațiul sau brandul tău.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                Cere ofertă personalizată →
              </Link>
              <Link href="/before-after" className="btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>
                ↳ Before / After
              </Link>
            </div>

            <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
              {trustPoints.map((t) => (
                <div key={t} style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#22C55E" }}>✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
