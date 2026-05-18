import { useState, useEffect, useRef } from "react";

// ─── FONTS & GLOBAL CSS ───────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0C0C0C; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0C0C0C; }
    ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #F97316; }
    ::selection { background: rgba(249,115,22,0.3); color: #fff; }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(249,115,22,.45); }
      70%  { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
      100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
    }
    @keyframes waBounce {
      0%,100%{ transform:translateY(0); }
      30%    { transform:translateY(-8px); }
      60%    { transform:translateY(-4px); }
    }
    @keyframes grain {
      0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
      30%{transform:translate(3%,2%)}   50%{transform:translate(-1%,4%)}
      70%{transform:translate(4%,-1%)} 90%{transform:translate(-3%,3%)}
    }
    @keyframes shimmer {
      0%   { background-position: -400% center; }
      100% { background-position: 400% center; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes filterFlip {
      from { opacity:0; transform:scale(0.96) translateY(8px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }

    .nav-link {
      font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none;
      font-family:'DM Sans',sans-serif; transition:color 0.2s; padding-bottom:2px;
      position:relative;
    }
    .nav-link::after {
      content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px;
      background:#F97316; transition:width 0.25s;
    }
    .nav-link:hover { color:#fff; }
    .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#F97316; }
    .nav-link.active::after { width:100%; }

    .cta-btn-primary {
      background:#F97316; color:#fff; border:none; border-radius:9px;
      padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer;
      font-family:'DM Sans',sans-serif; letter-spacing:0.01em;
      animation:pulse-ring 2.5s infinite;
      transition:background 0.2s, transform 0.15s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .cta-btn-primary:hover {
      background:#EA580C; transform:translateY(-2px);
      animation:none; box-shadow:0 8px 24px rgba(249,115,22,.35);
    }
    .cta-btn-outline {
      background:transparent; color:#fff; border:1px solid #2A2A2A; border-radius:9px;
      padding:13px 26px; font-size:14px; font-weight:600; cursor:pointer;
      font-family:'DM Sans',sans-serif; transition:all 0.2s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .cta-btn-outline:hover { border-color:#F97316; color:#F97316; }

    .service-card {
      background:#141414; border:1px solid #2A2A2A; border-radius:14px;
      padding:28px; cursor:pointer;
      transition:all 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .service-card:hover {
      background:#1a1a1a; border-color:#F97316;
      transform:translateY(-5px);
      box-shadow:0 16px 48px rgba(249,115,22,.1);
    }

    .filter-btn {
      background:#141414; color:#9CA3AF; border:1px solid #2A2A2A;
      border-radius:8px; padding:9px 18px; font-size:13px; font-weight:500;
      cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.18s;
    }
    .filter-btn.active {
      background:#F97316; color:#fff; border-color:#F97316;
    }
    .filter-btn:hover:not(.active) { border-color:#F97316; color:#F97316; }

    .laser-tab {
      background:transparent; color:#9CA3AF; border:1px solid transparent;
      border-radius:7px; padding:8px 16px; font-size:12px; font-weight:500;
      cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.18s;
      white-space:nowrap;
    }
    .laser-tab.active {
      background:rgba(249,115,22,.12); color:#F97316;
      border-color:rgba(249,115,22,.3);
    }
    .laser-tab:hover:not(.active) { color:#fff; }

    .material-chip {
      background:#141414; color:#9CA3AF; border:1px solid #2A2A2A;
      border-radius:7px; padding:7px 14px; font-size:12px; font-weight:500;
      cursor:default; font-family:'DM Sans',sans-serif; transition:all 0.18s;
      display:inline-block;
    }
    .material-chip:hover { border-color:#F97316; color:#fff; }

    .calc-service-btn {
      background:#141414; border:1px solid #2A2A2A; border-radius:10px;
      padding:14px 16px; cursor:pointer; font-family:'DM Sans',sans-serif;
      transition:all 0.2s; text-align:center; display:flex;
      flex-direction:column; align-items:center; gap:6px;
    }
    .calc-service-btn.active {
      background:rgba(249,115,22,.1); border-color:#F97316;
    }
    .calc-service-btn:hover:not(.active) { border-color:#4B5563; }

    .range-slider {
      -webkit-appearance:none; appearance:none;
      width:100%; height:4px; border-radius:2px; outline:none;
      background: linear-gradient(to right, #F97316 var(--val, 50%), #2A2A2A var(--val, 50%));
    }
    .range-slider::-webkit-slider-thumb {
      -webkit-appearance:none; appearance:none;
      width:20px; height:20px; border-radius:50%;
      background:#F97316; cursor:pointer;
      border:3px solid #0C0C0C;
      box-shadow:0 0 0 1px #F97316;
      transition:transform 0.15s;
    }
    .range-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }

    .advantage-row {
      display:flex; align-items:flex-start; gap:10px;
      background:#141414; border:1px solid #2A2A2A; border-radius:8px;
      padding:11px 14px; transition:border-color 0.2s;
    }
    .advantage-row:hover { border-color:rgba(249,115,22,.4); }

    .grid-card {
      background:#141414; border:1px solid #2A2A2A; border-radius:12px;
      padding:24px; transition:all 0.25s; animation:filterFlip 0.3s ease both;
    }
    .grid-card:hover {
      border-color:#F97316; transform:translateY(-4px);
      box-shadow:0 12px 40px rgba(249,115,22,.1);
    }

    .step-item {
      display:flex; gap:20px; align-items:flex-start;
      padding:20px 0; border-bottom:1px solid #1a1a1a;
    }
    .step-item:last-child { border-bottom:none; }
  `}</style>
);

// ─── HOOK: useInView ──────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(12,12,12,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
      transition:"all 0.35s", padding:"0 40px",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em" }}>
          SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {[["Acasă",false],["Despre Noi",false],["Servicii",true],["Portofoliu",false],["Before/After",false],["Contact",false]].map(([l,a]) => (
            <a key={l} href="#" className={`nav-link${a?" active":""}`}>{l}</a>
          ))}
        </div>
        <button className="cta-btn-primary" style={{ padding:"9px 20px", fontSize:13, animation:"none", boxShadow:"none" }}>
          Cere ofertă
        </button>
      </div>
    </nav>
  );
}

// ─── PAGE HERO ────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section style={{ position:"relative", paddingTop:140, paddingBottom:80, padding:"140px 40px 80px", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), #0C0C0C",
      }}/>
      <div style={{
        position:"absolute", inset:"-50%", width:"200%", height:"200%",
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity:.5, animation:"grain 8s steps(2) infinite", pointerEvents:"none",
      }}/>
      <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:28, animation:"fadeIn 0.6s .1s both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", display:"inline-block", boxShadow:"0 0 8px #F97316" }}/>
          <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>Print UV · Laser CO₂ · Textile · Design</span>
        </div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,8vw,88px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20, animation:"fadeUp .9s .15s both" }}>
          Serviciile<br /><span style={{ color:"#F97316" }}>noastre</span>
        </h1>
        <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.75, maxWidth:560, margin:"0 auto 40px", animation:"fadeUp .9s .3s both" }}>
          De la pereți personalizați până la textile și obiecte promoționale — soluții vizuale complete pentru firme și persoane fizice.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", animation:"fadeUp .9s .45s both" }}>
          {["Wall Print UV","Laser CO₂","Obiecte personalizate","Print textile"].map(s => (
            <span key={s} style={{ background:"rgba(249,115,22,.1)", color:"#F97316", border:"1px solid rgba(249,115,22,.25)", fontSize:12, fontWeight:600, padding:"6px 16px", borderRadius:20, letterSpacing:"0.03em" }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4 MAIN SERVICES ──────────────────────────────────────────────────────────
function MainServices() {
  const [ref, inView] = useInView(.08);
  const services = [
    {
      icon:"🖨️", tag:"Principal", title:"Printare pe perete",
      desc:"Print UV direct pe perete pentru spații comerciale și rezidențiale, cu rezoluție ridicată, culori durabile și aplicare rapidă.",
      chips:["Rezoluție 2880 DPI","Culori durabile","Aplicare rapidă","Suprafețe multiple"],
      href:"#wall-print",
    },
    {
      icon:"🎁", tag:"Custom", title:"Obiecte personalizate",
      desc:"Personalizare pentru serii mici sau mari, ideale pentru activări de brand, pachete promoționale și cadouri memorabile.",
      chips:["Serii mici/mari","Culori vibrante","Mockup rapid","Branding corporate"],
      href:"#obiecte",
    },
    {
      icon:"👕", tag:"Textile", title:"Print textile",
      desc:"Soluții textile pentru echipe, evenimente și merchandising, cu atenție la detalii fine și rezistență în timp.",
      chips:["Calitate long-term","Detalii fine","Rezistență la spălări","Merchandising"],
      href:"#textile",
    },
    {
      icon:"🎨", tag:"Design", title:"Design personalizat",
      desc:"Pornim de la brief și direcție vizuală clară, livrăm design complet adaptat suprafeței și obiectivelor de business.",
      chips:["Brief & direcție","Concept vizual","Adaptare suport","Coerență brand"],
      href:"#design",
    },
  ];
  return (
    <section ref={ref} style={{ padding:"0 40px 80px", maxWidth:1200, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {services.map((s,i) => (
          <div key={i} className="service-card" style={{ opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:`opacity .6s ${i*.1}s, transform .6s ${i*.1}s` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18 }}>
              <span style={{ fontSize:38 }}>{s.icon}</span>
              <span style={{ fontSize:10, fontWeight:600, padding:"3px 10px", borderRadius:20, background:"rgba(249,115,22,.1)", color:"#F97316", border:"1px solid rgba(249,115,22,.25)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{s.tag}</span>
            </div>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.03em", marginBottom:10, color:"#fff" }}>{s.title}</h3>
            <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.65, marginBottom:18 }}>{s.desc}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
              {s.chips.map(c => (
                <span key={c} style={{ fontSize:11, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 9px" }}>{c}</span>
              ))}
            </div>
            <button className="cta-btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>Cere ofertă →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PRICE CALCULATOR ─────────────────────────────────────────────────────────
function PriceCalculator() {
  const [ref, inView] = useInView(.08);
  const [service, setService] = useState("wall");
  const [qty, setQty] = useState(6);
  const [quality, setQuality] = useState("standard");
  const [material, setMaterial] = useState("perete");
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceConfig = {
    wall: {
      label:"Wall Print UV", icon:"🖨️",
      unit:"m²", unitLabel:"Suprafață (m²)",
      min:1, max:30, step:0.5,
      materials:["Perete tencuit","Perete lavabil","MDF","Sticlă","Metal","Gresie"],
      basePrice:{ standard:45, premium:68, pro:95 },
      desc:"Preț per m² · Prețul final depinde de suprafață și complexitatea designului",
    },
    laser: {
      label:"Gravare laser CO₂", icon:"⚡",
      unit:"piese", unitLabel:"Cantitate (piese)",
      min:1, max:100, step:1,
      materials:["Lemn / MDF","Acril","Piele","Sticlă","Anodizat","Plute"],
      basePrice:{ standard:25, premium:40, pro:65 },
      desc:"Preț per piesă · Variază în funcție de complexitate și material",
    },
    textile: {
      label:"Print textile", icon:"👕",
      unit:"buc", unitLabel:"Cantitate (bucăți)",
      min:1, max:200, step:1,
      materials:["Tricou bumbac","Tricou poliester","Hanorac","Șapcă","Geantă textilă","Șort"],
      basePrice:{ standard:35, premium:50, pro:75 },
      desc:"Preț per bucată · Discount progresiv la comenzi ≥ 10 buc",
    },
    objects: {
      label:"Obiecte personalizate", icon:"🎁",
      unit:"buc", unitLabel:"Cantitate (bucăți)",
      min:1, max:500, step:1,
      materials:["Cană ceramică","Husă telefon","Cutie cadou","Agendă","Pix gravat","Trofeu"],
      basePrice:{ standard:20, premium:32, pro:48 },
      desc:"Preț per bucată · Discount la cantitate · Ambalare inclusă",
    },
  };

  const cfg = serviceConfig[service];

  const calcPrice = () => {
    const base = cfg.basePrice[quality];
    let price = base * qty;
    // Discount per volum
    if (qty >= 50) price *= .82;
    else if (qty >= 20) price *= .88;
    else if (qty >= 10) price *= .93;
    // Design fee
    const designFee = quality === "pro" ? 0 : quality === "premium" ? 80 : 120;
    return { subtotal: Math.round(price), design: designFee, total: Math.round(price) + designFee };
  };

  const prices = calcPrice();

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setCalculated(true); }, 900);
  };

  const sliderPct = ((qty - cfg.min) / (cfg.max - cfg.min)) * 100;

  return (
    <section ref={ref} id="calculator" style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:56, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:32, height:2, background:"#F97316" }}/>
              <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Estimare instantă</span>
            </div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:12 }}>
              Calculator<br />preț estimativ
            </h2>
            <p style={{ fontSize:16, color:"#9CA3AF", lineHeight:1.7, maxWidth:480 }}>
              Obține o estimare rapidă pentru proiectul tău. Prețul final se stabilește după consultanță gratuită.
            </p>
          </div>
          <div style={{ background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.2)", borderRadius:12, padding:"14px 20px", textAlign:"center" }}>
            <div style={{ fontSize:11, color:"#F97316", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Consultanță gratuită</div>
            <div style={{ fontSize:13, color:"#9CA3AF" }}>Răspuns în max 24h după trimitere</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:24, opacity:inView?1:0, transition:"opacity .7s .2s" }}>
          {/* Left: controls */}
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, padding:32 }}>

            {/* Step 1: Service */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ width:24, height:24, borderRadius:"50%", background:"#F97316", color:"#fff", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>1</span>
                <span style={{ fontSize:13, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:"0.05em" }}>Alege serviciul</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                {Object.entries(serviceConfig).map(([k,v]) => (
                  <button key={k} className={`calc-service-btn${service===k?" active":""}`} onClick={() => { setService(k); setCalculated(false); setQty(v.min); setMaterial(v.materials[0].toLowerCase().split(" ")[0]); }}>
                    <span style={{ fontSize:24 }}>{v.icon}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:service===k?"#F97316":"#9CA3AF", letterSpacing:"0.03em", lineHeight:1.3 }}>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Material */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ width:24, height:24, borderRadius:"50%", background:"#F97316", color:"#fff", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>2</span>
                <span style={{ fontSize:13, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:"0.05em" }}>Material / Produs</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {cfg.materials.map(m => (
                  <button key={m} onClick={() => { setMaterial(m); setCalculated(false); }} style={{
                    background: material===m ? "rgba(249,115,22,.12)" : "#1E1E1E",
                    color: material===m ? "#F97316" : "#9CA3AF",
                    border: `1px solid ${material===m ? "#F97316" : "#2A2A2A"}`,
                    borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:500,
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .15s",
                  }}>{m}</button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity slider */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ width:24, height:24, borderRadius:"50%", background:"#F97316", color:"#fff", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>3</span>
                <span style={{ fontSize:13, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:"0.05em" }}>{cfg.unitLabel}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:10 }}>
                <input
                  type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={qty}
                  className="range-slider"
                  style={{ "--val": `${sliderPct}%`, flex:1 }}
                  onChange={e => { setQty(Number(e.target.value)); setCalculated(false); }}
                />
                <div style={{ background:"#1E1E1E", border:"1px solid #2A2A2A", borderRadius:8, padding:"8px 14px", minWidth:80, textAlign:"center" }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#F97316", letterSpacing:"0.02em" }}>{qty}</span>
                  <span style={{ fontSize:11, color:"#6B7280", marginLeft:4 }}>{cfg.unit}</span>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:11, color:"#6B7280" }}>Min: {cfg.min} {cfg.unit}</span>
                {service==="textile" && qty>=10 && <span style={{ fontSize:11, color:"#22C55E" }}>✓ Discount cantitate activ</span>}
                {service==="objects" && qty>=20 && <span style={{ fontSize:11, color:"#22C55E" }}>✓ Discount cantitate activ</span>}
                <span style={{ fontSize:11, color:"#6B7280" }}>Max: {cfg.max} {cfg.unit}</span>
              </div>
            </div>

            {/* Step 4: Quality */}
            <div style={{ marginBottom:36 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ width:24, height:24, borderRadius:"50%", background:"#F97316", color:"#fff", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>4</span>
                <span style={{ fontSize:13, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:"0.05em" }}>Nivel serviciu</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {[
                  { k:"standard", label:"Standard", price:`de la ${cfg.basePrice.standard} lei/${cfg.unit}`, desc:"Design basic inclus", color:"#9CA3AF" },
                  { k:"premium", label:"Premium", price:`de la ${cfg.basePrice.premium} lei/${cfg.unit}`, desc:"Design custom + revizii", color:"#F97316", popular:true },
                  { k:"pro", label:"Pro", price:`de la ${cfg.basePrice.pro} lei/${cfg.unit}`, desc:"Dedicat brand enterprise", color:"#A78BFA" },
                ].map(q => (
                  <button key={q.k} onClick={() => { setQuality(q.k); setCalculated(false); }} style={{
                    background: quality===q.k ? "rgba(249,115,22,.08)" : "#1E1E1E",
                    border: `1px solid ${quality===q.k ? "#F97316" : "#2A2A2A"}`,
                    borderRadius:10, padding:"14px 12px", cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif", textAlign:"left", transition:"all .2s",
                    position:"relative",
                  }}>
                    {q.popular && <span style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", background:"#F97316", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:10, whiteSpace:"nowrap", letterSpacing:"0.05em" }}>POPULAR</span>}
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:"0.04em", color: quality===q.k ? "#F97316" : "#fff", marginBottom:4 }}>{q.label}</div>
                    <div style={{ fontSize:11, color:"#F97316", fontWeight:600, marginBottom:3 }}>{q.price}</div>
                    <div style={{ fontSize:11, color:"#6B7280" }}>{q.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate btn */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              style={{
                width:"100%", background:"#F97316", color:"#fff", border:"none",
                borderRadius:10, padding:"15px 24px", fontSize:16, fontWeight:700,
                cursor:loading?"wait":"pointer", fontFamily:"'DM Sans',sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                transition:"background .2s, transform .15s",
                opacity:loading?.75:1,
              }}
            >
              {loading ? (
                <>
                  <span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,.3)", borderTop:"2px solid #fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }}/>
                  Se calculează...
                </>
              ) : "Calculează estimare →"}
            </button>
            <p style={{ fontSize:11, color:"#6B7280", textAlign:"center", marginTop:10 }}>{cfg.desc}</p>
          </div>

          {/* Right: result panel */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {/* Result card */}
            <div style={{
              background: calculated ? "linear-gradient(135deg,#141414,#1a1a1a)" : "#141414",
              border:`1px solid ${calculated?"#F97316":"#2A2A2A"}`, borderRadius:16, padding:28,
              transition:"all .4s", flex:1,
              boxShadow: calculated ? "0 0 40px rgba(249,115,22,.12)" : "none",
            }}>
              {!calculated ? (
                <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"40px 0", textAlign:"center" }}>
                  <div style={{ fontSize:48, opacity:.3 }}>🧮</div>
                  <div style={{ fontSize:14, color:"#4B5563", lineHeight:1.6, maxWidth:240 }}>
                    Configurează opțiunile din stânga și apasă "Calculează" pentru estimare.
                  </div>
                </div>
              ) : (
                <div style={{ animation:"fadeUp .4s ease" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
                    <span style={{ width:8, height:8, borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 8px #22C55E" }}/>
                    <span style={{ fontSize:11, color:"#22C55E", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Estimare calculată</span>
                  </div>

                  {/* Summary */}
                  <div style={{ background:"#0C0C0C", borderRadius:10, padding:"16px", marginBottom:20 }}>
                    <div style={{ fontSize:11, color:"#6B7280", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Sumar comandă</div>
                    {[
                      ["Serviciu", cfg.label],
                      ["Material", material],
                      ["Cantitate", `${qty} ${cfg.unit}`],
                      ["Nivel", quality.charAt(0).toUpperCase()+quality.slice(1)],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #1a1a1a" }}>
                        <span style={{ fontSize:12, color:"#6B7280" }}>{k}</span>
                        <span style={{ fontSize:12, color:"#fff", fontWeight:500 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, color:"#9CA3AF" }}>Producție ({qty} {cfg.unit})</span>
                      <span style={{ fontSize:14, color:"#fff", fontWeight:600 }}>{prices.subtotal.toLocaleString("ro")} lei</span>
                    </div>
                    {prices.design > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:13, color:"#9CA3AF" }}>Design / Pregătire fișiere</span>
                        <span style={{ fontSize:14, color:"#fff", fontWeight:600 }}>{prices.design} lei</span>
                      </div>
                    )}
                    {(service==="textile"&&qty>=10)||(service==="objects"&&qty>=20)||(service==="laser"&&qty>=20) ? (
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:13, color:"#22C55E" }}>Discount cantitate</span>
                        <span style={{ fontSize:14, color:"#22C55E", fontWeight:600 }}>-{qty>=50?"18%":qty>=20?"12%":"7%"}</span>
                      </div>
                    ) : null}
                    <div style={{ height:1, background:"#2A2A2A", margin:"4px 0" }}/>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:14, fontWeight:600, color:"#fff" }}>Total estimat</span>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:"0.02em", color:"#F97316", lineHeight:1 }}>
                          {prices.total.toLocaleString("ro")} <span style={{ fontSize:18 }}>lei</span>
                        </div>
                        <div style={{ fontSize:10, color:"#6B7280" }}>fără TVA</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background:"rgba(249,115,22,.06)", border:"1px solid rgba(249,115,22,.15)", borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
                    <div style={{ fontSize:11, color:"#F97316", fontWeight:600, marginBottom:3 }}>⚠ Estimare orientativă</div>
                    <div style={{ fontSize:11, color:"#6B7280", lineHeight:1.5 }}>Prețul final se stabilește după analiza proiectului. Consultanța este gratuită.</div>
                  </div>

                  <button className="cta-btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"13px" }}>
                    Cere ofertă exactă →
                  </button>
                  <button className="cta-btn-outline" style={{ width:"100%", justifyContent:"center", fontSize:13, padding:"11px", marginTop:8 }}>
                    Recalculează
                  </button>
                </div>
              )}
            </div>

            {/* Info cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { icon:"⚡", label:"Răspuns rapid", desc:"Max 24h" },
                { icon:"🎨", label:"Design inclus", desc:"La Premium/Pro" },
                { icon:"📦", label:"Livrare", desc:"48h standard" },
                { icon:"✓", label:"Fără surprize", desc:"Preț fix" },
              ].map(c => (
                <div key={c.label} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ fontSize:18 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:"#fff" }}>{c.label}</div>
                    <div style={{ fontSize:11, color:"#6B7280" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LASER CATEGORIES ─────────────────────────────────────────────────────────
function LaserCategories() {
  const [ref, inView] = useInView(.1);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label:"Semnalistică", icon:"🪧", items:["Plăcuțe firme","Litere volumetrice","Indicatoare direcționale","Plăci informative","Numere apartament","Logos acril"] },
    { label:"Gifting premium", icon:"🎁", items:["Cutii cadou gravate","Trofee personalizate","Rame foto","Agende leather","Portofele gravate","Seturi corporate"] },
    { label:"Retail branding", icon:"🏪", items:["Etichete produse","Display-uri produs","Standuri acril","Prețiere premium","Packagig personalizat","Pop-up cards"] },
    { label:"Corporate kits", icon:"💼", items:["Kit onboarding","Carduri acril","Insigne personalizate","Suportul prezentări","Dosare gravate","Sticle personalizate"] },
    { label:"Prototipare", icon:"⚙️", items:["Modele scale 1:1","Piese funcționale","Forme personalizate","Testare materiale","Jigs & fixtures","Decupaje precise"] },
    { label:"Serii scurte", icon:"📦", items:["10–500 bucăți","Producție rapidă","Control calitate","Mix materiale","Varietate finisaje","Livrare curier"] },
    { label:"Cutii personalizate", icon:"📮", items:["Cutii rigide MDF","Cutii acril","Casete bijuterii","Packaging luxos","Cutiuțe condimente","Wine boxes"] },
    { label:"Ediții limitate", icon:"⭐", items:["Numerotare unică","Certificate autenticitate","Branding exclusiv","Colecții sezoniere","Colaborări artă","Tiraje mici"] },
  ];
  const materials = ["Lemn","MDF","Acril","Sticlă","Piele","Anodizat","Plutăe","Aluminiu","Cauciuc","Silicon"];

  return (
    <section ref={ref} style={{ padding:"80px 40px", maxWidth:1200, margin:"0 auto" }}>
      <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:48 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <div style={{ width:32, height:2, background:"#F97316" }}/>
          <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Laser CO₂ profesional</span>
        </div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:12 }}>
          Categorii rapide<br />pentru gravură personalizată
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:28, opacity:inView?1:0, transition:"opacity .7s .15s" }}>
        {tabs.map((t,i) => (
          <button key={i} className={`laser-tab${activeTab===i?" active":""}`} onClick={() => setActiveTab(i)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, opacity:inView?1:0, transition:"opacity .7s .25s", marginBottom:32 }}>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.03em", marginBottom:16, color:"#fff" }}>
            {tabs[activeTab].icon} {tabs[activeTab].label}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {tabs[activeTab].items.map(item => (
              <div key={item} className="advantage-row">
                <span style={{ color:"#F97316", fontWeight:700, flexShrink:0 }}>▸</span>
                <span style={{ fontSize:13, color:"#9CA3AF" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24, marginBottom:14 }}>
            <div style={{ fontSize:12, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>Materiale compatibile</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {materials.map(m => <span key={m} className="material-chip">{m}</span>)}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { icon:"🎯", text:"Fiabilitate producție repetată" },
              { icon:"✂️", text:"Linii curate la dimensiuni mici" },
              { icon:"📦", text:"Loturi mixte — personalizare eficientă" },
              { icon:"🎨", text:"Integrare ușoară în identitate vizuală" },
            ].map(f => (
              <div key={f.text} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"14px 12px", display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{f.icon}</span>
                <span style={{ fontSize:12, color:"#9CA3AF", lineHeight:1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign:"center", opacity:inView?1:0, transition:"opacity .7s .35s" }}>
        <button className="cta-btn-primary">Cere ofertă gravare laser →</button>
      </div>
    </section>
  );
}

// ─── FILTERED GRID ────────────────────────────────────────────────────────────
function FilteredServicesGrid() {
  const [ref, inView] = useInView(.08);
  const [filter, setFilter] = useState("all");
  const cards = [
    { cat:"walls", title:"Wall Print", icon:"🖨️", desc:"Grafici de impact pentru birouri, retail și HoReCa.", chips:["Fără folii","Detalii precise","Cerneluri UV"] },
    { cat:"objects", title:"Promo Objects", icon:"🎁", desc:"Produse personalizate pentru campanii și onboarding.", chips:["Loturi flexibile","Branding consistent","Ambalare premium"] },
    { cat:"textiles", title:"Textile Print", icon:"👕", desc:"Tricouri, hanorace și accesorii pentru echipe sau merch.", chips:["Rezistență la spălări","Culori vibrante","Texturi plăcute"] },
    { cat:"design", title:"Visual Design", icon:"🎨", desc:"Concept, adaptare și layout pentru print fizic.", chips:["Direcție artistică","Fișiere producție","Aliniere brand guide"] },
  ];
  const filters = [["all","Toate"],["walls","Walls"],["objects","Objects"],["textiles","Textiles"],["design","Design"]];
  const visible = filter==="all" ? cards : cards.filter(c=>c.cat===filter);

  return (
    <section ref={ref} style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"80px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:32, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:32, height:2, background:"#F97316" }}/>
              <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Filtrează</span>
            </div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,4vw,52px)", letterSpacing:"0.02em", lineHeight:.95 }}>
              Servicii pentru<br />branding memorabil
            </h2>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {filters.map(([k,l]) => (
              <button key={k} className={`filter-btn${filter===k?" active":""}`} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, opacity:inView?1:0, transition:"opacity .7s .2s" }}>
          {visible.map((c,i) => (
            <div key={`${filter}-${i}`} className="grid-card" style={{ animationDelay:`${i*.08}s` }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                <span style={{ fontSize:32 }}>{c.icon}</span>
                <span style={{ fontSize:10, background:"rgba(249,115,22,.1)", color:"#F97316", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"3px 10px", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>{c.cat}</span>
              </div>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.03em", marginBottom:8, color:"#fff" }}>{c.title}</h3>
              <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.65, marginBottom:16 }}>{c.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
                {c.chips.map(ch => (
                  <span key={ch} style={{ fontSize:11, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 9px" }}>{ch}</span>
                ))}
              </div>
              <button className="cta-btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>Cere ofertă →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS 4 STEPS ─────────────────────────────────────────────────────────
function Process4Steps() {
  const [ref, inView] = useInView(.15);
  const steps = [
    { num:"01", title:"Ne trimiți detaliile", desc:"Dimensiuni, suprafață, stil vizual, termen și locația proiectului.", icon:"📋" },
    { num:"02", title:"Validăm designul", desc:"Adaptăm materialele grafice pentru un rezultat impecabil. Revizii incluse.", icon:"✏️" },
    { num:"03", title:"Programăm execuția", desc:"Stabilim calendarul ideal și confirmăm toate detaliile cu tine.", icon:"📅" },
    { num:"04", title:"Printăm & predăm", desc:"Execuție atentă, curată, cu predare finală și recomandări de întreținere.", icon:"🚀" },
  ];
  return (
    <section ref={ref} style={{ padding:"80px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:56, textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Procesul nostru</span>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.02em", lineHeight:.95 }}>
            Proces detaliat în 4 pași
          </h2>
        </div>

        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, overflow:"hidden" }}>
          {steps.map((s,i) => (
            <div key={i} className="step-item" style={{
              padding:"24px 32px", borderBottom:i<3?"1px solid #1a1a1a":"none",
              opacity:inView?1:0, transform:inView?"none":"translateX(-24px)",
              transition:`opacity .6s ${.2+i*.1}s, transform .6s ${.2+i*.1}s`,
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:52, height:52, borderRadius:"50%", background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.3)", flexShrink:0 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#F97316", letterSpacing:"0.04em" }}>{s.num}</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:20 }}>{s.icon}</span>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.03em", color:"#fff" }}>{s.title}</h3>
                </div>
                <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.6 }}>{s.desc}</p>
              </div>
              {i < 3 && <div style={{ fontSize:20, color:"#2A2A2A", alignSelf:"center", flexShrink:0 }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const [ref, inView] = useInView(.2);
  return (
    <section ref={ref} style={{ padding:"80px 40px 96px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{
          background:"linear-gradient(135deg,#141414,#1a1a1a)", border:"1px solid #2A2A2A",
          borderRadius:20, padding:"64px 56px", position:"relative", overflow:"hidden",
          opacity:inView?1:0, transform:inView?"none":"translateY(32px)", transition:"opacity .8s, transform .8s",
        }}>
          <div style={{ position:"absolute", top:0, right:0, width:400, height:400, background:"radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, left:0, width:300, height:300, background:"radial-gradient(circle,rgba(234,88,12,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative", textAlign:"center" }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20 }}>
              Ai nevoie de un<br /><span style={{ color:"#F97316" }}>pachet personalizat?</span>
            </h2>
            <p style={{ fontSize:17, color:"#9CA3AF", lineHeight:1.7, maxWidth:520, margin:"0 auto 40px" }}>
              Combinăm serviciile în funcție de obiectivele tale de branding sau amenajare. Consultanță gratuită, fără angajament.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="cta-btn-primary" style={{ fontSize:16, padding:"16px 36px" }}>Cere ofertă personalizată →</button>
              <button className="cta-btn-outline" style={{ fontSize:16, padding:"16px 36px" }}>↳ Vezi portofoliul</button>
            </div>
            <div style={{ marginTop:28, display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
              {["Răspuns în max 24h","Consultanță gratuită","Fără angajament"].map(t => (
                <div key={t} style={{ fontSize:13, color:"#6B7280", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ color:"#22C55E" }}>✓</span> {t}
                </div>
              ))}
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
    { title:"Servicii", links:["Toate serviciile","Print UV pe perete","Gravare laser CO₂","Pregătire fișiere","Before / After","Portofoliu"] },
    { title:"Contact",  links:["Timișoara, România","0779 281 047","contact@printpeperete.com","Facebook"] },
    { title:"Program",  links:["L–V: 09:00 – 18:00","Sâmbătă: 10:00 – 14:00","Duminică: Închis"] },
    { title:"Legal",    links:["Termeni și condiții","Politică confidențialitate","Politică cookies","ANPC","FAQ"] },
  ];
  return (
    <footer style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"64px 40px 32px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.06em", marginBottom:12 }}>
              SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
            </div>
            <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.7, marginBottom:20, maxWidth:240 }}>
              Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Transfer bancar","Card bancar","Numerar","Factură"].map(p => (
                <span key={p} style={{ fontSize:11, background:"#141414", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 8px" }}>{p}</span>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.06em", marginBottom:14 }}>{c.title}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {c.links.map(l => (
                  <a key={l} href="#" style={{ fontSize:13, color:"#6B7280", textDecoration:"none", transition:"color .18s" }}
                    onMouseEnter={e=>e.target.style.color="#F97316"}
                    onMouseLeave={e=>e.target.style.color="#6B7280"}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #1a1a1a", paddingTop:24, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontSize:12, color:"#4B5563" }}>© 2026 SDG PRINT & Design. Toate drepturile rezervate.</span>
          <span style={{ fontSize:12, color:"#4B5563" }}>Timișoara, Arad, Cluj-Napoca și toată România</span>
        </div>
      </div>
    </footer>
  );
}

// ─── WA WIDGET ────────────────────────────────────────────────────────────────
function WAWidget() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setVisible(true),3000); return()=>clearTimeout(t); }, []);
  return (
    <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" style={{
      position:"fixed", bottom:28, right:28, zIndex:999,
      width:56, height:56, borderRadius:"50%", background:"#25D366",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:26, textDecoration:"none",
      boxShadow:"0 4px 20px rgba(37,211,102,.35)",
      opacity:visible?1:0, transform:visible?"none":"translateY(20px)",
      transition:"opacity .4s, transform .4s",
    }}>📱</a>
  );
}

// ─── MOBILE BAR ───────────────────────────────────────────────────────────────
function MobileBar() {
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:98,
      background:"rgba(20,20,20,.97)", backdropFilter:"blur(12px)",
      borderTop:"1px solid #2A2A2A", display:"flex", gap:8, padding:10,
    }}>
      {[
        { icon:"📞", label:"Sună acum", bg:"#1E1E1E", href:"tel:0779281047" },
        { icon:"📱", label:"WhatsApp",  bg:"#25D366", href:"https://wa.me/40779281047" },
        { icon:"✉",  label:"Cere ofertă",bg:"#F97316", href:"#contact" },
      ].map(b => (
        <a key={b.label} href={b.href} style={{
          flex:1, background:b.bg, color:"#fff", borderRadius:9,
          padding:"10px 6px", fontSize:12, fontWeight:700, cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",
          display:"flex", flexDirection:"column", alignItems:"center", gap:3,
          textDecoration:"none",
        }}>
          <span style={{ fontSize:18 }}>{b.icon}</span>
          <span>{b.label}</span>
        </a>
      ))}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <PageHero />
        <MainServices />
        <PriceCalculator />
        <LaserCategories />
        <FilteredServicesGrid />
        <Process4Steps />
        <FinalCTA />
      </main>
      <Footer />
      <WAWidget />
      <MobileBar />
    </>
  );
}
