"use client";
import { Phone, MessageCircle, Mail } from "lucide-react";

const BUTTONS = [
  { icon: <Phone size={18} />, label: "Sună acum", bg: "var(--bg-elevated)", href: "tel:0779281047" },
  { icon: <MessageCircle size={18} />, label: "WhatsApp", bg: "#25D366", href: "https://wa.me/40779281047" },
  { icon: <Mail size={18} />, label: "Cere ofertă", bg: "var(--accent)", href: "/contact" },
];

export default function MobileBar() {
  return (
    <div className="mobile-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 98, background: "rgba(20,20,20,.97)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--bg-border)", display: "flex", gap: 8, padding: 10 }}>
      {BUTTONS.map((b) => (
        <a key={b.label} href={b.href} style={{ flex: 1, background: b.bg, color: "#fff", borderRadius: 9, padding: "10px 6px", fontSize: 12, fontWeight: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none" }}>
          {b.icon}
          <span>{b.label}</span>
        </a>
      ))}
    </div>
  );
}
