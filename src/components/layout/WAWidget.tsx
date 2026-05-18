"use client";
import { useState, useEffect } from "react";

const ACTIONS = [
  { icon: "✉", label: "Cere ofertă", bg: "var(--accent)", href: "/contact" },
  { icon: "📱", label: "WhatsApp", bg: "#25D366", href: "https://wa.me/40779281047", external: true },
  { icon: "📞", label: "Sună acum", bg: "#1E1E1E", href: "tel:0779281047" },
];

export default function WAWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(28);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function updateOffset() {
      const banner = document.querySelector(".cookie-banner-wrap");
      if (banner) {
        setBottomOffset(banner.getBoundingClientRect().height + 16);
      } else {
        setBottomOffset(28);
      }
    }
    updateOffset();
    const observer = new MutationObserver(updateOffset);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div
      className="wa-widget"
      style={{
        position: "fixed",
        bottom: bottomOffset,
        right: 28,
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity .4s, transform .4s",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}
    >
      {ACTIONS.map((action, i) => (
        <div
          key={action.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: open ? 1 : 0,
            transform: open ? "none" : "translateY(8px)",
            transition: `opacity .2s ${i * 0.06}s, transform .2s ${i * 0.06}s`,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <span style={{
            background: "rgba(20,20,20,.92)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--bg-border)",
          }}>
            {action.label}
          </span>
          <a
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
            aria-label={action.label}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: action.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,.35)",
              flexShrink: 0,
            }}
          >
            {action.icon}
          </a>
        </div>
      ))}

      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        aria-label="Contact rapid"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: open ? "var(--bg-elevated)" : "var(--accent)",
          border: open ? "1px solid var(--bg-border)" : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: open ? 20 : 26,
          boxShadow: "0 4px 20px rgba(249,115,22,.35)",
          transition: "background .25s, border .25s, font-size .2s",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {open ? "✕" : "📞"}
      </button>
    </div>
  );
}
