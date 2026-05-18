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
      className="cookie-banner-wrap"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(18,18,18,0.97)",
        borderTop: "1px solid var(--bg-border, #2A2A2A)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="cookie-bar" style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 40px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "var(--text-secondary, #9CA3AF)",
            lineHeight: 1.5,
            fontFamily: "var(--font-ui, DM Sans, sans-serif)",
          }}
        >
          Folosim cookie-uri pentru a îmbunătăți experiența ta.{" "}
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
        <div className="cookie-bar-btns">
          <button
            onClick={handleAcceptAll}
            style={{
              background: "var(--accent, #F97316)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r-md, 8px)",
              padding: "8px 18px",
              fontSize: 13,
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
              padding: "8px 18px",
              fontSize: 13,
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
