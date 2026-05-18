import { useState, useEffect, useRef, useCallback } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { scroll-behavior:smooth; }
    body { background:#0C0C0C; color:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#0C0C0C; }
    ::-webkit-scrollbar-thumb { background:#2A2A2A; border-radius:3px; }
    ::-webkit-scrollbar-thumb:hover { background:#F97316; }
    ::selection { background:rgba(249,115,22,0.3); color:#fff; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
    @keyframes pulse-ring {
      0%{box-shadow:0 0 0 0 rgba(249,115,22,.45)}
      70%{box-shadow:0 0 0 12px rgba(249,115,22,0)}
      100%{box-shadow:0 0 0 0 rgba(249,115,22,0)}
    }
    @keyframes grain {
      0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
      30%{transform:translate(3%,2%)} 50%{transform:translate(-1%,4%)}
      70%{transform:translate(4%,-1%)} 90%{transform:translate(-3%,3%)}
    }
    @keyframes overlayIn {
      from{opacity:0;transform:translateY(8px)}
      to{opacity:1;transform:translateY(0)}
    }
    @keyframes modalIn {
      from{opacity:0;transform:scale(.96) translateY(16px)}
      to{opacity:1;transform:scale(1) translateY(0)}
    }
    @keyframes counterUp {
      from{opacity:0;transform:translateY(10px)}
      to{opacity:1;transform:translateY(0)}
    }

    .nav-link { font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none; transition:color .2s; padding-bottom:2px; position:relative; font-family:'DM Sans',sans-serif; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#F97316; transition:width .25s; }
    .nav-link:hover { color:#fff; } .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#F97316; } .nav-link.active::after { width:100%; }

    .cta-btn-primary { background:#F97316; color:#fff; border:none; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; animation:pulse-ring 2.5s infinite; transition:background .2s,transform .15s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-primary:hover { background:#EA580C; transform:translateY(-2px); animation:none; box-shadow:0 8px 24px rgba(249,115,22,.35); }
    .cta-btn-outline { background:transparent; color:#fff; border:1px solid #2A2A2A; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-outline:hover { border-color:#F97316; color:#F97316; }

    .filter-pill { background:#141414; color:#9CA3AF; border:1px solid #2A2A2A; border-radius:30px; padding:9px 20px; font-size:13px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; white-space:nowrap; display:inline-flex; align-items:center; gap:7px; }
    .filter-pill:hover:not(.active) { border-color:#4B5563; color:#fff; }
    .filter-pill.active { background:#F97316; color:#fff; border-color:#F97316; }
    .filter-pill .count { font-size:10px; background:rgba(255,255,255,.15); border-radius:10px; padding:1px 6px; }
    .filter-pill.active .count { background:rgba(255,255,255,.25); }

    .porto-card { position:relative; border-radius:12px; overflow:hidden; cursor:pointer; background:#141414; }
    .porto-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s cubic-bezier(0.25,0.46,0.45,0.94); }
    .porto-card:hover .porto-card-img { transform:scale(1.06); }
    .porto-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.4) 50%, transparent 100%); opacity:0; transition:opacity .3s; display:flex; flex-direction:column; justify-content:flex-end; padding:20px; }
    .porto-card:hover .porto-overlay { opacity:1; }
    .porto-overlay-content { animation:overlayIn .3s ease; }

    .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.85); backdropFilter:blur(12px); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn .2s ease; }
    .modal-card { background:#141414; border:1px solid #2A2A2A; border-radius:20px; max-width:860px; width:100%; max-height:90vh; overflow-y:auto; animation:modalIn .3s ease; }

    .sort-btn { background:transparent; color:#6B7280; border:1px solid #2A2A2A; border-radius:7px; padding:7px 14px; font-size:12px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .15s; display:flex; align-items:center; gap:6px; }
    .sort-btn:hover { color:#fff; border-color:#4B5563; }
    .sort-btn.active { color:#F97316; border-color:rgba(249,115,22,.4); background:rgba(249,115,22,.06); }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  // Residential
  { id:1,  cat:"residential", title:"Mural geometric dormitor",   location:"Timișoara",   area:"14 m²",  duration:"6h",  service:"Wall Print UV",      tags:["Rezidențial","Geometric","Abstract"],     color:"linear-gradient(135deg,#1a0a2a,#2d1045,#1a0a2a)", accent:"#A78BFA", h:280 },
  { id:2,  cat:"residential", title:"Mural floral living",        location:"Arad",        area:"22 m²",  duration:"1 zi", service:"Wall Print UV",      tags:["Rezidențial","Floral","Colorat"],         color:"linear-gradient(135deg,#0a1a0a,#143020,#0a1a0a)", accent:"#22C55E", h:360 },
  { id:3,  cat:"residential", title:"Accent perete dormitor copii",location:"Cluj-Napoca",area:"9 m²",   duration:"4h",  service:"Wall Print UV",      tags:["Rezidențial","Copii","Colorat"],          color:"linear-gradient(135deg,#001a2a,#002535,#001a2a)", accent:"#3B82F6", h:240 },
  { id:4,  cat:"residential", title:"Gresie baie personalizată",   location:"Timișoara",   area:"6 m²",   duration:"3h",  service:"Wall Print UV",      tags:["Rezidențial","Baie","Modern"],            color:"linear-gradient(135deg,#1a1008,#2a1c00,#1a1008)", accent:"#F59E0B", h:300 },
  // Commercial
  { id:5,  cat:"commercial",  title:"Recepție clinică stomatologică",location:"Timișoara", area:"18 m²", duration:"1 zi", service:"Wall Print UV",     tags:["Medical","Recepție","Corporate"],         color:"linear-gradient(135deg,#0a1a10,#0d2518,#0a1a10)", accent:"#22C55E", h:320 },
  { id:6,  cat:"commercial",  title:"Showroom auto premium",        location:"Arad",       area:"30 m²", duration:"1.5 zi",service:"Wall Print UV",    tags:["Automotive","Showroom","Premium"],        color:"linear-gradient(135deg,#1a0800,#2a1000,#1a0800)", accent:"#F97316", h:260 },
  { id:7,  cat:"commercial",  title:"Restaurant birou focal",       location:"Timișoara",  area:"20 m²", duration:"8h",  service:"Wall Print UV",      tags:["HoReCa","Restaurant","Ambient"],          color:"linear-gradient(135deg,#1a0000,#280400,#1a0000)", accent:"#EF4444", h:380 },
  { id:8,  cat:"commercial",  title:"Sală conferință corporate",    location:"Cluj-Napoca",area:"40 m²", duration:"2 zi", service:"Wall Print UV",     tags:["Corporate","Office","Branding"],          color:"linear-gradient(135deg,#001020,#001828,#001020)", accent:"#3B82F6", h:290 },
  { id:9,  cat:"commercial",  title:"Birou creativ open-space",     location:"Timișoara",  area:"35 m²", duration:"2 zi", service:"Wall Print UV",     tags:["Office","Creative","Motivational"],       color:"linear-gradient(135deg,#0a001a,#120025,#0a001a)", accent:"#A78BFA", h:340 },
  { id:10, cat:"commercial",  title:"Cafenea specialty coffee",     location:"Oradea",     area:"16 m²", duration:"1 zi", service:"Wall Print UV",     tags:["HoReCa","Cafenea","Artisanal"],           color:"linear-gradient(135deg,#100800,#1a1000,#100800)", accent:"#D97706", h:270 },
  // Textile
  { id:11, cat:"textile",     title:"Tricouri echipă startup",      location:"Timișoara",  area:"60 buc", duration:"48h", service:"Print Textile",     tags:["Corporate","Tricouri","Merch"],           color:"linear-gradient(135deg,#1a0a00,#2a1400,#1a0a00)", accent:"#F97316", h:260 },
  { id:12, cat:"textile",     title:"Hanorace festival muzică",     location:"Cluj-Napoca",area:"200 buc",duration:"5 zi",service:"Print Textile",     tags:["Evenimente","Hanorace","Festival"],       color:"linear-gradient(135deg,#00101a,#001525,#00101a)", accent:"#3B82F6", h:310 },
  { id:13, cat:"textile",     title:"Uniforme echipă hospitality",  location:"Timișoara",  area:"35 buc", duration:"3 zi",service:"Print Textile",     tags:["HoReCa","Uniforme","Profesional"],        color:"linear-gradient(135deg,#001a00,#002500,#001a00)", accent:"#22C55E", h:280 },
  { id:14, cat:"textile",     title:"Șepci personalizate brand",    location:"București",  area:"150 buc",duration:"4 zi",service:"Print Textile",     tags:["Branding","Șepci","Corporate"],           color:"linear-gradient(135deg,#1a0018,#250020,#1a0018)", accent:"#EC4899", h:240 },
  // Custom
  { id:15, cat:"custom",      title:"Trofee corporate gravate",     location:"Timișoara",  area:"50 buc", duration:"2 zi",service:"Gravare Laser CO₂", tags:["Corporate","Trofee","Premium"],           color:"linear-gradient(135deg,#181000,#221800,#181000)", accent:"#F59E0B", h:290 },
  { id:16, cat:"custom",      title:"Cutii cadou lemn personalizate",location:"Arad",      area:"30 buc", duration:"1 zi",service:"Gravare Laser CO₂", tags:["Gifting","Lemn","Premium"],               color:"linear-gradient(135deg,#0a1500,#102000,#0a1500)", accent:"#84CC16", h:260 },
  { id:17, cat:"custom",      title:"Signalistică acril firmă",     location:"Timișoara",  area:"12 buc", duration:"1 zi",service:"Gravare Laser CO₂", tags:["Semnalistică","Acril","Office"],          color:"linear-gradient(135deg,#001020,#001830,#001020)", accent:"#22D3EE", h:320 },
  { id:18, cat:"custom",      title:"Căni ceramică foto brand",     location:"Cluj-Napoca",area:"100 buc",duration:"3 zi",service:"Obiecte Custom",    tags:["Gifting","Căni","Corporate"],             color:"linear-gradient(135deg,#100010,#1a001a,#100010)", accent:"#C084FC", h:270 },
];

const FILTERS = [
  { id:"all",         label:"Toate",                icon:"◉" },
  { id:"commercial",  label:"Commercial",           icon:"🏢" },
  { id:"residential", label:"Residential",          icon:"🏠" },
  { id:"textile",     label:"Textile",              icon:"👕" },
  { id:"custom",      label:"Custom / Laser",       icon:"⚡" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(target, dur = 1600, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s = 0; const step = target / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= target) { setV(target); clearInterval(t); } else setV(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [active, target, dur]);
  return v;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:sc?"rgba(12,12,12,.92)":"transparent", backdropFilter:sc?"blur(18px)":"none", borderBottom:sc?"1px solid #2A2A2A":"1px solid transparent", transition:"all .35s", padding:"0 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em" }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {[["Acasă",false],["Despre Noi",false],["Servicii",false],["Portofoliu",true],["Before/After",false],["Contact",false]].map(([l,a]) => (
            <a key={l} href="#" className={`nav-link${a?" active":""}`}>{l}</a>
          ))}
        </div>
        <button className="cta-btn-primary" style={{ padding:"9px 20px", fontSize:13, animation:"none", boxShadow:"none" }}>Cere ofertă</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [ref, inView] = useInView(.1);
  const count = useCounter(18, 1400, inView);
  return (
    <section ref={ref} style={{ position:"relative", padding:"140px 40px 72px", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), #0C0C0C" }}/>
      <div style={{ position:"absolute", inset:"-50%", width:"200%", height:"200%", backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:.5, animation:"grain 8s steps(2) infinite", pointerEvents:"none" }}/>
      <div style={{ position:"relative", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"flex-end" }}>
          <div style={{ animation:"fadeUp .9s .1s both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:28 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", boxShadow:"0 0 8px #F97316", display:"inline-block" }}/>
              <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>Proiecte reale · Clienți mulțumiți</span>
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,8vw,88px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20 }}>
              Portofoliu<br /><span style={{ color:"#F97316" }}>de lucrări</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.75, maxWidth:560 }}>
              Exemple reale de proiecte livrate în Timișoara și în toată România — wall print UV, gravare laser, textile și obiecte personalizate.
            </p>
          </div>
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, animation:"fadeIn .9s .4s both" }}>
            {[
              { val:count, suffix:"+", label:"Proiecte livrate", color:"#F97316" },
              { val:"48", suffix:"h", label:"Timp mediu execuție", color:"#22C55E" },
              { val:"4", suffix:"", label:"Categorii servicii", color:"#3B82F6" },
              { val:"100", suffix:"%", label:"Clienți satisfăcuți", color:"#A78BFA" },
            ].map(s => (
              <div key={s.label} style={{ background:"#141414", border:`1px solid ${s.color}22`, borderRadius:12, padding:"16px 18px", textAlign:"center", minWidth:110 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:s.color, letterSpacing:"0.02em", lineHeight:1 }}>{s.val}{s.suffix}</div>
                <div style={{ fontSize:11, color:"#6B7280", marginTop:4, lineHeight:1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick, inView }) {
  return (
    <div
      className="porto-card"
      onClick={() => onClick(project)}
      style={{
        height: project.h,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px) scale(.97)",
        transition: `opacity .55s ${Math.min(index * .07, .5)}s, transform .55s ${Math.min(index * .07, .5)}s`,
      }}
    >
      {/* Placeholder visual */}
      <div style={{ width:"100%", height:"100%", background:project.color, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 30%, rgba(255,255,255,.04) 0%, transparent 60%)" }}/>
        <div style={{ textAlign:"center", opacity:.2 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:"0.05em", color:"#fff" }}>
            {project.service === "Wall Print UV" ? "🖨️" : project.service === "Print Textile" ? "👕" : project.service === "Gravare Laser CO₂" ? "⚡" : "🎁"}
          </div>
        </div>
        {/* Colored accent corner */}
        <div style={{ position:"absolute", top:0, right:0, width:80, height:80, background:`radial-gradient(circle at top right, ${project.accent}20, transparent)` }}/>
      </div>

      {/* Overlay */}
      <div className="porto-overlay">
        <div className="porto-overlay-content">
          <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
            {project.tags.slice(0,2).map(t => (
              <span key={t} style={{ fontSize:10, background:"rgba(249,115,22,.2)", color:"#F97316", border:"1px solid rgba(249,115,22,.3)", borderRadius:4, padding:"2px 8px", fontWeight:600, letterSpacing:"0.04em" }}>{t}</span>
            ))}
          </div>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.03em", marginBottom:4, color:"#fff", lineHeight:1.1 }}>{project.title}</h3>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>📍 {project.location}</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>⏱ {project.duration}</span>
          </div>
        </div>
      </div>

      {/* Service badge */}
      <div style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)", borderRadius:6, padding:"4px 10px", fontSize:10, color:"#9CA3AF", fontWeight:500 }}>
        {project.service}
      </div>
    </div>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        {/* Visual */}
        <div style={{ height:320, background:project.color, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 30%, rgba(255,255,255,.05) 0%, transparent 60%)" }}/>
          <div style={{ opacity:.15, fontFamily:"'Bebas Neue',sans-serif", fontSize:72, letterSpacing:"0.05em", color:"#fff" }}>
            {project.service === "Wall Print UV" ? "🖨️" : project.service === "Print Textile" ? "👕" : project.service === "Gravare Laser CO₂" ? "⚡" : "🎁"}
          </div>
          <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,.5)", border:"1px solid rgba(255,255,255,.15)", color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>×</button>
          <div style={{ position:"absolute", bottom:16, left:20, display:"flex", gap:6 }}>
            {project.tags.map(t => <span key={t} style={{ fontSize:11, background:"rgba(0,0,0,.5)", backdropFilter:"blur(6px)", color:"#fff", borderRadius:5, padding:"3px 10px", fontWeight:500 }}>{t}</span>)}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"28px 32px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, marginBottom:20 }}>
            <div>
              <div style={{ fontSize:11, color:"#F97316", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{project.service}</div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.03em", color:"#fff", lineHeight:1 }}>{project.title}</h2>
            </div>
            <div style={{ background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.2)", borderRadius:10, padding:"10px 16px", textAlign:"center", flexShrink:0 }}>
              <div style={{ fontSize:11, color:"#6B7280", marginBottom:2 }}>Suprafață</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#F97316", letterSpacing:"0.02em" }}>{project.area}</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:24 }}>
            {[
              { label:"Locație", val:project.location, icon:"📍" },
              { label:"Durată execuție", val:project.duration, icon:"⏱" },
              { label:"Categorie", val:project.cat.charAt(0).toUpperCase()+project.cat.slice(1), icon:"🏷" },
            ].map(s => (
              <div key={s.label} style={{ background:"#1E1E1E", borderRadius:10, padding:"14px 16px" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontSize:11, color:"#6B7280", marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:14, color:"#fff", fontWeight:600 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Description placeholder */}
          <div style={{ background:"#1a1a1a", borderRadius:10, padding:"16px 18px", marginBottom:24, border:"1px solid #2A2A2A" }}>
            <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.75 }}>
              Proiect realizat în <strong style={{ color:"#fff" }}>{project.location}</strong> — {project.service.toLowerCase()} pe o suprafață de <strong style={{ color:"#F97316" }}>{project.area}</strong>, finalizat în <strong style={{ color:"#fff" }}>{project.duration}</strong>. Executat cu echipament UV de înaltă rezoluție, rezultând culori vii, detalii fine și finisaj durabil, adaptat perfect spațiului și identității vizuale a clientului.
            </p>
          </div>

          {/* Features */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
            {["Rezoluție 2880 DPI","Culori UV durabile","Fără autocolant","Execuție curată","Garanție inclus"].map(f => (
              <span key={f} style={{ fontSize:12, background:"#141414", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:6, padding:"5px 12px", display:"flex", alignItems:"center", gap:5 }}><span style={{ color:"#F97316" }}>✓</span>{f}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12 }}>
            <button className="cta-btn-primary" style={{ flex:1, justifyContent:"center" }}>Cere ofertă similară →</button>
            <button className="cta-btn-outline" style={{ justifyContent:"center" }} onClick={onClose}>Închide</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MASONRY GRID ─────────────────────────────────────────────────────────────
function MasonryGrid({ projects }) {
  const [ref, inView] = useInView(.05);
  const [selected, setSelected] = useState(null);

  // Split into 3 columns
  const cols = [[], [], []];
  projects.forEach((p, i) => cols[i % 3].push(p));

  return (
    <div ref={ref}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, alignItems:"start" }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {col.map((p, pi) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={ci + pi * 3}
                onClick={setSelected}
                inView={inView}
              />
            ))}
          </div>
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(12);

  const filtered = PROJECTS
    .filter(p => activeFilter === "all" || p.cat === activeFilter)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "area-desc") return parseInt(b.area) - parseInt(a.area);
      if (sortBy === "duration-asc") return a.duration.localeCompare(b.duration);
      return 0;
    });

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const catCount = (id) => id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.cat === id).length;

  return (
    <section style={{ padding:"0 40px 96px", maxWidth:1200, margin:"0 auto" }}>
      {/* Controls bar */}
      <div style={{ marginBottom:32 }}>
        {/* Filters */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {FILTERS.map(f => (
            <button key={f.id} className={`filter-pill${activeFilter===f.id?" active":""}`}
              onClick={() => { setActiveFilter(f.id); setVisible(12); }}>
              <span>{f.icon}</span> {f.label}
              <span className="count">{catCount(f.id)}</span>
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, maxWidth:320 }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"#4B5563" }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Caută proiect, locație, tag..."
              style={{ width:"100%", background:"#141414", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 14px 9px 34px", color:"#fff", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none", colorScheme:"dark" }}
            />
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <span style={{ fontSize:12, color:"#6B7280" }}>Sortare:</span>
            {[
              { id:"default", label:"Implicit" },
              { id:"area-desc", label:"Suprafață ↓" },
              { id:"duration-asc", label:"Durată ↑" },
            ].map(s => (
              <button key={s.id} className={`sort-btn${sortBy===s.id?" active":""}`} onClick={() => setSortBy(s.id)}>{s.label}</button>
            ))}
          </div>
          <span style={{ fontSize:12, color:"#6B7280", marginLeft:"auto" }}>
            {filtered.length} proiect{filtered.length!==1?"e":""} {activeFilter!=="all"?`în categoria "${FILTERS.find(f=>f.id===activeFilter)?.label}"`:""} {search?`pentru "${search}"`:""}</span>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"80px 0" }}>
          <div style={{ fontSize:48, marginBottom:16, opacity:.3 }}>🔍</div>
          <div style={{ fontSize:18, color:"#6B7280", marginBottom:8 }}>Niciun proiect găsit</div>
          <button onClick={() => { setSearch(""); setActiveFilter("all"); }} style={{ background:"none", border:"none", color:"#F97316", fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Resetează filtrele</button>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && <MasonryGrid projects={shown} />}

      {/* Load more */}
      {hasMore && (
        <div style={{ textAlign:"center", marginTop:40 }}>
          <button
            onClick={() => setVisible(v => v + 6)}
            className="cta-btn-outline"
            style={{ fontSize:14, padding:"13px 32px" }}
          >
            Încarcă mai multe ({filtered.length - visible} rămase) ↓
          </button>
        </div>
      )}
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const [ref, inView] = useInView(.2);
  return (
    <section ref={ref} style={{ padding:"0 40px 96px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{
          background:"linear-gradient(135deg,#141414,#1a1a1a)", border:"1px solid #2A2A2A",
          borderRadius:20, padding:"64px 56px", textAlign:"center", position:"relative", overflow:"hidden",
          opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:"opacity .8s, transform .8s",
        }}>
          <div style={{ position:"absolute", top:0, right:0, width:400, height:400, background:"radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, left:0, width:300, height:300, background:"radial-gradient(circle,rgba(234,88,12,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative" }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20 }}>
              Vrei un proiect<br /><span style={{ color:"#F97316" }}>similar?</span>
            </h2>
            <p style={{ fontSize:17, color:"#9CA3AF", lineHeight:1.7, maxWidth:500, margin:"0 auto 40px" }}>
              Trimite-ne detaliile și construim împreună soluția vizuală perfectă pentru spațiul sau brandul tău.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="cta-btn-primary" style={{ fontSize:16, padding:"16px 36px" }}>Cere ofertă personalizată →</button>
              <button className="cta-btn-outline" style={{ fontSize:16, padding:"16px 36px" }}>↳ Before / After</button>
            </div>
            <div style={{ marginTop:28, display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
              {["Răspuns în max 24h","Consultanță gratuită","Fără angajament"].map(t => (
                <div key={t} style={{ fontSize:13, color:"#6B7280", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ color:"#22C55E" }}>✓</span>{t}
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
  return (
    <footer style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"48px 40px 32px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em", marginBottom:10 }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
            <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.7, maxWidth:240 }}>Print UV pe perete și gravare laser CO₂ în Timișoara și toată România.</p>
          </div>
          {[
            { title:"Servicii", links:["Print UV pe perete","Gravare laser CO₂","Print textile","Obiecte personalizate"] },
            { title:"Contact",  links:["Timișoara, România","0779 281 047","contact@printpeperete.com"] },
            { title:"Legal",    links:["Termeni și condiții","Politică confidențialitate","FAQ","ANPC"] },
          ].map(c => (
            <div key={c.title}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:"0.06em", marginBottom:12 }}>{c.title}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {c.links.map(l => <a key={l} href="#" style={{ fontSize:12, color:"#6B7280", textDecoration:"none" }} onMouseEnter={e=>e.target.style.color="#F97316"} onMouseLeave={e=>e.target.style.color="#6B7280"}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #1a1a1a", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontSize:12, color:"#4B5563" }}>© 2026 SDG PRINT & Design. Toate drepturile rezervate.</span>
          <span style={{ fontSize:12, color:"#4B5563" }}>Timișoara, Arad, Cluj-Napoca și toată România</span>
        </div>
      </div>
    </footer>
  );
}

function WAWidget() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setV(true),3000); return()=>clearTimeout(t); }, []);
  return (
    <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" style={{ position:"fixed", bottom:28, right:28, zIndex:999, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,.35)", opacity:v?1:0, transform:v?"none":"translateY(20px)", transition:"opacity .4s, transform .4s" }}>📱</a>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <PortfolioSection />
        <CTA />
      </main>
      <Footer />
      <WAWidget />
    </>
  );
}
