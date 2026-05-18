"use client";
import { useRef, useCallback } from "react";
import Image from "next/image";
import type { BeforeAfterItem } from "@/lib/data/beforeAfter";
import { useInView } from "@/hooks/useInView";
import SliderResults from "./SliderResults";

interface MegaSliderProps {
  item: BeforeAfterItem;
  index: number;
}

export default function MegaSlider({ item, index }: MegaSliderProps) {
  const [ref, inView] = useInView(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const rafId = useRef<number>(0);
  const currentPct = useRef(40);

  const applyPos = useCallback((pct: number) => {
    const clamped = Math.max(0, Math.min(100, pct));
    currentPct.current = clamped;
    if (afterRef.current) {
      afterRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }
  }, []);

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return 40;
    const rect = containerRef.current.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  const onMove = useCallback((clientX: number) => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => applyPos(getPos(clientX)));
  }, [applyPos, getPos]);

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
        role="slider"
        tabIndex={0}
        aria-label={`Comparație înainte/după: ${item.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={40}
        onMouseDown={(e) => { dragging.current = true; e.preventDefault(); }}
        onMouseMove={(e) => { if (dragging.current) onMove(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => { dragging.current = true; e.preventDefault(); }}
        onTouchMove={(e) => { if (dragging.current) onMove(e.touches[0].clientX); }}
        onTouchEnd={() => { dragging.current = false; }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            applyPos(currentPct.current - 5);
          } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            applyPos(currentPct.current + 5);
          } else if (e.key === "Home") {
            e.preventDefault();
            applyPos(0);
          } else if (e.key === "End") {
            e.preventDefault();
            applyPos(100);
          }
        }}
        className="ba-slider"
        style={{ position: "relative", height: 420, cursor: "ew-resize", userSelect: "none", borderRadius: 16, overflow: "hidden", border: "1px solid var(--bg-border)", touchAction: "none", outline: "none" }}
      >
        {/* BEFORE */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src={item.before} alt={`Înainte — ${item.title}`} fill sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: "cover" }} />
        </div>

        {/* AFTER clipped — initial clipPath matches initial handle pos (40%) */}
        <div
          ref={afterRef}
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "inset(0 60% 0 0)",
            willChange: "clip-path",
          }}
        >
          <Image src={item.after} alt={`După — ${item.title}`} fill sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: "cover" }} />
        </div>

        {/* Vertical divider handle */}
        <div
          ref={handleRef}
          style={{ position: "absolute", top: 0, bottom: 0, left: "40%", width: 2, background: "var(--accent)", transform: "translateX(-50%)", zIndex: 10, willChange: "left" }}
        >
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
