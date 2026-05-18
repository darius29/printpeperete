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
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return;

    // 1.5s delay before mounting
    const mountTimer = setTimeout(() => {
      setVisible(true);
      // Small delay after mounting for CSS transition to work
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
    }, 1500);

    return () => clearTimeout(mountTimer);
  }, []);

  function dismiss() {
    setShow(false);
    setTimeout(() => setVisible(false), 320); // wait for slide-out transition
  }

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "all");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    dismiss();
  }

  function handleNecessaryOnly() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    dismiss();
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
        bottom: 0,
        zIndex: 9999,
        background: "rgba(18,18,18,0.97)",
        borderTop: "1px solid var(--bg-border, #2A2A2A)",
        backdropFilter: "blur(12px)",
        transform: show ? "translateY(0)" : "translateY(100%)",
        opacity: show ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
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
