"use client";
import React, { useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface SliderProps {
  before: string;
  after: string;
  title: string;
  surface: string;
  duration: string;
  desc: string;
}

function BeforeAfterSlider({ before, after, title, surface, duration, desc }: SliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPos = (clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  };

  const onMouseDown = () => {
    dragging.current = true;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) setPos(getPos(e.clientX));
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => setPos(getPos(e.touches[0].clientX));

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--bg-border)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        style={{
          position: "relative",
          height: 260,
          cursor: "ew-resize",
          userSelect: "none",
          overflow: "hidden",
          background: "var(--bg-elevated)",
        }}
      >
        {/* BEFORE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${before})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* AFTER — clipped */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${after})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        />
        {/* Handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            width: 2,
            background: "var(--accent)",
            zIndex: 10,
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--accent)",
              border: "3px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            ↔
          </div>
        </div>
        {/* Labels */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: 5,
            padding: "3px 10px",
            fontSize: 11,
            color: "var(--text-secondary)",
            fontWeight: 500,
          }}
        >
          ÎNAINTE
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "rgba(249,115,22,0.2)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(249,115,22,0.4)",
            borderRadius: 5,
            padding: "3px 10px",
            fontSize: 11,
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          DUPĂ
        </div>
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              background: "var(--bg-elevated)",
              borderRadius: 4,
              padding: "3px 8px",
            }}
          >
            Suprafață: {surface}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              background: "var(--bg-elevated)",
              borderRadius: 4,
              padding: "3px 8px",
            }}
          >
            Durată: {duration}
          </span>
        </div>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            letterSpacing: "0.03em",
            marginBottom: 6,
            color: "#fff",
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

const comparisons = [
  {
    title: "Recepție clinică",
    surface: "Perete lavabil",
    duration: "1 zi",
    desc: "Transformare completă a recepției într-un spațiu modern și memorabil — de la perete simplu la identitate vizuală clară.",
    before: "/assets/before-after/dental-clinic-reception-before.png",
    after: "/assets/before-after/dental-clinic-reception-after.png",
  },
  {
    title: "Showroom auto",
    surface: "MDF",
    duration: "6 ore",
    desc: "Accent vizual de brand pentru showroom — experiență mai puternică pentru clienți și imagine premium.",
    before: "/assets/before-after/showroom-car-before.png",
    after: "/assets/before-after/showroom-car-after.png",
  },
  {
    title: "Birou creativ",
    surface: "Perete gletuit",
    duration: "1 zi",
    desc: "Spațiu creativ personalizat pentru echipă și clienți — grafică motivațională și identitate vizuală care inspiră.",
    before: "/assets/before-after/office-before.png",
    after: "/assets/before-after/office-after.png",
  },
];

export default function BeforeAfterPreview() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section"
      style={{
        padding: "96px 40px",
        position: "relative",
        background: "radial-gradient(ellipse 45% 80% at 0% 50%, rgba(30,30,40,0.6) 0%, transparent 60%), radial-gradient(ellipse 45% 80% at 100% 50%, rgba(249,115,22,0.06) 0%, transparent 60%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 20%, transparent 50%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
            marginBottom: 56,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--accent)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Transformări reale
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 56px)",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
                marginBottom: 12,
              }}
            >
              Înainte / După
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              Transformări reale pentru spații comerciale, birouri și locații premium. Trage
              handlerul pentru a compara.
            </p>
          </div>
          <a
            href="#"
            style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
          >
            Vezi toate transformările →
          </a>
        </div>

        <div className="grid-sliders" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {comparisons.map((c, i) => (
            <div
              key={i}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(28px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}
            >
              <BeforeAfterSlider {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
