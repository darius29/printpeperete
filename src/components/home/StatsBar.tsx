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

function StatItem({
  target,
  suffix,
  label,
  index,
  inView,
}: {
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
        {val}
        {suffix}
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
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--bg-border)",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source
          src="/assets/videos/LoopSmallDustFlameParticle.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/videos/LoopSmallDustFlameParticle.mov"
          type="video/quicktime"
        />
      </video>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(12,12,12,0.80)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="resp-px"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="grid-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
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
