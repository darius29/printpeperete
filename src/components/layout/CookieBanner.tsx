"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "sdg_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "all");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setVisible(false);
  }

  function handleNecessaryOnly() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consimțământ cookie-uri"
      style={{
        position: "fixed",
        bottom: 80,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "var(--bg-elevated, #1E1E1E)",
          border: "1px solid var(--bg-border, #2A2A2A)",
          borderRadius: "var(--r-lg, 12px)",
          padding: "20px 24px",
          maxWidth: 680,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          pointerEvents: "auto",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "var(--text-secondary, #9CA3AF)",
              lineHeight: 1.6,
              fontFamily: "var(--font-ui, DM Sans, sans-serif)",
            }}
          >
            Folosim cookie-uri pentru a îmbunătăți experiența ta pe site. Poți
            accepta toate cookie-urile sau doar pe cele strict necesare.{" "}
            <Link
              href="/politica-de-cookies"
              style={{
                color: "var(--accent, #F97316)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Politica de cookies
            </Link>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleAcceptAll}
            style={{
              background: "var(--accent, #F97316)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r-md, 8px)",
              padding: "10px 20px",
              fontSize: 14,
              fontFamily: "var(--font-ui, DM Sans, sans-serif)",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Acceptă toate
          </button>
          <button
            onClick={handleNecessaryOnly}
            style={{
              background: "transparent",
              color: "var(--text-secondary, #9CA3AF)",
              border: "1px solid var(--bg-border, #2A2A2A)",
              borderRadius: "var(--r-md, 8px)",
              padding: "10px 20px",
              fontSize: 14,
              fontFamily: "var(--font-ui, DM Sans, sans-serif)",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Doar necesare
          </button>
        </div>
      </div>
    </div>
  );
}
