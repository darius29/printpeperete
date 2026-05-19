"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const FEATURES = ["Rezoluție 2880 DPI", "Culori UV durabile", "Fără autocolant", "Execuție curată", "Garanție inclus"];

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (!modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, []);

  const serviceIcon =
    project.service === "Wall Print UV" ? "🖨️"
    : project.service === "Print Textile" ? "👕"
    : project.service === "Gravare Laser CO₂" ? "⚡"
    : "🎁";

  const catLabel = project.cat.charAt(0).toUpperCase() + project.cat.slice(1);

  const detailStats = [
    { label: "Durată execuție", val: project.duration, icon: "⏱" },
    { label: "Categorie", val: catLabel, icon: "🏷" },
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div ref={modalRef} className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Visual header */}
        <div style={{
          height: 320,
          background: project.color,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 900px) 100vw, 800px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,.05) 0%, transparent 60%)",
              }} />
              <div style={{
                opacity: 0.15,
                fontFamily: "var(--font-display)",
                fontSize: 72,
                letterSpacing: "0.05em",
                color: "#fff",
              }}>
                {serviceIcon}
              </div>
            </>
          )}
          <button
            onClick={onClose}
            aria-label="Închide"
            style={{
              position: "absolute", top: 16, right: 16,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,.5)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "#fff", fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", gap: 6 }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontSize: 11,
                background: "rgba(0,0,0,.5)",
                backdropFilter: "blur(6px)",
                color: "#fff",
                borderRadius: 5,
                padding: "3px 10px",
                fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px" }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{
                fontSize: 11, color: "var(--accent)", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6,
              }}>
                {project.service}
              </div>
              <h2 id="modal-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 28, letterSpacing: "0.03em", color: "#fff", lineHeight: 1,
              }}>
                {project.title}
              </h2>
            </div>
            <div style={{
              background: "rgba(249,115,22,.08)",
              border: "1px solid rgba(249,115,22,.2)",
              borderRadius: 10, padding: "10px 16px",
              textAlign: "center", flexShrink: 0,
            }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 2 }}>Suprafață</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--accent)", letterSpacing: "0.02em" }}>
                {project.area}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 24 }} className="grid-3-modal-stats">
            {detailStats.map((s) => (
              <div key={s.label} style={{ background: "#1E1E1E", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{
            background: "#1a1a1a", borderRadius: 10, padding: "16px 18px",
            marginBottom: 24, border: "1px solid #2A2A2A",
          }}>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>
              Proiect realizat —{" "}
              {project.service.toLowerCase()} pe o suprafață de{" "}
              <strong style={{ color: "var(--accent)" }}>{project.area}</strong>, finalizat în{" "}
              <strong style={{ color: "#fff" }}>{project.duration}</strong>. Executat cu echipament UV de
              înaltă rezoluție, rezultând culori vii, detalii fine și finisaj durabil, adaptat perfect
              spațiului și identității vizuale a clientului.
            </p>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {FEATURES.map((f) => (
              <span key={f} style={{
                fontSize: 12, background: "#141414", color: "var(--text-secondary)",
                border: "1px solid #2A2A2A", borderRadius: 6, padding: "5px 12px",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ color: "var(--accent)" }}>✓</span>{f}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/contact" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Cere ofertă similară →
            </Link>
            <button className="btn-outline" style={{ justifyContent: "center" }} onClick={onClose}>
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
