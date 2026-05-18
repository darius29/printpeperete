import { useState, useEffect, useRef } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0C0C0C; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0C0C0C; }
    ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
    ::selection { background: rgba(249,115,22,0.3); color: #fff; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pulse-ring {
      0%{box-shadow:0 0 0 0 rgba(249,115,22,.45)}
      70%{box-shadow:0 0 0 12px rgba(249,115,22,0)}
      100%{box-shadow:0 0 0 0 rgba(249,115,22,0)}
    }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes grain {
      0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
      30%{transform:translate(3%,2%)} 50%{transform:translate(-1%,4%)}
      70%{transform:translate(4%,-1%)} 90%{transform:translate(-3%,3%)}
    }
    @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes checkPop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
    @keyframes waBounce {
      0%,100%{transform:translateY(0)} 30%{transform:translateY(-8px)} 60%{transform:translateY(-4px)}
    }

    .nav-link { font-size:13px; font-weight:500; color:#9CA3AF; text-decoration:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; padding-bottom:2px; position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#F97316; transition:width 0.25s; }
    .nav-link:hover { color:#fff; }
    .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#F97316; }
    .nav-link.active::after { width:100%; }

    .cta-btn-primary {
      background:#F97316; color:#fff; border:none; border-radius:9px;
      padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer;
      font-family:'DM Sans',sans-serif; letter-spacing:0.01em;
      transition:background 0.2s, transform 0.15s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .cta-btn-primary:hover { background:#EA580C; transform:translateY(-2px); box-shadow:0 8px 24px rgba(249,115,22,.35); }
    .cta-btn-primary.pulse { animation:pulse-ring 2.5s infinite; }

    .field-input {
      width:100%; background:#141414; border:1px solid #2A2A2A;
      border-radius:8px; padding:12px 15px; color:#fff; font-size:14px;
      font-family:'DM Sans',sans-serif; outline:none;
      transition:border-color 0.2s, box-shadow 0.2s;
    }
    .field-input:focus { border-color:#F97316; box-shadow:0 0 0 3px rgba(249,115,22,.12); }
    .field-input::placeholder { color:#4B5563; }
    .field-input.error { border-color:#EF4444; }
    .field-input.success { border-color:#22C55E; }

    .contact-info-item {
      display:flex; align-items:flex-start; gap:14px;
      padding:16px 0; border-bottom:1px solid #1a1a1a;
    }
    .contact-info-item:last-child { border-bottom:none; }
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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(12,12,12,.92)":"transparent", backdropFilter:scrolled?"blur(18px)":"none", borderBottom:scrolled?"1px solid #2A2A2A":"1px solid transparent", transition:"all .35s", padding:"0 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em" }}>SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design</div>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {[["Acasă",false],["Despre Noi",false],["Servicii",false],["Portofoliu",false],["Before/After",false],["Contact",true]].map(([l,a]) => (
            <a key={l} href="#" className={`nav-link${a?" active":""}`}>{l}</a>
          ))}
        </div>
        <button className="cta-btn-primary" style={{ padding:"9px 20px", fontSize:13 }}>Cere ofertă</button>
      </div>
    </nav>
  );
}

function PageHero() {
  return (
    <section style={{ position:"relative", padding:"140px 40px 60px", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), #0C0C0C" }}/>
      <div style={{ position:"absolute", inset:"-50%", width:"200%", height:"200%", backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:.5, animation:"grain 8s steps(2) infinite", pointerEvents:"none" }}/>
      <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.25)", borderRadius:20, padding:"6px 18px", marginBottom:28, animation:"fadeIn .6s .1s both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", display:"inline-block", boxShadow:"0 0 8px #F97316" }}/>
          <span style={{ fontSize:12, color:"#F97316", fontWeight:600, letterSpacing:"0.04em" }}>Răspuns în max 24h · Consultanță gratuită</span>
        </div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,8vw,88px)", letterSpacing:"0.02em", lineHeight:.95, marginBottom:20, animation:"fadeUp .9s .15s both" }}>
          Hai să<br /><span style={{ color:"#F97316" }}>discutăm</span>
        </h1>
        <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"#9CA3AF", lineHeight:1.75, maxWidth:520, margin:"0 auto", animation:"fadeUp .9s .3s both" }}>
          Trimite-ne detaliile proiectului și revenim rapid cu o ofertă personalizată. Upload fișier design inclus.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const [ref, inView] = useInView(.06);
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", location:"", message:"" });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const set = (k, v) => { setForm(p => ({...p,[k]:v})); if (errors[k]) setErrors(p => ({...p,[k]:false})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Numele este obligatoriu";
    if (!form.phone.trim()) e.phone = "Telefonul este obligatoriu";
    if (!form.email.includes("@")) e.email = "Email invalid";
    if (!form.service) e.service = "Selectează un serviciu";
    if (!form.message.trim()) e.message = "Mesajul este obligatoriu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const inputStyle = (k) => ({
    width:"100%", background:"#141414",
    border:`1px solid ${errors[k] ? "#EF4444" : form[k] ? "#22C55E" : "#2A2A2A"}`,
    borderRadius:8, padding:"12px 15px", color:"#fff", fontSize:14,
    fontFamily:"'DM Sans',sans-serif", outline:"none",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow: errors[k] ? "0 0 0 3px rgba(239,68,68,.1)" : "none",
  });

  if (submitted) return (
    <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px 96px", display:"flex", justifyContent:"center" }}>
      <div style={{
        background:"#141414", border:"1px solid #22C55E", borderRadius:20, padding:"64px 48px",
        textAlign:"center", maxWidth:520, animation:"fadeUp .6s ease",
        boxShadow:"0 0 60px rgba(34,197,94,.08)",
      }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(34,197,94,.12)", border:"2px solid #22C55E", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:32, animation:"checkPop .5s .2s both" }}>✓</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:"0.03em", marginBottom:12, color:"#fff" }}>Cerere trimisă!</h2>
        <p style={{ fontSize:15, color:"#9CA3AF", lineHeight:1.7, marginBottom:32 }}>Mulțumim! Vom reveni cu o ofertă personalizată în maxim 24 de ore. Verifică și inbox-ul de spam dacă nu primești răspuns.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.2)", borderRadius:10, padding:"12px 20px", fontSize:13, color:"#22C55E" }}>📧 Confirmare trimisă pe {form.email}</div>
          <button className="cta-btn-primary pulse" style={{ justifyContent:"center", width:"100%" }} onClick={() => setSubmitted(false)}>Trimite altă cerere</button>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={ref} style={{ padding:"0 40px 96px", maxWidth:1200, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:24, opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity .7s, transform .7s" }}>

        {/* FORM */}
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:16, padding:36 }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.03em", marginBottom:8 }}>Cere ofertă personalizată</h2>
          <p style={{ fontSize:14, color:"#9CA3AF", marginBottom:32, lineHeight:1.6 }}>Completează formularul și îți pregătim o ofertă adaptată proiectului tău.</p>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* Name + Phone */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[["name","Nume *","Ion Popescu"],["phone","Telefon *","07xx xxx xxx"]].map(([k,l,ph]) => (
                <div key={k}>
                  <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>{l}</label>
                  <input style={inputStyle(k)} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)}
                    onFocus={e=>e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,.12)"}
                    onBlur={e=>e.target.style.boxShadow=errors[k]?"0 0 0 3px rgba(239,68,68,.1)":"none"}
                  />
                  {errors[k] && <span style={{ fontSize:11, color:"#EF4444", marginTop:4, display:"block" }}>⚠ {errors[k]}</span>}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Email *</label>
              <input style={inputStyle("email")} placeholder="email@firma.ro" value={form.email} onChange={e=>set("email",e.target.value)}
                onFocus={e=>e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,.12)"}
                onBlur={e=>e.target.style.boxShadow=errors.email?"0 0 0 3px rgba(239,68,68,.1)":"none"}
              />
              {errors.email && <span style={{ fontSize:11, color:"#EF4444", marginTop:4, display:"block" }}>⚠ {errors.email}</span>}
            </div>

            {/* Service */}
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Tip serviciu *</label>
              <select style={{...inputStyle("service"), cursor:"pointer", colorScheme:"dark"}} value={form.service} onChange={e=>set("service",e.target.value)}>
                <option value="">Selectează serviciul...</option>
                <option>Wall Print UV</option>
                <option>Gravare laser CO₂</option>
                <option>Tricouri & Hanorace</option>
                <option>Obiecte personalizate</option>
                <option>Design personalizat</option>
                <option>Pachet combinat</option>
              </select>
              {errors.service && <span style={{ fontSize:11, color:"#EF4444", marginTop:4, display:"block" }}>⚠ {errors.service}</span>}
            </div>

            {/* Location */}
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Locație proiect</label>
              <input style={inputStyle("location")} placeholder="Timișoara, Arad, Cluj..." value={form.location} onChange={e=>set("location",e.target.value)}
                onFocus={e=>e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,.12)"}
                onBlur={e=>e.target.style.boxShadow="none"}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Mesaj / Detalii *</label>
              <textarea style={{...inputStyle("message"), resize:"vertical", minHeight:100, lineHeight:1.6}} placeholder="Dimensiunile peretelui, suprafața, cantitate, termen dorit..." value={form.message} onChange={e=>set("message",e.target.value)}
                onFocus={e=>e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,.12)"}
                onBlur={e=>e.target.style.boxShadow=errors.message?"0 0 0 3px rgba(239,68,68,.1)":"none"}
              />
              {errors.message && <span style={{ fontSize:11, color:"#EF4444", marginTop:4, display:"block" }}>⚠ {errors.message}</span>}
            </div>

            {/* Upload */}
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Fișier design (opțional)</label>
              <div
                onDragOver={e=>{e.preventDefault();setDragging(true)}}
                onDragLeave={()=>setDragging(false)}
                onDrop={handleDrop}
                onClick={()=>fileRef.current?.click()}
                style={{
                  border:`1px dashed ${dragging?"#F97316":file?"#22C55E":"#2A2A2A"}`,
                  borderRadius:10, padding:"20px 16px", textAlign:"center",
                  cursor:"pointer", background:dragging?"rgba(249,115,22,.04)":file?"rgba(34,197,94,.04)":"#0C0C0C",
                  transition:"all .2s",
                }}
              >
                <input ref={fileRef} type="file" accept=".pdf,.ai,.png,.jpg,.jpeg,.svg" style={{ display:"none" }} onChange={e=>setFile(e.target.files[0])} />
                {file ? (
                  <div>
                    <div style={{ fontSize:24, marginBottom:6 }}>✓</div>
                    <div style={{ fontSize:13, color:"#22C55E", fontWeight:600 }}>{file.name}</div>
                    <div style={{ fontSize:11, color:"#6B7280", marginTop:3 }}>{(file.size/1024/1024).toFixed(2)} MB</div>
                    <button onClick={e=>{e.stopPropagation();setFile(null)}} style={{ marginTop:8, background:"none", border:"1px solid #2A2A2A", color:"#9CA3AF", fontSize:11, padding:"3px 10px", borderRadius:5, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Șterge</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize:28, marginBottom:8 }}>📎</div>
                    <div style={{ fontSize:13, color:"#9CA3AF" }}>Trage fișierul aici sau <span style={{ color:"#F97316" }}>selectează</span></div>
                    <div style={{ fontSize:11, color:"#4B5563", marginTop:4 }}>PDF, AI, PNG, JPG, SVG — max 20MB</div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading} style={{
              background:"#F97316", color:"#fff", border:"none", borderRadius:10,
              padding:"15px 24px", fontSize:16, fontWeight:700, cursor:loading?"wait":"pointer",
              fontFamily:"'DM Sans',sans-serif", width:"100%",
              display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              transition:"background .2s", opacity:loading?.75:1,
            }}>
              {loading ? (
                <><span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,.3)", borderTop:"2px solid #fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }}/> Se trimite...</>
              ) : "Trimite cererea →"}
            </button>
            <p style={{ fontSize:11, color:"#6B7280", textAlign:"center" }}>Prin trimitere accepți <a href="#" style={{ color:"#F97316", textDecoration:"none" }}>Termenii și condițiile</a></p>
          </div>
        </div>

        {/* INFO PANEL */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {/* Contact info */}
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:14, padding:24 }}>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.03em", marginBottom:4 }}>Date de contact</h3>
            <p style={{ fontSize:13, color:"#9CA3AF", marginBottom:20, lineHeight:1.6 }}>Preferi să ne contactezi direct? Suntem disponibili pe toate canalele.</p>
            <div>
              {[
                { icon:"📍", label:"Adresă", val:"Timișoara, județul Timiș, România", color:"#F97316" },
                { icon:"📞", label:"Telefon", val:"0779 281 047", color:"#22C55E", href:"tel:0779281047" },
                { icon:"✉️", label:"Email", val:"contact@printpeperete.com", color:"#3B82F6", href:"mailto:contact@printpeperete.com" },
                { icon:"📱", label:"WhatsApp", val:"Chat rapid — click aici", color:"#25D366", href:"https://wa.me/40779281047" },
              ].map(c => (
                <div key={c.label} className="contact-info-item">
                  <div style={{ width:38, height:38, borderRadius:9, background:`${c.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ fontSize:14, color:"#fff", fontWeight:500, textDecoration:"none" }} onMouseEnter={e=>e.target.style.color=c.color} onMouseLeave={e=>e.target.style.color="#fff"}>{c.val}</a>
                    ) : (
                      <div style={{ fontSize:14, color:"#fff", fontWeight:500 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:14, padding:24 }}>
            <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.04em", marginBottom:16 }}>Program</h4>
            {[
              { day:"Luni – Vineri", hours:"09:00 – 18:00", active:true },
              { day:"Sâmbătă",       hours:"10:00 – 14:00", active:true },
              { day:"Duminică",      hours:"Închis",         active:false },
            ].map(r => (
              <div key={r.day} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #1a1a1a" }}>
                <span style={{ fontSize:13, color:"#9CA3AF" }}>{r.day}</span>
                <span style={{ fontSize:13, color:r.active?"#22C55E":"#EF4444", fontWeight:600 }}>{r.hours}</span>
              </div>
            ))}
          </div>

          {/* Response time */}
          <div style={{ background:"linear-gradient(135deg, rgba(249,115,22,.1), rgba(234,88,12,.06))", border:"1px solid rgba(249,115,22,.2)", borderRadius:14, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <span style={{ fontSize:22 }}>⚡</span>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.03em" }}>Răspuns rapid garantat</div>
            </div>
            <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.6, marginBottom:14 }}>Revenim cu ofertă personalizată în maxim 24h în zilele lucrătoare. De obicei răspundem în 2-4 ore.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {["Consultanță gratuită, fără angajament","Ofertă detaliată cu breakdown de prețuri","Disponibili pe WhatsApp pentru întrebări rapide"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:7, fontSize:12, color:"#9CA3AF" }}>
                  <span style={{ color:"#F97316", flexShrink:0 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Area coverage */}
          <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:14, padding:20 }}>
            <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:"0.04em", marginBottom:12 }}>Zonă de acoperire</h4>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Timiș","Arad","Bihor","Cluj","Alba","Hunedoara","Caraș-Severin","Mureș","Sibiu","+ România"].map(j => (
                <span key={j} style={{ fontSize:11, background:"#1E1E1E", color:"#9CA3AF", border:"1px solid #2A2A2A", borderRadius:5, padding:"3px 8px" }}>{j}</span>
              ))}
            </div>
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
            { title:"Servicii", links:["Print UV pe perete","Gravare laser CO₂","Obiecte personalizate","Print textile","Design personalizat"] },
            { title:"Info", links:["Pregătire fișiere","Întrebări frecvente","Portofoliu","Before / After","Calculator preț"] },
            { title:"Legal", links:["Termeni și condiții","Politică confidențialitate","Politică cookies","ANPC"] },
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
      {[{ icon:"📞", label:"Sună acum", bg:"#1E1E1E", href:"tel:0779281047" },{ icon:"📱", label:"WhatsApp", bg:"#25D366", href:"https://wa.me/40779281047" },{ icon:"✉", label:"Cere ofertă", bg:"#F97316", href:"#form" }].map(b => (
        <a key={b.label} href={b.href} style={{ flex:1, background:b.bg, color:"#fff", borderRadius:9, padding:"10px 6px", fontSize:12, fontWeight:700, display:"flex", flexDirection:"column", alignItems:"center", gap:3, textDecoration:"none" }}>
          <span style={{ fontSize:18 }}>{b.icon}</span><span>{b.label}</span>
        </a>
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <PageHero />
        <ContactForm />
      </main>
      <Footer />
      <WAWidget />
      <MobileBar />
    </>
  );
}
