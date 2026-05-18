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
    .nav-link { font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; padding-bottom:2px; position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#F97316; transition:width 0.25s; }
    .nav-link:hover { color:#fff; } .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#F97316; } .nav-link.active::after { width:100%; }
    .cta-btn-primary { background:#F97316; color:#fff; border:none; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; animation:pulse-ring 2.5s infinite; transition:background .2s,transform .15s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-primary:hover { background:#EA580C; transform:translateY(-2px); animation:none; box-shadow:0 8px 24px rgba(249,115,22,.35); }
    .cta-btn-outline { background:transparent; color:#fff; border:1px solid #2A2A2A; border-radius:9px; padding:13px 26px; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; display:inline-flex; align-items:center; gap:8px; }
    .cta-btn-outline:hover { border-color:#F97316; color:#F97316; }
  `}</style>
);

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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(12,12,12,.92)":"transparent", backdropFilter:scrolled?"blur(18px)":"none", borderBottom:scrolled?"1px solid #2A2A2A":"1px solid transparent", transition:"all .35s", padding:"0 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em" }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {[["Acasă",false],["Despre Noi",false],["Servicii",false],["Portofoliu",false],["Before/After",true],["Contact",false]].map(([l,a]) => (
            <a key={l} href="#" className={`nav-link${a?" active":""}`}>{l}</a>
          ))}
        </div>
        <button className="cta-btn-primary" style={{ padding:"9px 20px", fontSize:13, animation:"none", boxShadow:"none" }}>Cere ofertă</button>
      </div>
    </nav>
  );
}

// ─── MEGA SLIDER ──────────────────────────────────────────────────────────────
function MegaSlider({ item, index }) {
  const [pos, setPos] = useState(40);
  const [ref, inView] = useInView(0.1);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const getPos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <div ref={ref} style={{ opacity:inView?1:0, transform:inView?"none":"translateY(32px)", transition:`opacity .7s ${index*.15}s, transform .7s ${index*.15}s`, marginBottom:64 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <span style={{ fontSize:11, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 10px" }}>Suprafață: {item.surface}</span>
            <span style={{ fontSize:11, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 10px" }}>Durată: {item.duration}</span>
            <span style={{ fontSize:11, background:"rgba(249,115,22,.1)", color:"#F97316", border:"1px solid rgba(249,115,22,.25)", borderRadius:5, padding:"3px 10px" }}>{item.category}</span>
          </div>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.03em", color:"#fff", marginBottom:6 }}>{item.title}</h3>
          <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.65, maxWidth:640 }}>{item.desc}</p>
        </div>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"12px 16px", textAlign:"center", flexShrink:0 }}>
          <div style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Transformare</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#F97316", letterSpacing:"0.02em" }}>100%</div>
          <div style={{ fontSize:11, color:"#6B7280" }}>suprafață acoperită</div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        onMouseDown={() => dragging.current = true}
        onMouseMove={e => { if (dragging.current) setPos(getPos(e.clientX)); }}
        onMouseUp={() => dragging.current = false}
        onMouseLeave={() => dragging.current = false}
        onTouchStart={() => dragging.current = true}
        onTouchMove={e => setPos(getPos(e.touches[0].clientX))}
        onTouchEnd={() => dragging.current = false}
        style={{ position:"relative", height:420, cursor:"ew-resize", userSelect:"none", borderRadius:16, overflow:"hidden", border:"1px solid #2A2A2A" }}
      >
        {/* BEFORE */}
        <div style={{ position:"absolute", inset:0, background:item.before, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {item.beforeContent}
        </div>
        {/* AFTER clipped */}
        <div style={{ position:"absolute", inset:0, background:item.after, clipPath:`inset(0 ${100-pos}% 0 0)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {item.afterContent}
        </div>
        {/* Handle */}
        <div style={{ position:"absolute", top:0, bottom:0, left:`${pos}%`, width:2, background:"#F97316", transform:"translateX(-50%)", zIndex:10 }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:44, height:44, borderRadius:"50%", background:"#F97316", border:"3px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff", fontWeight:700, boxShadow:"0 2px 16px rgba(0,0,0,.5)", cursor:"ew-resize" }}>↔</div>
        </div>
        {/* Labels */}
        <div style={{ position:"absolute", top:16, left:16, background:"rgba(0,0,0,.7)", backdropFilter:"blur(8px)", borderRadius:7, padding:"5px 12px", fontSize:12, color:"#9CA3AF", fontWeight:600, letterSpacing:"0.06em" }}>ÎNAINTE</div>
        <div style={{ position:"absolute", top:16, right:16, background:"rgba(249,115,22,.25)", backdropFilter:"blur(8px)", border:"1px solid rgba(249,115,22,.5)", borderRadius:7, padding:"5px 12px", fontSize:12, color:"#F97316", fontWeight:700, letterSpacing:"0.06em" }}>DUPĂ</div>
        {/* Hint */}
        <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", background:"rgba(0,0,0,.6)", backdropFilter:"blur(6px)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"rgba(255,255,255,.5)", whiteSpace:"nowrap" }}>← Trage pentru comparație →</div>
      </div>

      {/* Results */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:14 }}>
        {item.results.map((r,i) => (
          <div key={i} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#F97316", letterSpacing:"0.02em" }}>{r.val}</div>
            <div style={{ fontSize:12, color:"#9CA3AF", marginTop:2 }}>{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterPage() {
  const [headerRef, headerInView] = useInView(0.1);

  // Placeholder gradient "scenes" pentru before/after
  const beforeScene = (colors) => (
    <div style={{ position:"absolute", inset:0, background:colors, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", opacity:.25 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, letterSpacing:"0.05em", color:"#fff" }}>ÎNAINTE</div>
        <div style={{ fontSize:13, color:"#fff", marginTop:4 }}>Perete simplu, netratat</div>
      </div>
    </div>
  );

  const afterScene = (colors, title) => (
    <div style={{ position:"absolute", inset:0, background:colors, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, letterSpacing:"0.05em", color:"rgba(255,255,255,.15)" }}>DUPĂ</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.4)", marginTop:4 }}>{title}</div>
      </div>
    </div>
  );

  const projects = [
    {
      title:"Recepție clinică stomatologică",
      surface:"Perete lavabil", duration:"1 zi", category:"Medical / HoReCa",
      desc:"Transformare completă a recepției dintr-un spațiu neutru, depersonalizat, într-un mediu calm, profesional și memorabil. Pacienții simt diferența imediat — anxietatea scade, încrederea crește.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #0a2a1a 0%, #0d3520 50%, #0a2a1a 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #0a2a1a 0%, #0d3520 50%, #0a2a1a 100%)", "Brand identitate clinică"),
      results:[
        { val:"1 zi", label:"Timp execuție" },
        { val:"12 m²", label:"Suprafață printată" },
        { val:"2880 DPI", label:"Rezoluție finală" },
      ],
    },
    {
      title:"Showroom auto premium",
      surface:"MDF lăcuit", duration:"6 ore", category:"Automotive / Retail",
      desc:"Accent vizual de brand pentru showroom — de la pereți neutri la o experiență imersivă care pune mașina în context. Clienții petrec mai mult timp în showroom și rata de conversie crește.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #1a1000 0%, #2a1c00 50%, #1a1000 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #1a1000 0%, #2a1c00 50%, #1a1000 100%)", "Brand automotive experience"),
      results:[
        { val:"6h", label:"Timp execuție" },
        { val:"18 m²", label:"Suprafață MDF" },
        { val:"0", label:"Zile nefuncționale" },
      ],
    },
    {
      title:"Birou creativ — spațiu open-space",
      surface:"Perete gletuit", duration:"1 zi", category:"Office / Corporate",
      desc:"Spațiu de lucru transformat dintr-un birou generic într-un mediu care inspiră, motivează și definește cultura companiei. Angajații se identifică mai puternic cu brandul.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #00102a 0%, #001535 50%, #00102a 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #00102a 0%, #001535 50%, #00102a 100%)", "Identitate vizuală corporate"),
      results:[
        { val:"1 zi", label:"Timp execuție" },
        { val:"24 m²", label:"Suprafață acoperită" },
        { val:"CMYK", label:"Sistem culori" },
      ],
    },
    {
      title:"Restaurant & bar — perete focal",
      surface:"Beton aparent", duration:"8 ore", category:"HoReCa",
      desc:"Peretele focal al restaurantului transformat în element de decor care definește atmosfera și creează Instagram moments. Clienții fotografiază și distribuie organic — marketing gratuit.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #1a0000 0%, #2a0500 50%, #1a0000 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #1a0000 0%, #2a0500 50%, #1a0000 100%)", "Atmospheră restaurant"),
      results:[
        { val:"8h", label:"Timp execuție" },
        { val:"20 m²", label:"Beton aparent" },
        { val:"UV", label:"Rezistent umiditate" },
      ],
    },
    {
      title:"Dormitor rezidențial — mural artistic",
      surface:"Perete tencuit", duration:"4 ore", category:"Rezidențial",
      desc:"Dormitor personalizat cu un mural care reflectă personalitatea proprietarilor. De la spațiu generic la cel mai frumos loc din casă — fără renovări majore, fără dezordine.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #0a001a 0%, #100025 50%, #0a001a 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #0a001a 0%, #100025 50%, #0a001a 100%)", "Mural artistic personalizat"),
      results:[
        { val:"4h", label:"Timp execuție" },
        { val:"9 m²", label:"Suprafață mural" },
        { val:"0", label:"Zile renovare" },
      ],
    },
    {
      title:"Sală de conferință corporate",
      surface:"Perete gletuit + MDF", duration:"2 zile", category:"Corporate",
      desc:"Sala de conferință transformată dintr-un spațiu neutru într-un ambasador al brandului. Fiecare meeting devine o oportunitate de a întări identitatea companiei față de parteneri și clienți.",
      before:"linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
      after:"linear-gradient(160deg, #001a0a 0%, #002510 50%, #001a0a 100%)",
      beforeContent: beforeScene("linear-gradient(160deg, #1a1a1a 0%, #111 100%)"),
      afterContent: afterScene("linear-gradient(160deg, #001a0a 0%, #002510 50%, #001a0a 100%)", "Corporate brand room"),
      results:[
        { val:"2 zile", label:"Timp execuție" },
        { val:"40 m²", label:"Suprafață totală" },
        { val:"3", label:"Suprafețe diferite" },
      ],
    },
  ];

  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        {/* Hero */}
        <section style={{ position:"relative", padding:"140px 40px 80px", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), #0C0C0C" }}/>
          <div style={{ position:"absolute", inset:"-50%", width:"200%", height:"200%", backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:.5, animation:"grain 8s steps(2) infinite", pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:28, animation:"fadeIn .6s .1s both" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", display:"inline-block", boxShadow:"0 0 8px #F97316" }}/>
              <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>6 transformări reale · Trage pentru comparație</span>
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,8vw,88px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20, animation:"fadeUp .9s .15s both" }}>
              Înainte<br /><span style={{ color:"#F97316" }}>/ După</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.75, maxWidth:560, margin:"0 auto 40px", animation:"fadeUp .9s .3s both" }}>
              Transformări reale pentru spații comerciale, birouri, HoReCa și rezidențial. Fiecare proiect — o poveste de impact vizual.
            </p>
            {/* Stats row */}
            <div style={{ display:"flex", gap:32, justifyContent:"center", flexWrap:"wrap", animation:"fadeUp .9s .45s both" }}>
              {[["6+","Proiecte showcase"],["48h","Timp mediu execuție"],["100%","Clienți mulțumiți"],["0","Zile de deranj"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:"#F97316", letterSpacing:"0.02em", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:11, color:"#6B7280", marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sliders */}
        <section style={{ padding:"0 40px 96px", maxWidth:1200, margin:"0 auto" }}>
          {projects.map((p,i) => <MegaSlider key={i} item={p} index={i} />)}
        </section>

        {/* CTA */}
        <section style={{ padding:"0 40px 96px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ background:"linear-gradient(135deg,#141414,#1a1a1a)", border:"1px solid #2A2A2A", borderRadius:20, padding:"64px 56px", position:"relative", overflow:"hidden", textAlign:"center" }}>
              <div style={{ position:"absolute", top:0, right:0, width:400, height:400, background:"radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,60px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20, position:"relative" }}>
                Vrei o transformare<br /><span style={{ color:"#F97316" }}>similară?</span>
              </h2>
              <p style={{ fontSize:17, color:"#9CA3AF", lineHeight:1.7, maxWidth:500, margin:"0 auto 40px", position:"relative" }}>
                Trimite-ne o poză cu spațiul tău și primești ofertă personalizată + simulare vizuală gratuită.
              </p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
                <button className="cta-btn-primary" style={{ fontSize:16, padding:"16px 36px" }}>Cere ofertă personalizată →</button>
                <button className="cta-btn-outline" style={{ fontSize:16, padding:"16px 36px" }}>↳ Vezi portofoliul complet</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background:"#0a0a0a", borderTop:"1px solid #1a1a1a", padding:"48px 40px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.06em" }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
          <div style={{ display:"flex", gap:24 }}>
            {["Acasă","Servicii","Portofoliu","Contact"].map(l => <a key={l} href="#" style={{ fontSize:13, color:"#6B7280", textDecoration:"none" }} onMouseEnter={e=>e.target.style.color="#F97316"} onMouseLeave={e=>e.target.style.color="#6B7280"}>{l}</a>)}
          </div>
          <span style={{ fontSize:12, color:"#4B5563" }}>© 2026 SDG PRINT & Design</span>
        </div>
      </footer>

      <a href="https://wa.me/40779281047" target="_blank" rel="noopener noreferrer" style={{ position:"fixed", bottom:28, right:28, zIndex:999, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,.35)" }}>📱</a>
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:98, background:"rgba(20,20,20,.97)", backdropFilter:"blur(12px)", borderTop:"1px solid #2A2A2A", display:"flex", gap:8, padding:10 }}>
        {[{icon:"📞",label:"Sună",bg:"#1E1E1E"},{icon:"📱",label:"WhatsApp",bg:"#25D366"},{icon:"✉",label:"Ofertă",bg:"#F97316"}].map(b => (
          <button key={b.label} style={{ flex:1, background:b.bg, color:"#fff", border:"none", borderRadius:9, padding:"10px 6px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:18 }}>{b.icon}</span><span>{b.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default BeforeAfterPage;
