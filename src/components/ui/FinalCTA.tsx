"use client";
import React from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

interface FinalCTAProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export default function FinalCTA({ title, titleAccent, subtitle, primaryLabel, secondaryLabel }: FinalCTAProps) {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="cta-section"
      style={{ padding: "0 40px 96px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="glow-pulse-border cta-card"
          style={{
            background: "linear-gradient(135deg,#141414,#1a1a1a)",
            border: "1px solid var(--bg-border)",
            borderRadius: 20,
            padding: "64px 56px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center" as const,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(28px)",
            transition: "opacity .8s, transform .8s",
          }}
        >
          <div
            style={{
              position: "absolute", top: 0, right: 0,
              width: 400, height: 400,
              background: "radial-gradient(circle,rgba(249,115,22,.18) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0,
              width: 300, height: 300,
              background: "radial-gradient(circle,rgba(234,88,12,.12) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5vw,60px)",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
                marginBottom: 20,
              }}
            >
              {title}
              <br />
              <span style={{ color: "var(--accent)" }}>{titleAccent}</span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>
              {subtitle}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" as const }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                {primaryLabel}
              </Link>
              <Link href="/portofoliu" className="btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
