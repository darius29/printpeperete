import { useState, useEffect, useRef } from "react";

// ─── GOOGLE FONTS ─────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0C0C0C; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0C0C0C; }
    ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #F97316; }

    ::selection { background: rgba(249,115,22,0.3); color: #fff; }

    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.45); }
      70%  { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
      100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes waBounce {
      0%, 100% { transform: translateY(0); }
      30%       { transform: translateY(-8px); }
      60%       { transform: translateY(-4px); }
    }
    @keyframes parallaxSlow {
      from { transform: translateY(0px); }
      to   { transform: translateY(40px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10%       { transform: translate(-2%, -3%); }
      30%       { transform: translate(3%, 2%); }
      50%       { transform: translate(-1%, 4%); }
      70%       { transform: translate(4%, -1%); }
      90%       { transform: translate(-3%, 3%); }
    }

    .nav-link {
      font-size: 13px; font-weight: 500; color: #9CA3AF; text-decoration: none;
      font-family: 'DM Sans', sans-serif; transition: color 0.2s; padding-bottom: 2px;
      position: relative;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px;
      background: #F97316; transition: width 0.25s;
    }
    .nav-link:hover { color: #fff; }
    .nav-link:hover::after { width: 100%; }
    .nav-link.active { color: #F97316; }
    .nav-link.active::after { width: 100%; }

    .service-card {
      background: #141414; border: 1px solid #2A2A2A; border-radius: 12px;
      padding: 28px; cursor: pointer; transition: all 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .service-card:hover {
      background: #1a1a1a; border-color: #F97316;
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(249,115,22,0.12);
    }

    .surface-chip {
      display: inline-block; background: transparent; color: #9CA3AF;
      border: 1px solid #2A2A2A; font-size: 12px; padding: 5px 13px;
      border-radius: 6px; transition: all 0.18s; cursor: default;
      font-family: 'DM Sans', sans-serif;
    }
    .surface-chip:hover { border-color: #F97316; color: #fff; }

    .advantage-item {
      display: flex; align-items: flex-start; gap: 10px;
      background: #141414; border: 1px solid #2A2A2A; border-radius: 8px;
      padding: 12px 14px; transition: border-color 0.2s;
    }
    .advantage-item:hover { border-color: rgba(249,115,22,0.4); }

    .domain-card {
      background: #141414; border: 1px solid #2A2A2A; border-radius: 10px;
      padding: 16px 14px; text-align: center; transition: all 0.22s; cursor: default;
    }
    .domain-card:hover { border-color: #F97316; background: #1a1a1a; transform: translateY(-3px); }

    .step-num {
      width: 60px; height: 60px; border-radius: 50%;
      background: #141414; border: 2px solid #F97316;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #F97316;
      position: relative; z-index: 1; flex-shrink: 0;
    }

    .cta-btn-primary {
      background: #F97316; color: #fff; border: none; border-radius: 9px;
      padding: 14px 28px; font-size: 15px; font-weight: 700; cursor: pointer;
      font-family: 'DM Sans', sans-serif; letter-spacing: 0.01em;
      animation: pulse-ring 2.5s infinite;
      transition: background 0.2s, transform 0.15s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .cta-btn-primary:hover { background: #EA580C; transform: translateY(-2px); animation: none; box-shadow: 0 8px 24px rgba(249,115,22,0.35); }

    .cta-btn-outline {
      background: transparent; color: #fff; border: 1px solid #2A2A2A; border-radius: 9px;
      padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .cta-btn-outline:hover { border-color: #F97316; color: #F97316; }

    .before-after-handle {
      position: absolute; top: 0; bottom: 0; width: 2px; background: #F97316;
      cursor: ew-resize; z-index: 10;
    }
    .before-after-handle::before {
      content: ''; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 40px; height: 40px; border-radius: 50%;
      background: #F97316; border: 3px solid #fff;
      display: flex; align-items: center; justify-content: center;
    }
    .before-after-handle::after {
      content: '↔'; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      color: #fff; font-size: 14px; font-weight: 700; z-index: 1;
    }
  `}</style>
);

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCounter(target, duration = 1800, inView = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return val;
}

// ─── BEFORE/AFTER SLIDER ──────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, title, surface, duration, desc }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const getPos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  };

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) setPos(getPos(e.clientX)); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e) => setPos(getPos(e.touches[0].clientX));

  return (
    <div style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 14, overflow: "hidden" }}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        style={{ position: "relative", height: 260, cursor: "ew-resize", userSelect: "none", overflow: "hidden", background: "#1a1a1a" }}
      >
        {/* BEFORE — gradient placeholder */}
        <div style={{
          position: "absolute", inset: 0,
          background: before,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Înainte</span>
        </div>
        {/* AFTER — clipped */}
        <div style={{
          position: "absolute", inset: 0,
          background: after,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>După</span>
        </div>
        {/* Handle */}
        <div
          style={{
            position: "absolute", top: 0, bottom: 0, left: `${pos}%`,
            width: 2, background: "#F97316", zIndex: 10,
            transform: "translateX(-50%)",
          }}
        >
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 40, height: 40, borderRadius: "50%",
            background: "#F97316", border: "3px solid #fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, color: "#fff", fontWeight: 700, boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}>↔</div>
        </div>
        {/* Labels */}
        <div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: 5, padding: "3px 10px", fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>ÎNAINTE</div>
        <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(249,115,22,0.2)", backdropFilter: "blur(4px)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 5, padding: "3px 10px", fontSize: 11, color: "#F97316", fontWeight: 600 }}>DUPĂ</div>
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "#6B7280", background: "#1E1E1E", borderRadius: 4, padding: "3px 8px" }}>Suprafață: {surface}</span>
          <span style={{ fontSize: 11, color: "#6B7280", background: "#1E1E1E", borderRadius: 4, padding: "3px 8px" }}>Durată: {duration}</span>
        </div>
        <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.03em", marginBottom: 6, color: "#fff" }}>{title}</h4>
        <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(12,12,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
      transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
      padding: "0 40px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.06em", color: "#fff" }}>
          SDG <span style={{ color: "#F97316" }}>PRINT</span> & Design
        </div>
        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[["Acasă", true], ["Despre Noi", false], ["Servicii", false], ["Portofoliu", false], ["Before/After", false], ["Contact", false]].map(([l, a]) => (
            <a key={l} href="#" className={`nav-link${a ? " active" : ""}`}>{l}</a>
          ))}
        </div>
        {/* CTA */}
        <button className="cta-btn-primary" style={{ padding: "9px 20px", fontSize: 13, animation: "none", boxShadow: "none" }}>
          Cere ofertă
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const rotatingWords = ["pereților", "spațiilor", "brandurilor", "showroom-urilor", "birourilor"];
  const word = useTypewriter(rotatingWords, 75, 2200);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* BG layers */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 80% 50%, rgba(234,88,12,0.05) 0%, transparent 60%), #0C0C0C",
      }} />
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.6, animation: "grain 8s steps(2) infinite", pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", paddingTop: 68 }}>
        <div style={{ maxWidth: 820, animation: "fadeUp 0.9s ease both" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)",
            borderRadius: 20, padding: "6px 16px", marginBottom: 32,
            animation: "fadeIn 0.6s 0.2s both",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316", display: "inline-block", boxShadow: "0 0 8px #F97316" }} />
            <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.04em" }}>SDG Print — Timișoara, România</span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 8vw, 88px)",
            lineHeight: 0.95, letterSpacing: "0.02em",
            color: "#fff", marginBottom: 24,
            animation: "fadeUp 0.9s 0.15s both",
          }}>
            Transformăm
            <br />
            <span style={{ color: "#F97316", display: "inline-block", minWidth: 420 }}>
              {word}
              <span style={{ animation: "blink 1s infinite", borderRight: "3px solid #F97316", marginLeft: 2 }} />
            </span>
            <br />
            în vizual cu impact.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", color: "#9CA3AF", lineHeight: 1.7,
            maxWidth: 580, marginBottom: 40,
            animation: "fadeUp 0.9s 0.3s both",
          }}>
            Print UV direct pe perete, gravură și debitare laser CO₂, obiecte personalizate și branding vizual pentru firme, HoReCa, showroom-uri și spații comerciale.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 64, animation: "fadeUp 0.9s 0.45s both" }}>
            <button className="cta-btn-primary">Cere ofertă personalizată →</button>
            <button className="cta-btn-outline">↳ Vezi portofoliul</button>
          </div>

          {/* Inline specs */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 24,
            animation: "fadeUp 0.9s 0.6s both",
          }}>
            {[
              { label: "Print direct pe suprafață" },
              { label: "Culori vii CMYK" },
              { label: "Tehnologie UV instant" },
              { label: "Materiale multiple" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F97316", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, letterSpacing: "0.02em" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
        animation: "fadeIn 1s 1.2s both",
      }}>
        <span style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #6B7280, transparent)" }} />
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView(0.3);
  const stats = [
    { target: 2880, suffix: " DPI", label: "Rezoluție maximă" },
    { target: 48, suffix: "h", label: "Livrare standard" },
    { target: 290, suffix: " cm", label: "Înălțime maximă" },
    { target: 10, suffix: "+", label: "Materiale compatibile" },
  ];

  return (
    <section ref={ref} style={{
      background: "#141414", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A",
      padding: "0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s, i) => {
            const val = useCounter(s.target, 1600, inView);
            return (
              <div key={i} style={{
                padding: "36px 24px", textAlign: "center",
                borderRight: i < 3 ? "1px solid #2A2A2A" : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 48, lineHeight: 1, letterSpacing: "0.02em",
                  background: "linear-gradient(135deg, #F97316, #EA580C)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {val}{s.suffix}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView(0.1);
  const services = [
    { icon: "🖨️", title: "Print UV direct pe perete", desc: "Print direct pe suprafață, fără autocolant, fără lipire. Impact vizual imediat, culori vii, finisaj permanent.", tag: "Principal" },
    { icon: "⚡", title: "Gravare și debitare laser CO₂", desc: "Precizie industrială pentru gravare și tăiere pe lemn, acril, piele și multe altele. Detalii fine, tăieturi curate.", tag: "Laser" },
    { icon: "🎁", title: "Obiecte personalizate", desc: "Căni, huse și cadouri corporate cu branding clar și finisaj premium. Serii mici sau mari.", tag: "Custom" },
    { icon: "👕", title: "Print textile", desc: "Tricouri, hanorace și uniforme cu print clar, rezistent și confortabil pentru echipe și evenimente.", tag: "Textile" },
  ];

  return (
    <section ref={ref} style={{ padding: "96px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
        transition: "opacity 0.7s, transform 0.7s",
        marginBottom: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: "#F97316" }} />
          <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Ce facem</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 16 }}>
          Serviciile noastre
        </h2>
        <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 520 }}>
          Două tehnologii principale, o gamă completă de soluții vizuale pentru firme și spații comerciale.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {services.map((s, i) => (
          <div key={i} className="service-card" style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
            transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                background: "rgba(249,115,22,0.1)", color: "#F97316", border: "1px solid rgba(249,115,22,0.25)",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{s.tag}</span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.03em", marginBottom: 10, color: "#fff" }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>
            <span style={{ fontSize: 13, color: "#F97316", fontWeight: 600, letterSpacing: "0.01em" }}>Detalii complete →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── WALL PRINT SPOTLIGHT ─────────────────────────────────────────────────────
function WallPrintSpotlight() {
  const [ref, inView] = useInView(0.1);

  const advantages = [
    "Print direct pe perete — fără folie, fără lipire",
    "Design permanent și rezistent la uzură",
    "Culori vii și realiste, sistem CMYK",
    "Execuție rapidă, fără deranj în spațiu",
    "Potrivit pentru spații comerciale și rezidențiale",
    "Fără miros neplăcut, non-toxic",
  ];
  const surfaces = ["Pereți tencuiți / gletuiți", "Lemn și MDF", "Sticlă", "Metal", "Plastic rigid", "Beton", "Gresie"];
  const domains = [
    { icon: "🍽️", label: "HoReCa", sub: "Hoteluri, restaurante, cafenele" },
    { icon: "💼", label: "Birouri", sub: "Showroom-uri și spații de lucru" },
    { icon: "🛍️", label: "Retail", sub: "Magazine și spații comerciale" },
    { icon: "🎓", label: "Educație", sub: "Școli, săli de conferință" },
    { icon: "🏠", label: "Rezidențial", sub: "Decor interior premium" },
    { icon: "🏭", label: "Industrial", sub: "Spații de producție" },
  ];

  return (
    <section style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "96px 40px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s, transform 0.7s", marginBottom: 64,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "#F97316" }} />
              <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Serviciu principal</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
              Print UV direct<br />pe perete
            </h2>
            <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 500 }}>
              Realizăm print direct pe perete și pe alte suprafețe rigide, fără autocolant, fără lipire și fără compromisuri.
            </p>
          </div>
          <button className="cta-btn-primary">Cere ofertă wall print →</button>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Left: specs + advantages */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-24px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
          }}>
            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 36 }}>
              {[
                { val: "290 cm", label: "Înălțime maximă" },
                { val: "2–6 m²/h", label: "Viteză print" },
                { val: "2880 DPI", label: "Rezoluție" },
                { val: "UV instant", label: "Tehnologie" },
                { val: "CMYK", label: "Sistem culori" },
                { val: "Non-toxic", label: "Cerneală" },
              ].map(sp => (
                <div key={sp.val} style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#F97316", letterSpacing: "0.02em", lineHeight: 1 }}>{sp.val}</div>
                  <div style={{ fontSize: 10, color: "#6B7280", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{sp.label}</div>
                </div>
              ))}
            </div>

            {/* Advantages */}
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.04em", marginBottom: 14, color: "#fff" }}>Avantaje principale</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
              {advantages.map((a, i) => (
                <div key={i} className="advantage-item">
                  <span style={{ color: "#F97316", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>

            {/* Surfaces */}
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.04em", marginBottom: 12, color: "#fff" }}>Pe ce suprafețe printăm</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {surfaces.map(s => <span key={s} className="surface-chip">{s}</span>)}
            </div>
          </div>

          {/* Right: domains */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(24px)",
            transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
          }}>
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.04em", marginBottom: 16, color: "#fff" }}>Unde se folosește</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {domains.map((d, i) => (
                <div key={i} className="domain-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{d.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.03em", color: "#fff", marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4 }}>{d.sub}</div>
                </div>
              ))}
            </div>

            {/* CTA callout */}
            <div style={{
              background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06))",
              border: "1px solid rgba(249,115,22,0.2)", borderRadius: 12, padding: 24,
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.02em", marginBottom: 8, color: "#fff" }}>Transformă orice perete</div>
              <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 16 }}>
                Orice perete devine o operă vizuală în câteva ore — fără autocolante, fără compromisuri.
              </p>
              <button className="cta-btn-outline" style={{ fontSize: 13, padding: "10px 20px" }}>Consultanță gratuită →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BEFORE AFTER PREVIEW ─────────────────────────────────────────────────────
function BeforeAfterPreview() {
  const [ref, inView] = useInView(0.1);
  const comparisons = [
    {
      title: "Recepție clinică",
      surface: "Perete lavabil", duration: "1 zi",
      desc: "Transformare completă a recepției într-un spațiu modern și memorabil — de la perete simplu la identitate vizuală clară.",
      before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after: "linear-gradient(160deg, #1a3a2a 0%, #0f2a1f 60%, #1a3a2a 100%)",
    },
    {
      title: "Showroom auto",
      surface: "MDF", duration: "6 ore",
      desc: "Accent vizual de brand pentru showroom — experiență mai puternică pentru clienți și imagine premium.",
      before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after: "linear-gradient(160deg, #2a1a0a 0%, #1f120a 60%, #2a1a0a 100%)",
    },
    {
      title: "Birou creativ",
      surface: "Perete gletuit", duration: "1 zi",
      desc: "Spațiu creativ personalizat pentru echipă și clienți — grafică motivațională și identitate vizuală care inspiră.",
      before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after: "linear-gradient(160deg, #0a1a2a 0%, #0a1220 60%, #0a1a2a 100%)",
    },
  ];

  return (
    <section ref={ref} style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s, transform 0.7s", marginBottom: 56,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: "#F97316" }} />
              <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Transformări reale</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
              Înainte / După
            </h2>
            <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 480 }}>
              Transformări reale pentru spații comerciale, birouri și locații premium. Trage handlerul pentru a compara.
            </p>
          </div>
          <a href="#" style={{ fontSize: 14, color: "#F97316", fontWeight: 600, textDecoration: "none" }}>Vezi toate transformările →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {comparisons.map((c, i) => (
            <div key={i} style={{
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
              transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
            }}>
              <BeforeAfterSlider {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LASER SECTION ────────────────────────────────────────────────────────────
function LaserSection() {
  const [ref, inView] = useInView(0.1);
  const materials = ["Lemn (MDF, placaj, masiv)", "Plexiglas / Acril", "Piele naturală și ecologică", "Hârtie și carton", "Textile (bumbac, poliester)", "Cauciuc (ștampile)", "Plastic (anumite tipuri)", "Sticlă (gravare)", "Plăci bicolore", "Silicon"];
  const feats = [
    { icon: "🎯", label: "Precizie ridicată", desc: "Ideală pentru detalii fine și texte mici" },
    { icon: "✂️", label: "Tăiere + gravare", desc: "Același echipament, rezultate complete" },
    { icon: "⚡", label: "Execuție rapidă", desc: "Producție repetabilă și constantă" },
    { icon: "🤲", label: "Fără contact", desc: "Nu deteriorează materialul adiacent" },
  ];

  return (
    <section ref={ref} style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "96px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s, transform 0.7s", marginBottom: 56,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "#F97316" }} />
            <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Laser CO₂ profesional</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
            Gravare și debitare<br />laser CO₂ profesională
          </h2>
          <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 560 }}>
            Folosim o mașină industrială laser CO₂ de înaltă precizie pentru gravare și debitare pe o gamă largă de materiale.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-24px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
          }}>
            {/* Feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 36 }}>
              {feats.map((f, i) => (
                <div key={i} style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 10, padding: "18px 16px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.03em", marginBottom: 4, color: "#fff" }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Materiale */}
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.04em", marginBottom: 12, color: "#fff" }}>Materiale compatibile</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {materials.map(m => <span key={m} className="surface-chip">{m}</span>)}
            </div>

            <button className="cta-btn-primary">Cere ofertă gravare laser →</button>
          </div>

          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(24px)",
            transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
          }}>
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.04em", marginBottom: 16, color: "#fff" }}>Servicii realizate</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
              {[
                "Cadouri personalizate (cutii, rame, trofee)",
                "Produse corporate (logo pe lemn / acril)",
                "Agende și portofele gravate",
                "Litere volumetrice",
                "Plăcuțe firme și semnalistică",
                "Decupaje precise și prototipuri",
                "Ștampile din cauciuc",
                "Gravură pe sticlă și piele",
                "Elemente decorative",
              ].map((s, i) => (
                <div key={i} className="advantage-item">
                  <span style={{ color: "#F97316", fontWeight: 700, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Industrii deservite</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["Publicitate & semnalistică", "Corporate gifting", "Producție & prototipare", "Design interior", "Evenimente & activări"].map(t => (
                  <span key={t} style={{ fontSize: 11, background: "rgba(249,115,22,0.1)", color: "#F97316", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 5, padding: "4px 10px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function Process() {
  const [ref, inView] = useInView(0.2);
  const steps = [
    { num: "01", title: "Discuție & obiective", desc: "Colectăm dimensiuni, context și direcția vizuală dorită pentru proiect. Consultanță gratuită." },
    { num: "02", title: "Propunere creativă", desc: "Pregătim variante de design și recomandăm materialele potrivite pentru suprafața ta." },
    { num: "03", title: "Execuție & predare", desc: "Programăm producția și livrăm cu verificare finală a calității. Garanție completă." },
  ];

  return (
    <section ref={ref} style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s, transform 0.7s", marginBottom: 64, textAlign: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "#F97316" }} />
            <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cum funcționează</span>
            <div style={{ width: 32, height: 2, background: "#F97316" }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 12 }}>
            Un proces simplu,<br />clar și previzibil
          </h2>
          <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Fiecare etapă este documentată, ca să ai control complet de la brief la livrare.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
          {/* Connector lines */}
          <div style={{ position: "absolute", top: 30, left: "16.6%", right: "16.6%", height: 2, background: "linear-gradient(to right, #F97316 0%, #2A2A2A 50%, #F97316 100%)", zIndex: 0 }} />

          {steps.map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              padding: "0 24px",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
              transition: `opacity 0.6s ${0.2 + i * 0.15}s, transform 0.6s ${0.2 + i * 0.15}s`,
            }}>
              <div className="step-num" style={{ marginBottom: 24, background: "#0C0C0C" }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.03em", marginBottom: 12, color: "#fff" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: 56,
          opacity: inView ? 1 : 0, transition: "opacity 0.7s 0.7s",
        }}>
          <button className="cta-btn-primary">Începe proiectul →</button>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
          border: "1px solid #2A2A2A", borderRadius: 20, padding: "64px 56px",
          position: "relative", overflow: "hidden",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(32px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          {/* BG accent */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 300, height: 300, background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🚀</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 20 }}>
              Gata să îți transformi<br />spațiul?
            </h2>
            <p style={{ fontSize: 17, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 40px" }}>
              Trimite-ne o poză cu peretele sau produsul dorit și primești rapid ofertă personalizată + consultanță gratuită.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>Cere ofertă personalizată →</button>
              <button className="cta-btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>↳ Vezi portofoliul</button>
            </div>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 32 }}>
              <div style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#22C55E" }}>✓</span> Răspuns în max 24h
              </div>
              <div style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#22C55E" }}>✓</span> Consultanță gratuită
              </div>
              <div style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#22C55E" }}>✓</span> Fără angajament
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      title: "Servicii",
      links: ["Toate serviciile", "Print UV pe perete", "Gravare laser CO₂", "Pregătire fișiere", "Before / After", "Portofoliu"],
    },
    {
      title: "Contact",
      links: ["Timișoara, România", "0779 281 047", "contact@printpeperete.com", "Facebook"],
    },
    {
      title: "Program",
      links: ["Luni – Vineri: 09:00 – 18:00", "Sâmbătă: 10:00 – 14:00", "Duminică: Închis"],
    },
    {
      title: "Legal",
      links: ["Termeni și condiții", "Politica de confidențialitate", "Politica de cookies", "ANPC", "Pregătire fișiere", "Întrebări frecvente"],
    },
  ];
  const payments = ["Transfer bancar", "Card bancar", "Numerar", "Factură cu termen"];

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "64px 40px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.06em", color: "#fff", marginBottom: 12 }}>
              SDG <span style={{ color: "#F97316" }}>PRINT</span> & Design
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, marginBottom: 24, maxWidth: 260 }}>
              Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.
            </p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Metode plată</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {payments.map(p => (
                  <span key={p} style={{ fontSize: 11, background: "#141414", color: "#9CA3AF", border: "1px solid #2A2A2A", borderRadius: 5, padding: "3px 8px" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Link cols */}
          {cols.map(c => (
            <div key={c.title}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.06em", color: "#fff", marginBottom: 16 }}>{c.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {c.links.map(l => (
                  <a key={l} href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", transition: "color 0.18s" }}
                    onMouseEnter={e => e.target.style.color = "#F97316"}
                    onMouseLeave={e => e.target.style.color = "#6B7280"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#4B5563" }}>© 2026 SDG PRINT & Design. Toate drepturile rezervate.</span>
          <span style={{ fontSize: 12, color: "#4B5563" }}>Zona de acoperire: Timișoara, Arad, Cluj-Napoca și toată România</span>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP WIDGET ──────────────────────────────────────────────────────────
function WAWidget() {
  const [visible, setVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    const t2 = setTimeout(() => setShowTip(true), 5000);
    const t3 = setTimeout(() => setShowTip(false), 9000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 999,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
      transition: "opacity 0.4s, transform 0.4s",
      pointerEvents: visible ? "auto" : "none",
    }}>
      {showTip && (
        <div style={{
          background: "#141414", border: "1px solid #2A2A2A", borderRadius: 9,
          padding: "10px 16px", fontSize: 13, color: "#fff", whiteSpace: "nowrap",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          animation: "fadeUp 0.3s ease",
        }}>
          Chat rapid pe WhatsApp →
          <div style={{ position: "absolute", bottom: -5, right: 20, width: 10, height: 10, background: "#141414", border: "1px solid #2A2A2A", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)" }} />
        </div>
      )}
      <a href="https://wa.me/40779281047?text=Bun%C4%83%20ziua%2C%20a%C8%99%20dori%20o%20ofert%C4%83%20personalizat%C4%83."
        target="_blank" rel="noopener noreferrer"
        style={{
          width: 56, height: 56, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, textDecoration: "none",
          boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          animation: "waBounce 2s 6s 2",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)"; }}
      >📱</a>
    </div>
  );
}

// ─── MOBILE BAR ───────────────────────────────────────────────────────────────
function MobileBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 98,
      background: "rgba(20,20,20,0.97)", backdropFilter: "blur(12px)",
      borderTop: "1px solid #2A2A2A", display: "flex", gap: 8, padding: "10px 12px",
      paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
    }}>
      {[
        { icon: "📞", label: "Sună acum", bg: "#1E1E1E", color: "#fff", href: "tel:0779281047" },
        { icon: "📱", label: "WhatsApp", bg: "#25D366", color: "#fff", href: "https://wa.me/40779281047" },
        { icon: "✉", label: "Cere ofertă", bg: "#F97316", color: "#fff", href: "#contact" },
      ].map(b => (
        <a key={b.label} href={b.href} style={{
          flex: 1, background: b.bg, color: b.color, border: "none", borderRadius: 9,
          padding: "10px 6px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          textDecoration: "none",
        }}>
          <span style={{ fontSize: 18 }}>{b.icon}</span>
          <span>{b.label}</span>
        </a>
      ))}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WallPrintSpotlight />
        <BeforeAfterPreview />
        <LaserSection />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <WAWidget />
      <MobileBar />
    </>
  );
}
