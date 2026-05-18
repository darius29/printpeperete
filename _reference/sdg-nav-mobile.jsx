import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SDG PRINT — Mobile Navigation Component
// Refolosibil în toate paginile · Drop-in replacement pentru Nav existent
// ─────────────────────────────────────────────────────────────────────────────

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { background:#0C0C0C; color:#fff; font-family:'DM Sans',sans-serif; }
    ::selection { background:rgba(249,115,22,0.3); color:#fff; }

    /* ── Burger Lines ───────────────────────────── */
    @keyframes line1Open  { from{transform:translateY(0) rotate(0)}    to{transform:translateY(7px) rotate(45deg)} }
    @keyframes line1Close { from{transform:translateY(7px) rotate(45deg)} to{transform:translateY(0) rotate(0)} }
    @keyframes line2Open  { from{opacity:1;width:100%} to{opacity:0;width:0} }
    @keyframes line2Close { from{opacity:0;width:0} to{opacity:1;width:100%} }
    @keyframes line3Open  { from{transform:translateY(0) rotate(0)}    to{transform:translateY(-7px) rotate(-45deg)} }
    @keyframes line3Close { from{transform:translateY(-7px) rotate(-45deg)} to{transform:translateY(0) rotate(0)} }

    /* ── Overlay ─────────────────────────────────── */
    @keyframes overlayIn  { from{opacity:0} to{opacity:1} }
    @keyframes overlayOut { from{opacity:1} to{opacity:0} }

    /* ── Panel slide ─────────────────────────────── */
    @keyframes panelIn  { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes panelOut { from{transform:translateX(0);opacity:1} to{transform:translateX(100%);opacity:0} }

    /* ── Nav links stagger ───────────────────────── */
    @keyframes linkIn {
      from{opacity:0;transform:translateX(24px)}
      to  {opacity:1;transform:translateX(0)}
    }

    /* ── Pulse CTA ───────────────────────────────── */
    @keyframes pulse-ring {
      0%  {box-shadow:0 0 0 0 rgba(249,115,22,.45)}
      70% {box-shadow:0 0 0 12px rgba(249,115,22,0)}
      100%{box-shadow:0 0 0 0 rgba(249,115,22,0)}
    }

    /* ── Fade up (demo content) ──────────────────── */
    @keyframes fadeUp {
      from{opacity:0;transform:translateY(20px)}
      to  {opacity:1;transform:translateY(0)}
    }

    /* ── Nav link hover underline ────────────────── */
    .desk-link {
      font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none;
      transition:color .2s; padding-bottom:2px; position:relative;
      font-family:'DM Sans',sans-serif;
    }
    .desk-link::after {
      content:''; position:absolute; bottom:-2px; left:0;
      width:0; height:1px; background:#F97316; transition:width .25s;
    }
    .desk-link:hover { color:#fff; }
    .desk-link:hover::after { width:100%; }
    .desk-link.active { color:#F97316; }
    .desk-link.active::after { width:100%; }

    /* ── Mobile menu link hover ──────────────────── */
    .mob-link-inner { display:flex; align-items:center; gap:0; }
    .mob-link-inner::before {
      content:''; display:block; width:0; height:2px;
      background:#F97316; border-radius:1px;
      transition:width .25s; margin-right:0; flex-shrink:0;
    }
    .mob-link:hover .mob-link-inner::before,
    .mob-link.active .mob-link-inner::before { width:20px; margin-right:12px; }

    /* ── Grain overlay ───────────────────────────── */
    @keyframes grain {
      0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
      30%{transform:translate(3%,2%)} 50%{transform:translate(-1%,4%)}
      70%{transform:translate(4%,-1%)} 90%{transform:translate(-3%,3%)}
    }
  `}</style>
);

// ─── NAV LINKS DATA ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label:"Acasă",        href:"/",              icon:"⌂",  desc:"Pagina principală" },
  { label:"Servicii",     href:"/servicii",       icon:"🖨",  desc:"Wall Print · Laser · Textile" },
  { label:"Portofoliu",   href:"/portofoliu",     icon:"▭",  desc:"Proiecte și lucrări reale" },
  { label:"Before/After", href:"/before-after",   icon:"↔",  desc:"Comparații înainte/după" },
  { label:"Despre Noi",   href:"/despre-noi",     icon:"◎",  desc:"Echipă, echipamente, valori" },
  { label:"Contact",      href:"/contact",        icon:"✉",  desc:"Ofertă · Program · Locație" },
];

const QUICK_LINKS = [
  { label:"Pregătire fișiere", href:"/pregatire-fisiere" },
  { label:"Întrebări frecvente", href:"/faq" },
  { label:"Calculator preț", href:"/servicii#calculator" },
  { label:"Termeni și condiții", href:"/termeni" },
];

// ─── BURGER BUTTON ────────────────────────────────────────────────────────────
function BurgerButton({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Închide meniu" : "Deschide meniu"}
      aria-expanded={open}
      style={{
        width:44, height:44, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:0,
        background:"transparent", border:"1px solid #2A2A2A",
        borderRadius:10, cursor:"pointer", padding:10,
        transition:"border-color .2s, background .2s",
        borderColor: open ? "#F97316" : "#2A2A2A",
        background: open ? "rgba(249,115,22,.08)" : "transparent",
        flexShrink:0,
      }}
    >
      {/* Line 1 */}
      <span style={{
        display:"block", height:2, width:"20px", background:"#fff",
        borderRadius:2, transformOrigin:"center",
        animation: open
          ? "line1Open .3s cubic-bezier(0.25,0.46,0.45,0.94) both"
          : "line1Close .3s cubic-bezier(0.25,0.46,0.45,0.94) both",
        marginBottom:5,
      }}/>
      {/* Line 2 */}
      <span style={{
        display:"block", height:2, background:"#F97316",
        borderRadius:2, transformOrigin:"center",
        animation: open
          ? "line2Open .2s ease both"
          : "line2Close .3s .1s ease both",
        marginBottom:5,
      }}/>
      {/* Line 3 */}
      <span style={{
        display:"block", height:2, width:"20px", background:"#fff",
        borderRadius:2, transformOrigin:"center",
        animation: open
          ? "line3Open .3s cubic-bezier(0.25,0.46,0.45,0.94) both"
          : "line3Close .3s cubic-bezier(0.25,0.46,0.45,0.94) both",
      }}/>
    </button>
  );
}

// ─── MOBILE MENU PANEL ────────────────────────────────────────────────────────
function MobileMenuPanel({ open, onClose, activePage }) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);

  // Mount delay for animation
  useEffect(() => {
    if (open) { setClosing(false); setMounted(true); }
    else if (mounted) {
      setClosing(true);
      const t = setTimeout(() => { setMounted(false); setClosing(false); }, 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
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
          position:"fixed", inset:0, zIndex:150,
          background:"rgba(0,0,0,.7)", backdropFilter:"blur(8px)",
          animation: closing ? "overlayOut .3s ease both" : "overlayIn .25s ease both",
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position:"fixed", top:0, right:0, bottom:0,
          width:"min(420px, 92vw)", zIndex:151,
          background:"#0C0C0C",
          borderLeft:"1px solid #2A2A2A",
          display:"flex", flexDirection:"column",
          animation: closing ? "panelOut .32s cubic-bezier(0.55,0,1,0.45) both" : "panelIn .35s cubic-bezier(0.25,0.46,0.45,0.94) both",
          overflowY:"auto",
        }}
      >
        {/* Grain texture */}
        <div style={{
          position:"absolute", inset:"-50%", width:"200%", height:"200%",
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity:.8, animation:"grain 8s steps(2) infinite", pointerEvents:"none",
        }}/>

        {/* Accent glow top-right */}
        <div style={{ position:"absolute", top:0, right:0, width:280, height:280, background:"radial-gradient(circle at top right, rgba(249,115,22,.07) 0%, transparent 65%)", pointerEvents:"none" }}/>

        {/* ── Panel Header ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid #1a1a1a", position:"relative", flexShrink:0 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.06em" }}>
            SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
          </div>
          <button
            onClick={onClose}
            aria-label="Închide meniu"
            style={{ width:36, height:36, borderRadius:9, background:"#1E1E1E", border:"1px solid #2A2A2A", color:"#9CA3AF", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1, transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#2A2A2A"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#1E1E1E"; e.currentTarget.style.color="#9CA3AF"; }}
          >×</button>
        </div>

        {/* ── Main Nav Links ── */}
        <nav style={{ padding:"12px 0", flexShrink:0 }}>
          {NAV_LINKS.map((l, i) => {
            const isActive = activePage === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`mob-link${isActive ? " active" : ""}`}
                onClick={onClose}
                style={{
                  display:"block", padding:"0 24px",
                  textDecoration:"none",
                  animation: `linkIn .35s ${.05 + i * .06}s both`,
                }}
              >
                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 0", borderBottom:"1px solid #111",
                }}>
                  <div className="mob-link-inner" style={{ flex:1 }}>
                    <div style={{ flex:1 }}>
                      <div style={{
                        fontFamily:"'Bebas Neue',sans-serif",
                        fontSize:26, letterSpacing:"0.03em",
                        color: isActive ? "#F97316" : "#fff",
                        lineHeight:1.1,
                        transition:"color .2s",
                      }}>{l.label}</div>
                      <div style={{ fontSize:11, color:"#4B5563", marginTop:3, lineHeight:1.4 }}>{l.desc}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {isActive && (
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#F97316", boxShadow:"0 0 8px #F97316", flexShrink:0 }}/>
                    )}
                    <span style={{ fontSize:16, color: isActive ? "#F97316" : "#2A2A2A", transition:"color .2s" }}>→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>

        {/* ── CTA Buttons ── */}
        <div style={{
          padding:"20px 24px", borderTop:"1px solid #1a1a1a", flexShrink:0,
          animation:"linkIn .4s .45s both",
        }}>
          <a href="/contact" onClick={onClose} style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            background:"#F97316", color:"#fff", textDecoration:"none",
            borderRadius:10, padding:"15px 20px", fontSize:15, fontWeight:700,
            fontFamily:"'DM Sans',sans-serif", marginBottom:10,
            animation:"pulse-ring 2.5s infinite",
            transition:"background .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#EA580C"; e.currentTarget.style.animation="none"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#F97316"; e.currentTarget.style.animation="pulse-ring 2.5s infinite"; }}
          >
            Cere ofertă personalizată →
          </a>
          <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            background:"transparent", color:"#25D366", textDecoration:"none",
            border:"1px solid rgba(37,211,102,.3)", borderRadius:10,
            padding:"13px 20px", fontSize:14, fontWeight:600,
            fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(37,211,102,.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}
          >
            <span style={{ fontSize:18 }}>📱</span> Chat WhatsApp rapid
          </a>
        </div>

        {/* ── Contact Info ── */}
        <div style={{
          padding:"20px 24px", borderTop:"1px solid #1a1a1a", flexShrink:0,
          animation:"linkIn .4s .5s both",
        }}>
          <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14, fontWeight:500 }}>Contact rapid</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { icon:"📞", label:"0779 281 047", href:"tel:0779281047", color:"#22C55E" },
              { icon:"✉️", label:"contact@printpeperete.com", href:"mailto:contact@printpeperete.com", color:"#3B82F6" },
              { icon:"📍", label:"Timișoara, România", href:null, color:"#F97316" },
            ].map(c => (
              <div key={c.label}>
                {c.href ? (
                  <a href={c.href} style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
                    <span style={{ width:32, height:32, borderRadius:8, background:`${c.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{c.icon}</span>
                    <span style={{ fontSize:13, color:"#9CA3AF", fontFamily:"'DM Sans',sans-serif" }}>{c.label}</span>
                  </a>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:32, height:32, borderRadius:8, background:`${c.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{c.icon}</span>
                    <span style={{ fontSize:13, color:"#9CA3AF" }}>{c.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div style={{
          padding:"16px 24px", borderTop:"1px solid #1a1a1a", flexShrink:0,
          animation:"linkIn .4s .55s both",
        }}>
          <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12, fontWeight:500 }}>Link-uri rapide</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {QUICK_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={onClose} style={{
                fontSize:11, color:"#6B7280", textDecoration:"none",
                background:"#141414", border:"1px solid #2A2A2A",
                borderRadius:6, padding:"5px 11px",
                fontFamily:"'DM Sans',sans-serif", transition:"all .15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#F97316"; e.currentTarget.style.color="#F97316"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#2A2A2A"; e.currentTarget.style.color="#6B7280"; }}
              >{l.label}</a>
            ))}
          </div>
        </div>

        {/* ── Program ── */}
        <div style={{
          padding:"16px 24px", borderTop:"1px solid #1a1a1a", marginTop:"auto", flexShrink:0,
          animation:"linkIn .4s .6s both",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, color:"#4B5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:500 }}>Program</div>
              <div style={{ fontSize:12, color:"#6B7280" }}>L–V: <span style={{ color:"#22C55E" }}>09:00–18:00</span> · Sâm: <span style={{ color:"#22C55E" }}>10:00–14:00</span></div>
            </div>
            <div style={{ background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)", borderRadius:20, padding:"4px 12px" }}>
              <span style={{ fontSize:11, color:"#22C55E", fontWeight:600 }}>⚡ Răspuns 24h</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN NAV — responsive ────────────────────────────────────────────────────
function Nav({ activePage = "/" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile]);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled || menuOpen ? "rgba(12,12,12,.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid #2A2A2A" : "1px solid transparent",
        transition:"background .35s, backdrop-filter .35s, border-color .35s",
        padding:"0 24px",
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
          {/* Logo */}
          <a href="/" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em", textDecoration:"none", color:"#fff", flexShrink:0 }}>
            SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
          </a>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:32 }}>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className={`desk-link${activePage===l.href?" active":""}`}>{l.label}</a>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
            {/* Desktop CTA */}
            {!isMobile && (
              <a href="/contact" style={{
                background:"#F97316", color:"#fff", textDecoration:"none",
                borderRadius:8, padding:"9px 20px", fontSize:13, fontWeight:700,
                fontFamily:"'DM Sans',sans-serif", transition:"background .2s",
                display:"inline-flex", alignItems:"center", gap:6,
              }}
                onMouseEnter={e => e.currentTarget.style.background="#EA580C"}
                onMouseLeave={e => e.currentTarget.style.background="#F97316"}
              >Cere ofertă</a>
            )}

            {/* Mobile: phone shortcut */}
            {isMobile && (
              <a href="tel:0779281047" aria-label="Sună acum" style={{
                width:40, height:40, borderRadius:9, background:"#141414",
                border:"1px solid #2A2A2A", display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:16, textDecoration:"none",
                transition:"border-color .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#22C55E"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#2A2A2A"}
              >📞</a>
            )}

            {/* Burger */}
            {isMobile && (
              <BurgerButton open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <MobileMenuPanel
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activePage={activePage}
      />
    </>
  );
}

// ─── DEMO PAGE ────────────────────────────────────────────────────────────────
function DemoPage() {
  const [activePage, setActivePage] = useState("/");

  return (
    <>
      <FontLoader />
      <Nav activePage={activePage} />

      <main style={{ paddingTop:68 }}>
        {/* Demo hero */}
        <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 24px", overflow:"hidden" }}>
          {/* BG */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 0%, rgba(249,115,22,.08) 0%, transparent 65%), #0C0C0C" }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)", backgroundSize:"60px 60px", opacity:.04 }}/>

          <div style={{ position:"relative", maxWidth:700, margin:"0 auto", textAlign:"center", animation:"fadeUp .9s .1s both" }}>
            {/* Badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:32 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", boxShadow:"0 0 8px #F97316", display:"inline-block" }}/>
              <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>Redimensionează fereastra pentru a testa mobile nav</span>
            </div>

            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(44px,7vw,80px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20 }}>
              Burger Menu<br /><span style={{ color:"#F97316" }}>SDG Print</span>
            </h1>

            <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.75, marginBottom:40, maxWidth:520, margin:"0 auto 40px" }}>
              Component Nav responsiv cu burger menu animat, panou lateral cu slide-in, overlay cu blur și toate animațiile necesare.
            </p>

            {/* Feature grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:48, maxWidth:480, margin:"0 auto 48px" }}>
              {[
                { icon:"🍔", label:"Burger animat", desc:"3 linii cu animație FLIP" },
                { icon:"📱", label:"Panou slide-in", desc:"Din dreapta, 420px max" },
                { icon:"🌫️", label:"Backdrop blur", desc:"Overlay întunecat + blur" },
                { icon:"⌨️", label:"Escape to close", desc:"Keyboard accessible" },
                { icon:"🔒", label:"Body lock", desc:"Scroll blocat când e deschis" },
                { icon:"⚡", label:"Stagger links", desc:"Animație linkuri în cascadă" },
              ].map(f => (
                <div key={f.label} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"14px 16px", textAlign:"left", display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:2 }}>{f.label}</div>
                    <div style={{ fontSize:11, color:"#6B7280" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Page switcher demo */}
            <div style={{ marginBottom:32 }}>
              <div style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>Simulează pagina activă</div>
              <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                {NAV_LINKS.map(l => (
                  <button key={l.href} onClick={() => setActivePage(l.href)} style={{
                    background: activePage===l.href ? "rgba(249,115,22,.12)" : "#141414",
                    color: activePage===l.href ? "#F97316" : "#9CA3AF",
                    border: `1px solid ${activePage===l.href ? "#F97316" : "#2A2A2A"}`,
                    borderRadius:7, padding:"7px 14px", fontSize:12, fontWeight:500,
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .15s",
                  }}>{l.label}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Usage guide */}
        <section style={{ padding:"80px 24px", maxWidth:900, margin:"0 auto" }}>
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, overflow:"hidden" }}>
            <div style={{ padding:"20px 28px", background:"#1a1a1a", borderBottom:"1px solid #2A2A2A" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.04em" }}>
                📋 Cum integrezi Nav-ul în paginile existente
              </div>
            </div>
            <div style={{ padding:"28px" }}>
              {[
                {
                  title:"1. Înlocuiește componenta Nav existentă",
                  code:`// În fiecare pagină (.jsx / page.tsx) înlocuiești Nav-ul vechi cu cel nou:
import Nav from "@/components/layout/Nav";

// Înainte (Nav vechi — nu era responsiv):
<Nav />

// După (Nav nou — responsiv + burger menu):
<Nav activePage="/" />      // sau activePage="/servicii" etc.`,
                },
                {
                  title:"2. Props disponibile",
                  code:`// Nav acceptă un singur prop opțional:
<Nav activePage={string} />  // href-ul paginii curente — marchează linkul activ

// Exemplu per pagină:
// /app/page.tsx          → <Nav activePage="/" />
// /app/servicii/page.tsx → <Nav activePage="/servicii" />
// /app/contact/page.tsx  → <Nav activePage="/contact" />`,
                },
                {
                  title:"3. Breakpoint mobil (default: 900px)",
                  code:`// Nav-ul se schimbă automat la 900px lățime
// Poți modifica în component:
const checkMobile = () => setIsMobile(window.innerWidth < 900);
//                                                          ^^^
//                                              Schimbă după necesitate`,
                },
                {
                  title:"4. Salvează ca /src/components/layout/Nav.tsx",
                  code:`// Structura recomandată:
/src/components/layout/
├── Nav.tsx          ← componenta principală (acest fișier)
├── Footer.tsx
├── WAWidget.tsx
└── MobileBar.tsx`,
                },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 24 : 0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#F97316", marginBottom:10 }}>{s.title}</div>
                  <pre style={{ background:"#0C0C0C", border:"1px solid #1a1a1a", borderRadius:8, padding:"16px 18px", fontSize:12, color:"#9CA3AF", overflowX:"auto", lineHeight:1.7, fontFamily:"monospace" }}>
                    <code style={{ color:"#E2E8F0" }}>{s.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default DemoPage;
