"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Acasă", href: "/" },
  { label: "Despre Noi", href: "/despre-noi" },
  { label: "Servicii", href: "/servicii" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Before/After", href: "/before-after" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(12,12,12,.92)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? "1px solid var(--bg-border)" : "1px solid transparent", transition: "all .35s", padding: "0 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.06em", color: "#fff" }}>
            SDG <span style={{ color: "var(--accent)" }}>PRINT</span> & Design
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className={`nav-link${pathname === href ? " active" : ""}`}>{label}</Link>
          ))}
        </div>
        <Link href="/contact">
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>Cere ofertă</button>
        </Link>
      </div>
    </nav>
  );
}
