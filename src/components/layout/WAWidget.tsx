"use client";
import { useState, useEffect } from "react";

export default function WAWidget() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" aria-label="Chat pe WhatsApp"
      className="wa-widget"
      style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,.35)", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity .4s, transform .4s" }}>
      📱
    </a>
  );
}
