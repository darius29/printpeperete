"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Acasă",        href: "/",            desc: "Pagina principală" },
  { label: "Servicii",     href: "/servicii",     desc: "Wall Print · Laser · Textile" },
  { label: "Portofoliu",   href: "/portofoliu",   desc: "Proiecte și lucrări reale" },
  { label: "Before/After", href: "/before-after", desc: "Comparații înainte/după" },
  { label: "Despre Noi",   href: "/despre-noi",   desc: "Echipă, echipamente, valori" },
  { label: "Contact",      href: "/contact",      desc: "Ofertă · Program · Locație" },
];

// ─── BURGER BUTTON ────────────────────────────────────────────────────────────
function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Închide meniu" : "Deschide meniu"}
      aria-expanded={open}
      style={{
        width: 44, height: 44,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: open ? "rgba(249,115,22,.08)" : "transparent",
        border: `1px solid ${open ? "#F97316" : "#2A2A2A"}`,
        borderRadius: 10, cursor: "pointer", padding: 10,
        transition: "border-color .2s, background .2s",
        flexShrink: 0,
      }}
    >
      <span style={{
        display: "block", height: 2, width: 20, background: "#fff",
        borderRadius: 2, transformOrigin: "center",
        animation: open
          ? "line1Open .3s cubic-bezier(0.25,0.46,0.45,0.94) both"
          : "line1Close .3s cubic-bezier(0.25,0.46,0.45,0.94) both",
        marginBottom: 5,
      }} />
      <span style={{
        display: "block", height: 2, background: "#F97316",
        borderRadius: 2, transformOrigin: "center",
        animation: open
          ? "line2Open .2s ease both"
          : "line2Close .3s .1s ease both",
        marginBottom: 5,
      }} />
      <span style={{
        display: "block", height: 2, width: 20, background: "#fff",
        borderRadius: 2, transformOrigin: "center",
        animation: open
          ? "line3Open .3s cubic-bezier(0.25,0.46,0.45,0.94) both"
          : "line3Close .3s cubic-bezier(0.25,0.46,0.45,0.94) both",
      }} />
    </button>
  );
}

