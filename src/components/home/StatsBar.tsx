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
        padding: "40px 28px 36px",
        borderRight: index < 3 ? "1px solid var(--bg-border)" : "none",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--text-tertiary)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.1em",
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: 24,
          height: 1,
          background: "var(--accent)",
          marginBottom: 14,
          opacity: 0.55,
        }}
      />
      <div
        className="stat-num"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 72,
          lineHeight: 0.9,
          letterSpacing: "0.01em",
          color: "var(--accent)",
        }}
      >
        {val}{suffix}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const [ref, inView] = useInView(0.3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-divider"
      style={{
        background: "radial-gradient(ellipse 140% 70% at 50% 50%, rgba(249,115,22,0.14) 0%, transparent 65%), var(--bg-surface)",
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
