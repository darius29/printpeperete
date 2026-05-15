"use client";
import { useState, useRef } from "react";
import type { BeforeAfterItem } from "@/lib/data/beforeAfter";
import { useInView } from "@/hooks/useInView";
import SliderResults from "./SliderResults";

interface MegaSliderProps {
  item: BeforeAfterItem;
  index: number;
}

export default function MegaSlider({ item, index }: MegaSliderProps) {
  const [pos, setPos] = useState(40);
  const [ref, inView] = useInView(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<boolean>(false);

  const getPos = (clientX: number): number => {
    if (!containerRef.current) return pos;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(32px)",
        transition: `opacity .7s ${index * 0.15}s, transform .7s ${index * 0.15}s`,
        marginBottom: 64,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11, background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--bg-border)", borderRadius: 5, padding: "3px 10px" }}>
              Suprafață: {item.surface}
            </span>
            <span style={{ fontSize: 11, background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--bg-border)", borderRadius: 5, padding: "3px 10px" }}>
              Durată: {item.duration}
            </span>
            <span style={{ fontSize: 11, background: "rgba(249,115,22,.1)", color: "var(--accent)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 5, padding: "3px 10px" }}>
              {item.category}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "0.03em", color: "#fff", marginBottom: 6 }}>{item.title}</h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 640 }}>{item.desc}</p>
        </div>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 10, padding: "12px 16px", textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Transformare</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--accent)", letterSpacing: "0.02em" }}>100%</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>suprafata acoperita</div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        onMouseDown={() => { dragging.current = true; }}
        onMouseMove={(e) => { if (dragging.current) setPos(getPos(e.clientX)); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={() => { dragging.current = true; }}
        onTouchMove={(e) => setPos(getPos(e.touches[0].clientX))}
        onTouchEnd={() => { dragging.current = false; }}
        style={{ position: "relative", height: 420, cursor: "ew-resize", userSelect: "none", borderRadius: 16, overflow: "hidden", border: "1px solid var(--bg-border)" }}
      >
        {/* BEFORE */}
        <div style={{ position: "absolute", inset: 0, background: item.before }} />

        {/* AFTER clipped */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: item.after,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        />

        {/* Vertical divider handle */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: "var(--accent)", transform: "translateX(-50%)", zIndex: 10 }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--accent)",
            border: "3px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 2px 16px rgba(0,0,0,.5)",
            cursor: "ew-resize",
          }}>
            ↔
          </div>
        </div>

        {/* Labels */}
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", borderRadius: 7, padding: "5px 12px", fontSize: 12, color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.06em", zIndex: 5 }}>
          ÎNAINTE
        </div>
        <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(249,115,22,.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(249,115,22,.5)", borderRadius: 7, padding: "5px 12px", fontSize: 12, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.06em", zIndex: 5 }}>
          DUPĂ
        </div>

        {/* Hint */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "rgba(255,255,255,.5)", whiteSpace: "nowrap", zIndex: 5 }}>
          ← Trage pentru comparație →
        </div>
      </div>

      {/* Results */}
      <SliderResults results={item.results} />
    </div>
  );
}