// ─── MOBILE MENU PANEL ────────────────────────────────────────────────────────
function MobileMenuPanel({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) { setClosing(false); setMounted(true); }
    else if (mounted) {
      setClosing(true);
      const t = setTimeout(() => { setMounted(false); setClosing(false); }, 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 150,
          background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
          animation: closing ? "menuOverlayOut .3s ease both" : "menuOverlayIn .25s ease both",
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 92vw)", zIndex: 151,
          background: "#0C0C0C",
          borderLeft: "1px solid #2A2A2A",
          display: "flex", flexDirection: "column",
          animation: closing ? "panelOut .32s cubic-bezier(0.55,0,1,0.45) both" : "panelIn .35s cubic-bezier(0.25,0.46,0.45,0.94) both",
          overflowY: "auto",
        }}
      >
        {/* Grain texture */}
        <div style={{
          position: "absolute", inset: "-50%", width: "200%", height: "200%",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: .8, animation: "grain 8s steps(2) infinite", pointerEvents: "none",
        }} />

        {/* Accent glow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, background: "radial-gradient(circle at top right, rgba(249,115,22,.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Panel Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #1a1a1a", position: "relative", flexShrink: 0 }}>
          <Link href="/" onClick={onClose} style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.06em", textDecoration: "none", color: "#fff" }}>
            SDG <span style={{ color: "#F97316" }}>PRINT</span> & Design
          </Link>
          <button
            onClick={onClose}
            aria-label="Închide meniu"
            style={{ width: 36, height: 36, borderRadius: 9, background: "#1E1E1E", border: "1px solid #2A2A2A", color: "#9CA3AF", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#2A2A2A"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1E1E1E"; (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}
          >×</button>
        </div>

        {/* Main Nav Links */}
        <nav style={{ padding: "12px 0", flexShrink: 0 }}>
          {NAV_LINKS.map((l, i) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mob-link${isActive ? " active" : ""}`}
                onClick={onClose}
                style={{ animation: `linkIn .35s ${.05 + i * .06}s both` }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #111" }}>
                  <div className="mob-link-inner" style={{ flex: 1 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "0.03em", color: isActive ? "#F97316" : "#fff", lineHeight: 1.1, transition: "color .2s" }}>
                        {l.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#4B5563", marginTop: 3, lineHeight: 1.4 }}>{l.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 8px #F97316", flexShrink: 0 }} />}
                    <span style={{ fontSize: 16, color: isActive ? "#F97316" : "#2A2A2A", transition: "color .2s" }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid #1a1a1a", flexShrink: 0, animation: "linkIn .4s .45s both" }}>
          <Link href="/contact" onClick={onClose} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#F97316", color: "#fff", textDecoration: "none",
            borderRadius: 10, padding: "15px 20px", fontSize: 15, fontWeight: 700,
            fontFamily: "var(--font-ui)", marginBottom: 10,
            animation: "pulse-ring 2.5s infinite", transition: "background .2s",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#EA580C"; el.style.animation = "none"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#F97316"; el.style.animation = "pulse-ring 2.5s infinite"; }}
          >
            Cere ofertă personalizată →
          </Link>
          <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "transparent", color: "#25D366", textDecoration: "none",
            border: "1px solid rgba(37,211,102,.3)", borderRadius: 10,
            padding: "13px 20px", fontSize: 14, fontWeight: 600,
            fontFamily: "var(--font-ui)", transition: "all .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <span style={{ fontSize: 18 }}>📱</span> Chat WhatsApp rapid
          </a>
        </div>

        {/* Contact Info */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid #1a1a1a", flexShrink: 0, animation: "linkIn .4s .5s both" }}>
          <div style={{ fontSize: 10, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, fontWeight: 500 }}>Contact rapid</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {([
              { icon: "📞", label: "0779 281 047", href: "tel:0779281047", color: "#22C55E" },
              { icon: "✉️", label: "contact@printpeperete.com", href: "mailto:contact@printpeperete.com", color: "#3B82F6" },
              { icon: "📍", label: "Timișoara, România", href: null, color: "#F97316" },
            ] as const).map(c => (
              <div key={c.label}>
                {c.href ? (
                  <a href={c.href} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "var(--font-ui)" }}>{c.label}</span>
                  </a>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>{c.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Program */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #1a1a1a", marginTop: "auto", flexShrink: 0, animation: "linkIn .4s .55s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 500 }}>Program</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>
                L–V: <span style={{ color: "#22C55E" }}>09:00–18:00</span> · Sâm: <span style={{ color: "#22C55E" }}>10:00–14:00</span>
              </div>
            </div>
            <div style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>Răspuns 24h</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN NAV ─────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(12,12,12,.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--bg-border)" : "1px solid transparent",
        transition: "background .35s, backdrop-filter .35s, border-color .35s",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.06em", textDecoration: "none", color: "#fff", flexShrink: 0 }}>
            SDG <span style={{ color: "var(--accent)" }}>PRINT</span> & Design
          </Link>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? " active" : ""}`}>{l.label}</Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            {/* Desktop CTA */}
            {!isMobile && (
              <Link href="/contact" style={{
                background: "var(--accent)", color: "#fff", textDecoration: "none",
                borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700,
                fontFamily: "var(--font-ui)", transition: "background .2s",
                display: "inline-flex", alignItems: "center",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-deep)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
              >
                Cere ofertă
              </Link>
            )}

            {/* Mobile: phone shortcut */}
            {isMobile && (
              <a href="tel:0779281047" aria-label="Sună acum" style={{
                width: 40, height: 40, borderRadius: 9, background: "#141414",
                border: "1px solid #2A2A2A", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16, textDecoration: "none",
                transition: "border-color .2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#22C55E"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2A2A2A"; }}
              >📞</a>
            )}

            {/* Burger */}
            {isMobile && (
              <BurgerButton open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
            )}
          </div>
        </div>
      </nav>

      <MobileMenuPanel
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
