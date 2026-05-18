"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

const stats = [
  { target: 2880, suffix: " DPI", label: "Rezoluție maximă" },
  { target: 48, suffix: "h", label: "Livrare standard" },
  { target: 290, suffix: " cm", label: "Înălțime maximă" },
  { target: 10, suffix: "+", label: "Materiale compatibile" },
];

function StatItem({ target, suffix, label, index, inView }: {
  target: number;
  suffix: string;
  label: string;
  index: number;
  inView: boolean;
}) {
  const val = useCounter(target, 1600, inView);
  return (
    <div
      className={`stat-item fade-up stagger-${index + 1} ${inView ? "is-visible" : ""}`}
      style={{
        padding: "36px 24px",
        textAlign: "center",
        borderRight: index < 3 ? "1px solid var(--bg-border)" : "none",
      }}
    >
      <div
        className="stat-num"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 48,
          lineHeight: 1,
          letterSpacing: "0.02em",
          background: "linear-gradient(135deg, #F97316, #EA580C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {val}{suffix}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--text-tertiary)",
          marginTop: 6,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const [ref, inView] = useInView(0.3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(249,115,22,0.14) 0%, transparent 70%), linear-gradient(135deg, #141414 0%, #161210 100%)",
        borderTop: "1px solid var(--bg-border)",
        borderBottom: "1px solid var(--bg-border)",
        padding: "0",
      }}
    >
      <div className="resp-px" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div className="grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s, i) => (
            <StatItem
              key={i}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
