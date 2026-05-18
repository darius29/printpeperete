import { useState, useEffect, useRef } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { scroll-behavior:smooth; }
    body { background:#0C0C0C; color:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#0C0C0C; }
    ::-webkit-scrollbar-thumb { background:#2A2A2A; border-radius:3px; }
    ::selection { background:rgba(249,115,22,0.3); color:#fff; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(249,115,22,.45)} 70%{box-shadow:0 0 0 12px rgba(249,115,22,0)} 100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} }
    @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 30%{transform:translate(3%,2%)} 50%{transform:translate(-1%,4%)} 70%{transform:translate(4%,-1%)} 90%{transform:translate(-3%,3%)} }
    @keyframes countUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    .nav-link { font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; padding-bottom:2px; position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#F97316; transition:width 0.25s; }
    .nav-link:hover { color:#fff; } .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#F97316; } .nav-link.active::after { width:100%; }
    .cta-btn-primary { background:#F97316; color:#fff; border:none; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; animation:pulse-ring 2.5s infinite; transition:background .2s,transform .15s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-primary:hover { background:#EA580C; transform:translateY(-2px); animation:none; box-shadow:0 8px 24px rgba(249,115,22,.35); }
    .cta-btn-outline { background:transparent; color:#fff; border:1px solid #2A2A2A; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-outline:hover { border-color:#F97316; color:#F97316; }
    .diff-card { background:#141414; border:1px solid #2A2A2A; border-radius:12px; padding:22px; transition:all .28s cubic-bezier(0.25,0.46,0.45,0.94); }
    .diff-card:hover { border-color:#F97316; transform:translateY(-4px); box-shadow:0 12px 40px rgba(249,115,22,.1); }
    .adv-row { display:flex; align-items:flex-start; gap:10px; padding:10px 0; border-bottom:1px solid #1a1a1a; }
    .adv-row:last-child { border-bottom:none; }
  `}</style>
);

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(target, duration = 1600, inView = false) {
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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(12,12,12,.92)":"transparent", backdropFilter:scrolled?"blur(18px)":"none", borderBottom:scrolled?"1px solid #2A2A2A":"1px solid transparent", transition:"all .35s", padding:"0 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em" }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {[["Acasă",false],["Despre Noi",true],["Servicii",false],["Portofoliu",false],["Before/After",false],["Contact",false]].map(([l,a]) => (
            <a key={l} href="#" className={`nav-link${a?" active":""}`}>{l}</a>
          ))}
        </div>
        <button className="cta-btn-primary" style={{ padding:"9px 20px", fontSize:13, animation:"none", boxShadow:"none" }}>Cere ofertă</button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ position:"relative", padding:"140px 40px 80px", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), #0C0C0C" }}/>
      <div style={{ position:"absolute", inset:"-50%", width:"200%", height:"200%", backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:.5, animation:"grain 8s steps(2) infinite", pointerEvents:"none" }}/>
      <div style={{ position:"relative", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ maxWidth:720, animation:"fadeUp .9s .1s both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:28 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", display:"inline-block", boxShadow:"0 0 8px #F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>Atelier Timișoara · Print UV · Laser CO₂</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,7vw,80px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:24, animation:"fadeUp .9s .2s both" }}>
            Din pasiune<br />pentru <span style={{ color:"#F97316" }}>detalii</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.8, maxWidth:580, marginBottom:36, animation:"fadeUp .9s .3s both" }}>
            Suntem un atelier din Timișoara specializat în print UV direct pe suprafețe, gravare laser CO₂ și personalizare. Lucrăm cu atenție la detalii, echipamente moderne și un singur scop: rezultate care rămân.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", animation:"fadeUp .9s .4s both" }}>
            <button className="cta-btn-primary">Cere ofertă personalizată →</button>
            <button className="cta-btn-outline">↳ Vezi portofoliul</button>
          </div>
        </div>
        {/* Floating badges */}
        <div style={{ position:"absolute", top:0, right:40, display:"flex", flexDirection:"column", gap:12, animation:"fadeIn 1s .6s both" }}>
          {[
            { val:"48h", label:"Livrare standard", color:"#F97316" },
            { val:"2880", label:"DPI rezoluție", color:"#22C55E" },
            { val:"10+", label:"Materiale", color:"#3B82F6" },
          ].map(b => (
            <div key={b.val} style={{ background:"#141414", border:`1px solid ${b.color}30`, borderRadius:12, padding:"14px 18px", textAlign:"center", boxShadow:`0 4px 20px ${b.color}12` }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:b.color, letterSpacing:"0.02em", lineHeight:1 }}>{b.val}</div>
              <div style={{ fontSize:11, color:"#6B7280", marginTop:3 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const [ref, inView] = useInView(.1);
  return (
    <section ref={ref} style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateX(-24px)", transition:"opacity .7s, transform .7s" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Povestea noastră</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,4.5vw,52px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:24 }}>
            De ce am pornit<br />SDG Print
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[
              "SDG Print & Design a pornit cu un singur scop: să aducă personalizarea la un nivel profesional, rapid și accesibil. Am investit în echipamente de nivel industrial — un printer UV direct pe suprafață și un laser CO₂ — ca să putem oferi rezultate reale, nu promisiuni.",
              "Lucrăm cu antreprenori, agenții de design și persoane fizice din Timișoara și din toată România — de la un obiect personalizat pentru un eveniment, până la muraluri și instalații vizuale pentru spații comerciale.",
              "Ceea ce ne diferențiază nu este doar tehnologia, ci modul în care tratăm fiecare comandă: cu atenție, comunicare transparentă și dorința sinceră ca rezultatul final să depășească așteptările.",
            ].map((p, i) => (
              <p key={i} style={{ fontSize:15, color:"#9CA3AF", lineHeight:1.75 }}>{p}</p>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:24 }}>
            {["Timișoara","Print UV direct","Execuție premium","B2B + B2C"].map(t => (
              <span key={t} style={{ fontSize:11, background:"rgba(249,115,22,.1)", color:"#F97316", border:"1px solid rgba(249,115,22,.25)", borderRadius:5, padding:"4px 12px", fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </div>
        {/* Visual placeholder */}
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateX(24px)", transition:"opacity .7s .2s, transform .7s .2s" }}>
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, overflow:"hidden", aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 40%, rgba(249,115,22,.08) 0%, transparent 60%)" }}/>
            <div style={{ textAlign:"center", position:"relative" }}>
              <div style={{ fontSize:64, marginBottom:16 }}>🖨️</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.04em", color:"#fff", marginBottom:6 }}>Atelierul nostru</div>
              <div style={{ fontSize:13, color:"#6B7280" }}>Timișoara, România</div>
            </div>
            {/* Corner badge */}
            <div style={{ position:"absolute", top:16, right:16, background:"rgba(249,115,22,.15)", border:"1px solid rgba(249,115,22,.3)", borderRadius:8, padding:"8px 12px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:"#F97316", letterSpacing:"0.04em" }}>Est. 2024</div>
            </div>
          </div>
          {/* Process images row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:10 }}>
            {[
              { icon:"⚙️", label:"Echipament UV" },
              { icon:"🎨", label:"Pregătire design" },
              { icon:"✅", label:"Execuție finală" },
            ].map(p => (
              <div key={p.label} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"14px 10px", textAlign:"center" }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{p.icon}</div>
                <div style={{ fontSize:11, color:"#9CA3AF" }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  const [ref, inView] = useInView(.08);
  const diffs = [
    { icon:"🎯", val:"2880 DPI", title:"Print UV direct pe suprafață", desc:"Cernelurile UV se fixează direct pe perete, metal, sticlă sau lemn fără tapet sau folie intermediară. Rezultatul este net și durabil." },
    { icon:"🌈", val:"UV-curat", title:"Culori vibrante, rezistente", desc:"Formulele UV sunt rezistente la UV, umiditate și frecare. Culorile rămân vii ani de zile fără să pălească sau să se exfolieze." },
    { icon:"⚡", val:"48h", title:"Execuție rapidă", desc:"De la confirmare la predare, procesul nostru este optimizat pentru a livra în 48h pentru comenzi standard, fără compromisuri de calitate." },
    { icon:"✏️", val:"Full custom", title:"Design adaptat pe brief", desc:"Nu folosim template-uri. Fiecare design este creat sau adaptat specific pentru suprafața, locația și identitatea vizuală a clientului." },
    { icon:"🧱", val:"10+ materiale", title:"Suprafețe multiple", desc:"Printăm pe gresie, beton, MDF, metal, textile și obiecte promoționale cu aceeași acuratețe, indiferent de textură sau dimensiune." },
    { icon:"🤝", val:"Non-invaziv", title:"Fără deteriorarea suprafeței", desc:"Procesul de aplicare este neinvaziv. Nu există risc de deteriorare a peretelui sau suprafeței — ideal pentru spații închiriate sau renovate." },
  ];
  return (
    <section ref={ref} style={{ padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:56 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>De ce suntem diferiți</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:12 }}>Ce face printul<br />nostru diferit</h2>
          <p style={{ fontSize:16, color:"#9CA3AF", lineHeight:1.7, maxWidth:520 }}>Nu toate printurile sunt la fel. Iată ce înseamnă concret tehnologia UV directă pe care o folosim.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {diffs.map((d,i) => (
            <div key={i} className="diff-card" style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:`opacity .6s ${.1+i*.08}s, transform .6s ${.1+i*.08}s` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:28 }}>{d.icon}</span>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:"#F97316", letterSpacing:"0.04em" }}>{d.val}</span>
              </div>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.03em", marginBottom:10, color:"#fff" }}>{d.title}</h3>
              <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.65 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Equipment() {
  const [ref, inView] = useInView(.08);
  const equipment = [
    {
      tag:"Wall Print", name:"Wall Printer UV", subtitle:"Sistem print UV direct pe perete", icon:"🖨️",
      specs:[
        ["Înălțime maximă print","290 cm"],["Sistem culori","CMYK"],["Rezoluție maximă","2880 DPI"],
        ["Viteză","2–6 m²/oră"],["Tehnologie cerneală","UV, uscare instant"],["Nivel miros","Low-odor, non-toxic"],
      ],
    },
    {
      tag:"Laser CO₂", name:"Junlong Laser CO₂", subtitle:"Mașină industrială gravare & debitare", icon:"⚡",
      specs:[
        ["Tip laser","CO₂"],["Precizie","Industrială"],["Operație","Gravare + debitare"],
        ["Materiale","10+ tipuri"],["Contact material","Zero (non-contact)"],["Finisaj","Curat, fără bavuri"],
      ],
    },
  ];

  return (
    <section ref={ref} style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:56 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Echipamentele noastre</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:12 }}>Tehnologie de<br />nivel industrial</h2>
          <p style={{ fontSize:16, color:"#9CA3AF", lineHeight:1.7, maxWidth:520 }}>Investim în echipamente de calitate pentru că rezultatele finale depind direct de precizia și fiabilitatea utilajelor folosite.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {equipment.map((eq, i) => (
            <div key={i} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, overflow:"hidden", opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:`opacity .7s ${.15+i*.15}s, transform .7s ${.15+i*.15}s` }}>
              {/* Visual */}
              <div style={{ background:"linear-gradient(135deg, #1a1a1a, #111)", padding:"32px", display:"flex", alignItems:"center", gap:20, borderBottom:"1px solid #2A2A2A" }}>
                <div style={{ width:72, height:72, borderRadius:14, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, flexShrink:0 }}>{eq.icon}</div>
                <div>
                  <div style={{ fontSize:10, color:"#F97316", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{eq.tag}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.03em", color:"#fff", lineHeight:1 }}>{eq.name}</div>
                  <div style={{ fontSize:13, color:"#9CA3AF", marginTop:4 }}>{eq.subtitle}</div>
                </div>
              </div>
              {/* Specs */}
              <div style={{ padding:"20px 24px" }}>
                {eq.specs.map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #1a1a1a" }}>
                    <span style={{ fontSize:13, color:"#6B7280" }}>{k}</span>
                    <span style={{ fontSize:13, color:"#fff", fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const [ref, inView] = useInView(.1);
  const rows = [
    ["Aplicare","Direct pe suprafață, fără intermediar","Tapet sau folie aplicată separat"],
    ["Durabilitate","UV-rezistent, ani de zile fără degradare","Se dezlipește, pălește în timp"],
    ["Personalizare","Orice design, orice dimensiune","Limitată la modele disponibile"],
    ["Timp execuție","Livrare în 48h pentru standard","Zile sau săptămâni pentru custom"],
    ["Suprafețe compatibile","Beton, metal, lemn, sticlă, textile","Doar suprafețe plane netede"],
    ["Risc deteriorare","Zero — proces complet neinvaziv","Risc la dezlipire sau umiditate"],
  ];
  return (
    <section ref={ref} style={{ padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:48 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Comparație directă</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.02em", lineHeight:.95 }}>Print UV vs.<br />Metode clasice</h2>
        </div>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, overflow:"hidden", opacity:inView?1:0, transition:"opacity .7s .2s" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"#1E1E1E", padding:"14px 24px" }}>
            <span style={{ fontSize:12, color:"#6B7280", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Criteriu</span>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>SDG Print ✓</span>
            <span style={{ fontSize:12, color:"#6B7280", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Metoda clasică</span>
          </div>
          {rows.map(([c,sdg,cls], i) => (
            <div key={c} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"14px 24px", borderTop:"1px solid #1a1a1a", opacity:inView?1:0, transform:inView?"none":"translateX(-16px)", transition:`opacity .5s ${.25+i*.06}s, transform .5s ${.25+i*.06}s` }}>
              <span style={{ fontSize:13, color:"#9CA3AF", fontWeight:500 }}>{c}</span>
              <span style={{ fontSize:13, color:"#22C55E", display:"flex", alignItems:"flex-start", gap:6 }}><span style={{ flexShrink:0, marginTop:1 }}>✓</span>{sdg}</span>
              <span style={{ fontSize:13, color:"#4B5563", display:"flex", alignItems:"flex-start", gap:6 }}><span style={{ flexShrink:0, marginTop:1 }}>✗</span>{cls}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const [ref, inView] = useInView(.1);
  const judete = ["Timiș","Arad","Bihor","Cluj","Alba","Hunedoara","Caraș-Severin","Mehedinți","Mureș","Sibiu","+ toată România la cerere"];
  return (
    <section ref={ref} style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s", marginBottom:48 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#F97316" }}/>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Zonă de acoperire</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:12 }}>Lucrăm în Timișoara<br />și toată România</h2>
          <p style={{ fontSize:16, color:"#9CA3AF", lineHeight:1.7, maxWidth:520 }}>Sediul principal este în Timișoara, dar ne deplasăm pentru proiecte de wall print în toată țara. Gravura laser și obiectele se expediază oriunde în România.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:32, opacity:inView?1:0, transition:"opacity .7s .2s" }}>
          {[
            { icon:"📍", title:"Sediu principal", val:"Timișoara", sub:"județul Timiș", color:"#F97316" },
            { icon:"🚗", title:"Deplasare wall print", val:"Vest & Centru", sub:"România + național la cerere", color:"#22C55E" },
            { icon:"📦", title:"Expediere națională", val:"Toată România", sub:"Gravură, obiecte, textile", color:"#3B82F6" },
          ].map(c => (
            <div key={c.title} style={{ background:"#141414", border:`1px solid ${c.color}25`, borderRadius:14, padding:24 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{c.icon}</div>
              <div style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{c.title}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:c.color, letterSpacing:"0.03em", marginBottom:4 }}>{c.val}</div>
              <div style={{ fontSize:13, color:"#9CA3AF" }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24, opacity:inView?1:0, transition:"opacity .7s .35s" }}>
          <div style={{ fontSize:12, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>Zone în care lucrăm</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {judete.map(j => (
              <span key={j} style={{ fontSize:12, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:6, padding:"5px 12px", fontWeight:j.includes("+")?"600":"400", color:j.includes("+")?"#F97316":"#9CA3AF", border:j.includes("+")?"1px solid rgba(249,115,22,.3)":"1px solid #2A2A2A" }}>{j}</span>
            ))}
          </div>
          <p style={{ fontSize:13, color:"#9CA3AF", marginTop:16 }}>
            <strong style={{ color:"#fff" }}>Ai un proiect în altă zonă?</strong> Contactează-ne — evaluăm fiecare proiect individual și găsim cea mai bună soluție logistică.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [ref, inView] = useInView(.2);
  return (
    <section ref={ref} style={{ padding:"96px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,#141414,#1a1a1a)", border:"1px solid #2A2A2A", borderRadius:20, padding:"64px 56px", position:"relative", overflow:"hidden", textAlign:"center", opacity:inView?1:0, transform:inView?"none":"translateY(32px)", transition:"opacity .8s, transform .8s" }}>
          <div style={{ position:"absolute", top:0, right:0, width:400, height:400, background:"radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20, position:"relative" }}>
            Vrei să discutăm<br /><span style={{ color:"#F97316" }}>proiectul tău?</span>
          </h2>
          <p style={{ fontSize:17, color:"#9CA3AF", lineHeight:1.7, maxWidth:500, margin:"0 auto 40px", position:"relative" }}>
            Suntem gata să îți propunem cea mai bună soluție de print personalizat, adaptată bugetului și obiectivelor tale.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
            <button className="cta-btn-primary" style={{ fontSize:16, padding:"16px 36px" }}>Cere ofertă personalizată →</button>
            <button className="cta-btn-outline" style={{ fontSize:16, padding:"16px 36px" }}>↳ Vezi portofoliul</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"48px 40px 32px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em", marginBottom:10 }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
            <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.7, maxWidth:240 }}>Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.</p>
          </div>
          {[
            { title:"Servicii", links:["Print UV pe perete","Gravare laser CO₂","Obiecte personalizate","Print textile"] },
            { title:"Contact",  links:["Timișoara, România","0779 281 047","contact@printpeperete.com","Facebook"] },
            { title:"Legal",    links:["Termeni și condiții","Politică confidențialitate","ANPC","FAQ"] },
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

function MobileBar() {
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:98, background:"rgba(20,20,20,.97)", backdropFilter:"blur(12px)", borderTop:"1px solid #2A2A2A", display:"flex", gap:8, padding:10 }}>
      {[{icon:"📞",label:"Sună",bg:"#1E1E1E"},{icon:"📱",label:"WhatsApp",bg:"#25D366"},{icon:"✉",label:"Ofertă",bg:"#F97316"}].map(b => (
        <button key={b.label} style={{ flex:1, background:b.bg, color:"#fff", border:"none", borderRadius:9, padding:"10px 6px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <span style={{ fontSize:18 }}>{b.icon}</span><span>{b.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function DespreNoi() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Differentiators />
        <Equipment />
        <ComparisonTable />
        <Coverage />
        <FinalCTA />
      </main>
      <Footer />
      <WAWidget />
      <MobileBar />
    </>
  );
}
