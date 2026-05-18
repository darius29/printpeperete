import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const tokens = {
  colors: {
    // Backgrounds
    "bg-void":    { value: "#0C0C0C", role: "Fundal principal" },
    "bg-surface": { value: "#141414", role: "Carduri / secțiuni" },
    "bg-elevated":{ value: "#1E1E1E", role: "Hover / input fill" },
    "bg-border":  { value: "#2A2A2A", role: "Borduri / separatoare" },
    // Accent
    "accent":     { value: "#F97316", role: "CTA principal / hover" },
    "accent-deep":{ value: "#EA580C", role: "Hover CTA / gradient end" },
    "accent-glow":{ value: "rgba(249,115,22,0.15)", role: "Glow / highlight" },
    // Text
    "text-primary":   { value: "#FFFFFF", role: "Text principal" },
    "text-secondary": { value: "#9CA3AF", role: "Text secundar / muted" },
    "text-tertiary":  { value: "#6B7280", role: "Placeholder / hint" },
    // Semantic
    "success": { value: "#22C55E", role: "Succes / confirmare" },
    "error":   { value: "#EF4444", role: "Eroare / alertă" },
    "info":    { value: "#3B82F6", role: "Informație" },
  },
  spacing: [4,8,12,16,20,24,32,40,48,64,80,96,128],
  radius: { sm:4, md:8, lg:12, xl:16, "2xl":24, full:9999 },
  fontSizes: {
    "xs":  { size:"11px", lineH:"1.5" },
    "sm":  { size:"13px", lineH:"1.6" },
    "base":{ size:"15px", lineH:"1.7" },
    "lg":  { size:"18px", lineH:"1.6" },
    "xl":  { size:"22px", lineH:"1.4" },
    "2xl": { size:"28px", lineH:"1.3" },
    "3xl": { size:"36px", lineH:"1.2" },
    "4xl": { size:"48px", lineH:"1.1" },
    "5xl": { size:"64px", lineH:"1.0" },
    "6xl": { size:"80px", lineH:"0.95" },
  },
};

// ─── INLINE STYLES ───────────────────────────────────────────────────────────
const S = {
  page: {
    background: "#0C0C0C",
    minHeight: "100vh",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: "#FFFFFF",
    padding: "0",
  },
  // Inject Google Fonts via style tag workaround
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Tag({ children, color = "#F97316", bg = "rgba(249,115,22,0.12)" }) {
  return (
    <span style={{
      display:"inline-block", background:bg, color, border:`1px solid ${color}33`,
      fontSize:"10px", fontWeight:500, padding:"2px 8px", borderRadius:20,
      letterSpacing:"0.05em", textTransform:"uppercase",
    }}>{children}</span>
  );
}

function SectionTitle({ label, num }) {
  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
        <span style={{
          width:28, height:28, borderRadius:"50%", background:"#F97316",
          color:"#fff", fontSize:12, fontWeight:700,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>{num}</span>
        <h2 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:28, letterSpacing:"0.04em", margin:0, color:"#fff" }}>{label}</h2>
      </div>
      <div style={{ height:1, background:"linear-gradient(to right, #F97316, transparent)" }} />
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function ColorsSection() {
  const [copied, setCopied] = useState("");
  const copy = (val) => {
    navigator.clipboard?.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(""), 1500);
  };

  const groups = [
    { title: "Backgrounds", keys: ["bg-void","bg-surface","bg-elevated","bg-border"] },
    { title: "Accent", keys: ["accent","accent-deep","accent-glow"] },
    { title: "Text", keys: ["text-primary","text-secondary","text-tertiary"] },
    { title: "Semantic", keys: ["success","error","info"] },
  ];

  return (
    <div>
      {groups.map(g => (
        <div key={g.title} style={{ marginBottom:28 }}>
          <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12, fontWeight:500 }}>{g.title}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {g.keys.map(k => {
              const c = tokens.colors[k];
              const isGlow = c.value.includes("rgba");
              return (
                <div
                  key={k}
                  onClick={() => copy(c.value)}
                  style={{
                    border:"1px solid #2A2A2A", borderRadius:10, overflow:"hidden",
                    width:140, cursor:"pointer", transition:"border-color 0.2s",
                    borderColor: copied === c.value ? "#F97316" : "#2A2A2A",
                  }}
                >
                  <div style={{
                    height:52,
                    background: isGlow ? `repeating-linear-gradient(45deg,${c.value},${c.value} 10px,rgba(249,115,22,0.05) 10px,rgba(249,115,22,0.05) 20px)` : c.value,
                    border: k === "bg-void" ? "none" : "none",
                    outline: k === "bg-void" ? "1px solid #2A2A2A" : "none",
                  }} />
                  <div style={{ padding:"8px 10px", background:"#141414" }}>
                    <div style={{ fontSize:11, fontWeight:600, color:"#fff", marginBottom:2 }}>--{k}</div>
                    <div style={{ fontSize:10, color:"#6B7280", fontFamily:"monospace" }}>{c.value}</div>
                    <div style={{ fontSize:10, color:"#6B7280", marginTop:2 }}>{c.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p style={{ fontSize:11, color:"#6B7280", marginTop:8 }}>Click pe un swatch pentru a copia valoarea.</p>
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      {/* Font pairing */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24 }}>
          <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Display / Titluri</p>
          <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:52, lineHeight:0.9, letterSpacing:"0.02em", color:"#fff" }}>BEBAS<br/>NEUE</div>
          <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #2A2A2A" }}>
            <div style={{ fontSize:11, color:"#F97316", fontFamily:"monospace", marginBottom:4 }}>font-family: 'Bebas Neue', sans-serif</div>
            <div style={{ fontSize:11, color:"#6B7280" }}>Folosit: H1, H2, hero display, numere mari</div>
          </div>
        </div>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24 }}>
          <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>UI / Body / Navigație</p>
          <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:26, lineHeight:1.3, color:"#fff", fontWeight:500 }}>DM Sans<br/><span style={{ fontWeight:400, fontSize:18, color:"#9CA3AF" }}>Regular & Medium</span></div>
          <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #2A2A2A" }}>
            <div style={{ fontSize:11, color:"#F97316", fontFamily:"monospace", marginBottom:4 }}>font-family: 'DM Sans', sans-serif</div>
            <div style={{ fontSize:11, color:"#6B7280" }}>Folosit: paragrafe, labels, nav, butoane, UI</div>
          </div>
        </div>
      </div>

      {/* Type scale */}
      <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, overflow:"hidden", marginBottom:24 }}>
        <div style={{ padding:"12px 20px", background:"#1E1E1E", display:"flex", gap:16 }}>
          <span style={{ fontSize:11, color:"#6B7280", fontWeight:500, width:60 }}>Token</span>
          <span style={{ fontSize:11, color:"#6B7280", fontWeight:500, width:60 }}>Size</span>
          <span style={{ fontSize:11, color:"#6B7280", fontWeight:500, flex:1 }}>Exemplu</span>
        </div>
        {[
          { token:"display-6xl", size:"80px", font:"Bebas Neue", text:"TRANSFORMĂM", weight:400 },
          { token:"display-5xl", size:"64px", font:"Bebas Neue", text:"SERVICII PRINT", weight:400 },
          { token:"display-4xl", size:"48px", font:"Bebas Neue", text:"PORTOFOLIU", weight:400 },
          { token:"h1", size:"36px", font:"Bebas Neue", text:"Print UV Direct", weight:400 },
          { token:"h2", size:"28px", font:"Bebas Neue", text:"Gravare Laser CO₂", weight:400 },
          { token:"h3", size:"22px", font:"DM Sans", text:"Obiecte personalizate", weight:600 },
          { token:"body-lg", size:"18px", font:"DM Sans", text:"Timișoara & toată România", weight:400 },
          { token:"body", size:"15px", font:"DM Sans", text:"Print direct pe perete, fără autocolant, fără lipire.", weight:400 },
          { token:"body-sm", size:"13px", font:"DM Sans", text:"Culori vii CMYK · Uscare UV instant · Non-toxic", weight:400 },
          { token:"caption", size:"11px", font:"DM Sans", text:"© 2026 SDG PRINT & Design — Timișoara", weight:400 },
        ].map((r, i) => (
          <div key={r.token} style={{
            display:"flex", alignItems:"center", gap:16, padding:"10px 20px",
            borderBottom: i < 9 ? "1px solid #1E1E1E" : "none",
          }}>
            <span style={{ fontSize:10, color:"#F97316", fontFamily:"monospace", width:60, flexShrink:0 }}>{r.token}</span>
            <span style={{ fontSize:10, color:"#6B7280", fontFamily:"monospace", width:60, flexShrink:0 }}>{r.size}</span>
            <span style={{ fontFamily: r.font === "Bebas Neue" ? "'Bebas Neue', sans-serif" : "'DM Sans', sans-serif", fontSize:r.size, fontWeight:r.weight, lineHeight:1.1, color:"#fff", letterSpacing: r.font === "Bebas Neue" ? "0.02em" : "normal", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingSection() {
  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {tokens.spacing.map(s => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ fontSize:11, color:"#6B7280", fontFamily:"monospace", width:40, textAlign:"right", flexShrink:0 }}>{s}px</span>
            <div style={{ width:s, height:20, background:"#F97316", borderRadius:2, flexShrink:0 }} />
            <span style={{ fontSize:11, color:"#6B7280" }}>
              {s===4?"Border gaps"
              :s===8?"Icon padding"
              :s===12?"Tag/badge inner"
              :s===16?"Card inner sm"
              :s===20?"Nav items"
              :s===24?"Card inner"
              :s===32?"Section inner"
              :s===40?"Section gap"
              :s===48?"Component gap"
              :s===64?"Section padding"
              :s===80?"Section gap lg"
              :s===96?"Page section"
              :"Section xl"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonsSection() {
  const [loading, setLoading] = useState(false);
  const triggerLoad = () => { setLoading(true); setTimeout(()=>setLoading(false),2000); };

  return (
    <div>
      {/* Primary */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Primary CTA</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:28 }}>
        <button
          onClick={triggerLoad}
          style={{
            background: loading ? "#EA580C" : "#F97316",
            color:"#fff", border:"none", borderRadius:8,
            padding:"12px 24px", fontSize:14, fontWeight:600, cursor:"pointer",
            fontFamily:"'DM Sans', sans-serif", letterSpacing:"0.01em",
            boxShadow: loading ? "none" : "0 0 0 0 rgba(249,115,22,0)",
            transition:"all 0.2s", display:"flex", alignItems:"center", gap:8,
            animation: loading ? "none" : "pulse-ring 2s infinite",
          }}
        >
          {loading ? "Se trimite..." : "Cere ofertă personalizată"} →
        </button>

        <button style={{
          background:"transparent", color:"#F97316",
          border:"1px solid #F97316", borderRadius:8,
          padding:"12px 24px", fontSize:14, fontWeight:600, cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif",
          transition:"all 0.2s",
        }}>
          Vezi portofoliul
        </button>

        <button style={{
          background:"#1E1E1E", color:"#fff",
          border:"1px solid #2A2A2A", borderRadius:8,
          padding:"12px 24px", fontSize:14, fontWeight:600, cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif",
          transition:"all 0.2s",
        }}>
          Detalii servicii
        </button>
      </div>

      {/* Sizes */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Dimensiuni</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", marginBottom:28 }}>
        {[
          { label:"XS — 11px", p:"6px 14px", fs:11 },
          { label:"SM — 13px", p:"8px 18px", fs:13 },
          { label:"MD — 14px", p:"11px 22px", fs:14 },
          { label:"LG — 15px", p:"14px 28px", fs:15 },
          { label:"XL — 16px", p:"16px 36px", fs:16 },
        ].map(b => (
          <button key={b.label} style={{
            background:"#F97316", color:"#fff", border:"none",
            borderRadius:8, padding:b.p, fontSize:b.fs, fontWeight:600, cursor:"pointer",
            fontFamily:"'DM Sans', sans-serif",
          }}>{b.label}</button>
        ))}
      </div>

      {/* Icon buttons */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Icon + text / WhatsApp widget</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:28 }}>
        <button style={{
          background:"#25D366", color:"#fff", border:"none", borderRadius:8,
          padding:"11px 20px", fontSize:14, fontWeight:600, cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif", display:"flex", alignItems:"center", gap:8,
        }}>
          <span style={{ fontSize:18 }}>📱</span> WhatsApp rapid
        </button>
        <button style={{
          background:"#1E1E1E", color:"#fff", border:"1px solid #2A2A2A", borderRadius:8,
          padding:"11px 20px", fontSize:14, fontWeight:600, cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif", display:"flex", alignItems:"center", gap:8,
        }}>
          <span>📞</span> Sună acum
        </button>
        <button style={{
          background:"transparent", color:"#9CA3AF", border:"none",
          padding:"11px 0", fontSize:14, cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif", display:"flex", alignItems:"center", gap:6,
          textDecoration:"underline", textDecorationColor:"#2A2A2A",
        }}>
          Pregătire fișiere →
        </button>
      </div>
    </div>
  );
}

function CardsSection() {
  const [activeCard, setActiveCard] = useState(null);
  const services = [
    { icon:"🖨️", title:"Print UV pe perete", desc:"Print direct pe suprafață, fără autocolant, fără lipire.", tag:"Principal" },
    { icon:"⚡", title:"Gravare laser CO₂", desc:"Precizie industrială pentru lemn, acril, piele și altele.", tag:"Laser" },
    { icon:"🎁", title:"Obiecte personalizate", desc:"Căni, huse și cadouri corporate cu branding premium.", tag:"Custom" },
    { icon:"👕", title:"Print textile", desc:"Tricouri, hanorace și uniforme cu print rezistent.", tag:"Textile" },
  ];

  return (
    <div>
      {/* Service cards */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Card serviciu</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:32 }}>
        {services.map((s,i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              background: activeCard===i ? "#1E1E1E" : "#141414",
              border:`1px solid ${activeCard===i ? "#F97316" : "#2A2A2A"}`,
              borderRadius:12, padding:24, cursor:"pointer",
              transform: activeCard===i ? "translateY(-4px)" : "none",
              boxShadow: activeCard===i ? "0 8px 32px rgba(249,115,22,0.12)" : "none",
              transition:"all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.03em", margin:0, color:"#fff" }}>{s.title}</h3>
            </div>
            <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.6, margin:"0 0 16px" }}>{s.desc}</p>
            <span style={{ fontSize:12, color:"#F97316", fontWeight:600 }}>Detalii →</span>
          </div>
        ))}
      </div>

      {/* Stat card */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Stat card (counter animat)</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:32 }}>
        {[
          { val:"2880", unit:"DPI", label:"Rezoluție maximă" },
          { val:"48h", unit:"", label:"Livrare standard" },
          { val:"290", unit:"cm", label:"Înălțime maximă" },
          { val:"10+", unit:"", label:"Materiale" },
        ].map((s,i) => (
          <div key={i} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:10, padding:"16px 14px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:"0.02em", color:"#F97316", lineHeight:1 }}>
              {s.val}<span style={{ fontSize:18, color:"#EA580C" }}>{s.unit}</span>
            </div>
            <div style={{ fontSize:11, color:"#6B7280", marginTop:6, lineHeight:1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature badge card */}
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Feature badge / avantaj</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
        {[
          { icon:"✓", text:"Print direct pe perete — fără folie, fără lipire" },
          { icon:"✓", text:"Design permanent și rezistent la uzură" },
          { icon:"✓", text:"Culori vii și realiste, sistem CMYK" },
          { icon:"✓", text:"Execuție rapidă, fără deranj în spațiu" },
          { icon:"✓", text:"Potrivit pentru spații comerciale și rezidențiale" },
          { icon:"✓", text:"Fără miros neplăcut, non-toxic" },
        ].map((f,i) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#141414", border:"1px solid #2A2A2A", borderRadius:8, padding:"12px 14px" }}>
            <span style={{ color:"#F97316", fontWeight:700, flexShrink:0, marginTop:1 }}>{f.icon}</span>
            <span style={{ fontSize:12, color:"#9CA3AF", lineHeight:1.5 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormsSection() {
  const [vals, setVals] = useState({ name:"", phone:"", email:"", service:"", location:"", message:"" });
  const set = (k, v) => setVals(p => ({...p,[k]:v}));

  const inputStyle = {
    width:"100%", background:"#141414", border:"1px solid #2A2A2A",
    borderRadius:8, padding:"11px 14px", color:"#fff", fontSize:14,
    fontFamily:"'DM Sans', sans-serif", outline:"none", boxSizing:"border-box",
    transition:"border-color 0.2s",
  };

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        {/* Form */}
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, padding:24 }}>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.03em", marginBottom:20, color:"#fff" }}>Cere ofertă</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Nume *</label>
                <input style={inputStyle} placeholder="Ion Popescu" value={vals.name} onChange={e=>set("name",e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Telefon *</label>
                <input style={inputStyle} placeholder="07xx xxx xxx" value={vals.phone} onChange={e=>set("phone",e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Email *</label>
              <input style={inputStyle} placeholder="email@firma.ro" value={vals.email} onChange={e=>set("email",e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Tip serviciu *</label>
              <select style={{...inputStyle, cursor:"pointer"}} value={vals.service} onChange={e=>set("service",e.target.value)}>
                <option value="">Selectează...</option>
                <option>Wall Print UV</option>
                <option>Gravare laser CO₂</option>
                <option>Tricouri & Hanorace</option>
                <option>Obiecte personalizate</option>
                <option>Design personalizat</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Locație proiect</label>
              <input style={inputStyle} placeholder="Timișoara, Arad..." value={vals.location} onChange={e=>set("location",e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Mesaj / Detalii *</label>
              <textarea style={{...inputStyle, resize:"vertical", minHeight:80}} placeholder="Dimensiuni perete, suprafață, cantitate..." value={vals.message} onChange={e=>set("message",e.target.value)} />
            </div>
            {/* Upload zone */}
            <div style={{
              border:"1px dashed #2A2A2A", borderRadius:8, padding:"16px 14px",
              textAlign:"center", cursor:"pointer", background:"#0C0C0C",
              transition:"border-color 0.2s",
            }}>
              <div style={{ fontSize:24, marginBottom:6 }}>📎</div>
              <div style={{ fontSize:13, color:"#9CA3AF" }}>Trage fișierul design aici sau <span style={{ color:"#F97316" }}>selectează</span></div>
              <div style={{ fontSize:11, color:"#6B7280", marginTop:4 }}>PDF, AI, PNG, JPG — max 20MB</div>
            </div>
            <button style={{
              background:"#F97316", color:"#fff", border:"none",
              borderRadius:8, padding:"13px 24px", fontSize:15, fontWeight:700,
              cursor:"pointer", fontFamily:"'DM Sans', sans-serif", width:"100%",
              letterSpacing:"0.01em",
            }}>
              Trimite cererea →
            </button>
          </div>
        </div>

        {/* Input states */}
        <div>
          <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Stări input</p>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { label:"Default", border:"#2A2A2A", ph:"Placeholder text" },
              { label:"Focus", border:"#F97316", ph:"Text activ — border portocaliu" },
              { label:"Filled", border:"#2A2A2A", val:"Ion Popescu", ph:"" },
              { label:"Error", border:"#EF4444", ph:"", err:"Câmp obligatoriu" },
              { label:"Success", border:"#22C55E", val:"contact@firma.ro", ph:"" },
              { label:"Disabled", border:"#1E1E1E", ph:"Câmp dezactivat", dis:true },
            ].map(s => (
              <div key={s.label}>
                <label style={{ fontSize:11, color:"#6B7280", display:"block", marginBottom:5 }}>{s.label}</label>
                <input
                  disabled={s.dis}
                  style={{...inputStyle, borderColor:s.border, opacity:s.dis?0.4:1, width:"100%"}}
                  placeholder={s.ph}
                  defaultValue={s.val||""}
                />
                {s.err && <span style={{ fontSize:11, color:"#EF4444", marginTop:4, display:"block" }}>⚠ {s.err}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgesSection() {
  const chips = ["Timișoara","Arad","Cluj-Napoca","Bihor","Alba","Hunedoara","Caraș-Severin","Mureș","Sibiu"];
  const surfaces = ["Pereți tencuiți","Lemn & MDF","Sticlă","Metal","Plastic rigid","Beton","Gresie"];
  const [activeChips, setActiveChips] = useState([]);
  const toggleChip = c => setActiveChips(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c]);

  return (
    <div>
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Status badges</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
        {[
          { label:"Principal", bg:"rgba(249,115,22,0.12)", color:"#F97316", border:"rgba(249,115,22,0.3)" },
          { label:"Nou", bg:"rgba(34,197,94,0.12)", color:"#22C55E", border:"rgba(34,197,94,0.3)" },
          { label:"Popular", bg:"rgba(59,130,246,0.12)", color:"#3B82F6", border:"rgba(59,130,246,0.3)" },
          { label:"Laser CO₂", bg:"rgba(139,92,246,0.12)", color:"#A78BFA", border:"rgba(139,92,246,0.3)" },
          { label:"Timișoara", bg:"#1E1E1E", color:"#9CA3AF", border:"#2A2A2A" },
          { label:"48h", bg:"rgba(34,197,94,0.12)", color:"#22C55E", border:"rgba(34,197,94,0.3)" },
        ].map(b => (
          <span key={b.label} style={{
            background:b.bg, color:b.color, border:`1px solid ${b.border}`,
            fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20,
            letterSpacing:"0.04em",
          }}>{b.label}</span>
        ))}
      </div>

      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Chips filtrare (click activ)</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
        {chips.map(c => (
          <button key={c} onClick={() => toggleChip(c)} style={{
            background: activeChips.includes(c) ? "#F97316" : "#141414",
            color: activeChips.includes(c) ? "#fff" : "#9CA3AF",
            border: `1px solid ${activeChips.includes(c) ? "#F97316" : "#2A2A2A"}`,
            fontSize:12, fontWeight:500, padding:"6px 14px", borderRadius:20,
            cursor:"pointer", transition:"all 0.15s", fontFamily:"'DM Sans', sans-serif",
          }}>{c}</button>
        ))}
      </div>

      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Chips suprafețe (outline style)</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {surfaces.map(s => (
          <span key={s} style={{
            background:"transparent", color:"#9CA3AF",
            border:"1px solid #2A2A2A", fontSize:12, padding:"5px 12px",
            borderRadius:6, fontFamily:"'DM Sans', sans-serif",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function NavigationSection() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Navbar desktop (scrolled state)</p>
      <div style={{
        background:"rgba(12,12,12,0.92)", backdropFilter:"blur(16px)",
        border:"1px solid #2A2A2A", borderRadius:12,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"14px 24px", marginBottom:24,
      }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.06em", color:"#fff" }}>
          SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
        </div>
        <nav style={{ display:"flex", alignItems:"center", gap:28 }}>
          {["Acasă","Despre Noi","Servicii","Portofoliu","Before/After","Contact"].map((l,i) => (
            <a key={l} href="#" style={{
              fontSize:13, fontWeight:500, color: i===2 ? "#F97316" : "#9CA3AF",
              textDecoration:"none", fontFamily:"'DM Sans',sans-serif",
              borderBottom: i===2 ? "1px solid #F97316" : "none", paddingBottom:2,
            }}>{l}</a>
          ))}
        </nav>
        <button style={{
          background:"#F97316", color:"#fff", border:"none",
          borderRadius:7, padding:"9px 18px", fontSize:13, fontWeight:600,
          cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
        }}>Cere ofertă</button>
      </div>

      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Sticky mobile bar</p>
      <div style={{
        background:"rgba(20,20,20,0.97)", backdropFilter:"blur(12px)",
        border:"1px solid #2A2A2A", borderRadius:12,
        display:"flex", gap:8, padding:10,
      }}>
        {[
          { icon:"📞", label:"Sună acum", bg:"#1E1E1E", color:"#fff" },
          { icon:"📱", label:"WhatsApp", bg:"#25D366", color:"#fff" },
          { icon:"✉", label:"Cere ofertă", bg:"#F97316", color:"#fff" },
        ].map(b => (
          <button key={b.label} style={{
            flex:1, background:b.bg, color:b.color, border:"none", borderRadius:8,
            padding:"10px 6px", fontSize:12, fontWeight:700, cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column",
            alignItems:"center", gap:4,
          }}>
            <span style={{ fontSize:18 }}>{b.icon}</span>
            <span>{b.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop:24 }}>
        <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>WhatsApp floating widget</p>
        <div style={{ position:"relative", height:80, background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, overflow:"hidden" }}>
          <div style={{ position:"absolute", bottom:16, right:16, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            <div style={{ background:"#0C0C0C", border:"1px solid #2A2A2A", borderRadius:8, padding:"6px 12px", fontSize:12, color:"#9CA3AF", whiteSpace:"nowrap" }}>
              Chat rapid pe WhatsApp →
            </div>
            <div style={{
              width:48, height:48, borderRadius:"50%", background:"#25D366",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, cursor:"pointer", boxShadow:"0 4px 16px rgba(37,211,102,0.3)",
            }}>📱</div>
          </div>
          <span style={{ position:"absolute", top:12, left:16, fontSize:11, color:"#6B7280" }}>Apare pe toate paginile, fixed bottom-right</span>
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    { num:"01", title:"Discuție & obiective", desc:"Colectăm dimensiuni, context și direcția vizuală dorită pentru proiect." },
    { num:"02", title:"Propunere creativă", desc:"Pregătim variante de design și recomandăm materialele potrivite." },
    { num:"03", title:"Execuție & predare", desc:"Programăm producția și livrăm cu verificare finală a calității." },
  ];
  return (
    <div>
      <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:20 }}>Proces 3 pași (cu conector)</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, position:"relative" }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative" }}>
            {i < 2 && (
              <div style={{ position:"absolute", top:28, left:"50%", width:"100%", height:1, background:"linear-gradient(to right, #F97316, #2A2A2A)", zIndex:0 }} />
            )}
            <div style={{
              width:56, height:56, borderRadius:"50%",
              background:"#141414", border:"2px solid #F97316",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.05em",
              color:"#F97316", position:"relative", zIndex:1,
            }}>{s.num}</div>
            <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:"0.03em", margin:"14px 0 8px", color:"#fff" }}>{s.title}</h4>
            <p style={{ fontSize:12, color:"#9CA3AF", lineHeight:1.6, padding:"0 8px", margin:0 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop:32 }}>
        <p style={{ fontSize:11, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:20 }}>Tabel comparativ SDG vs Classic</p>
        <div style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:12, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"#1E1E1E", padding:"10px 20px" }}>
            <span style={{ fontSize:11, color:"#6B7280", fontWeight:500 }}>Criteriu</span>
            <span style={{ fontSize:11, color:"#F97316", fontWeight:600 }}>SDG Print</span>
            <span style={{ fontSize:11, color:"#6B7280", fontWeight:500 }}>Metoda clasică</span>
          </div>
          {[
            ["Aplicare","Direct pe suprafață","Tapet sau folie"],
            ["Durabilitate","UV-rezistent, ani","Se dezlipește, pălește"],
            ["Personalizare","Orice design/dim.","Limitată la modele"],
            ["Timp execuție","Livrare în 48h","Zile sau săptămâni"],
            ["Suprafețe","Beton, metal, lemn","Doar suprafețe plane"],
            ["Risc deteriorare","Zero — neinvaziv","Risc la dezlipire"],
          ].map(([c,sdg,cls],i) => (
            <div key={c} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"10px 20px", borderTop:"1px solid #1E1E1E", alignItems:"center" }}>
              <span style={{ fontSize:12, color:"#9CA3AF", fontWeight:500 }}>{c}</span>
              <span style={{ fontSize:12, color:"#22C55E", display:"flex", alignItems:"center", gap:6 }}>✓ {sdg}</span>
              <span style={{ fontSize:12, color:"#6B7280", display:"flex", alignItems:"center", gap:6 }}>✗ {cls}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CSS VARIABLES EXPORT ─────────────────────────────────────────────────────
function CSSVarsSection() {
  const cssCode = `:root {
  /* Backgrounds */
  --bg-void:     #0C0C0C;
  --bg-surface:  #141414;
  --bg-elevated: #1E1E1E;
  --bg-border:   #2A2A2A;

  /* Accent */
  --accent:      #F97316;
  --accent-deep: #EA580C;
  --accent-glow: rgba(249, 115, 22, 0.15);

  /* Text */
  --text-primary:   #FFFFFF;
  --text-secondary: #9CA3AF;
  --text-tertiary:  #6B7280;

  /* Semantic */
  --success: #22C55E;
  --error:   #EF4444;
  --info:    #3B82F6;

  /* Typography */
  --font-display: 'Bebas Neue', sans-serif;
  --font-ui:      'DM Sans', sans-serif;

  /* Radius */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;
  --radius-2xl: 24px;

  /* Transitions */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in:  cubic-bezier(0.55, 0, 1, 0.45);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
}`;

  const tailwindConfig = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        void:    '#0C0C0C',
        surface: '#141414',
        elevated:'#1E1E1E',
        border:  '#2A2A2A',
        accent:  { DEFAULT:'#F97316', deep:'#EA580C' },
        muted:   '#9CA3AF',
        hint:    '#6B7280',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        ui:      ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px',
        xl: '16px', '2xl': '24px',
      },
    },
  },
}`;

  const [tab, setTab] = useState("css");

  return (
    <div>
      <div style={{ display:"flex", gap:4, marginBottom:16 }}>
        {["css","tailwind"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab===t ? "#F97316" : "#141414",
            color: tab===t ? "#fff" : "#9CA3AF",
            border:`1px solid ${tab===t ? "#F97316" : "#2A2A2A"}`,
            borderRadius:6, padding:"6px 16px", fontSize:12, fontWeight:600,
            cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
          }}>{t === "css" ? "CSS Variables" : "Tailwind Config"}</button>
        ))}
      </div>
      <pre style={{
        background:"#0C0C0C", border:"1px solid #2A2A2A", borderRadius:10,
        padding:20, fontSize:11, color:"#9CA3AF", overflowX:"auto",
        fontFamily:"monospace", lineHeight:1.7, margin:0,
      }}>
        <code style={{ color:"#E2E8F0" }}>{tab === "css" ? cssCode : tailwindConfig}</code>
      </pre>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const tabs = [
  { id:"colors",     label:"Culori",       icon:"🎨", Component:ColorsSection },
  { id:"typography", label:"Tipografie",   icon:"Aa", Component:TypographySection },
  { id:"spacing",    label:"Spacing",      icon:"↔",  Component:SpacingSection },
  { id:"buttons",    label:"Butoane",      icon:"⬜",  Component:ButtonsSection },
  { id:"cards",      label:"Carduri",      icon:"▭",  Component:CardsSection },
  { id:"forms",      label:"Formulare",    icon:"✏",  Component:FormsSection },
  { id:"badges",     label:"Badges/Chips", icon:"🏷",  Component:BadgesSection },
  { id:"navigation", label:"Navigație",    icon:"☰",  Component:NavigationSection },
  { id:"process",    label:"Proces & UI",  icon:"⟶",  Component:ProcessSection },
  { id:"vars",       label:"CSS/Tailwind", icon:"</>", Component:CSSVarsSection },
];

export default function DesignSystem() {
  const [active, setActive] = useState("colors");
  const ActiveComponent = tabs.find(t => t.id === active)?.Component ?? ColorsSection;
  const activeTab = tabs.find(t => t.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0C0C0C; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
        input, select, textarea { color-scheme: dark; }
        input::placeholder, textarea::placeholder { color: #4B5563; }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
      `}</style>
      <div style={S.page}>
        {/* Header */}
        <div style={{
          background:"#141414", borderBottom:"1px solid #2A2A2A",
          padding:"20px 32px", display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.06em", color:"#fff", lineHeight:1 }}>
              SDG <span style={{ color:"#F97316" }}>PRINT</span> & Design
            </div>
            <div style={{ fontSize:11, color:"#6B7280", marginTop:4, fontFamily:"'DM Sans',sans-serif" }}>Design System v1.0 — Documentație componentă</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ background:"rgba(249,115,22,0.12)", color:"#F97316", border:"1px solid rgba(249,115,22,0.25)", fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>Dark Theme</span>
            <span style={{ background:"rgba(34,197,94,0.12)", color:"#22C55E", border:"1px solid rgba(34,197,94,0.25)", fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>Next.js Ready</span>
            <span style={{ background:"rgba(139,92,246,0.12)", color:"#A78BFA", border:"1px solid rgba(139,92,246,0.25)", fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>v1.0</span>
          </div>
        </div>

        <div style={{ display:"flex", minHeight:"calc(100vh - 69px)" }}>
          {/* Sidebar */}
          <div style={{
            width:200, background:"#0C0C0C", borderRight:"1px solid #2A2A2A",
            padding:"20px 0", flexShrink:0, position:"sticky", top:0, height:"calc(100vh - 69px)", overflowY:"auto",
          }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10,
                  padding:"10px 20px", background: active===t.id ? "#141414" : "transparent",
                  border:"none", borderLeft:`3px solid ${active===t.id ? "#F97316" : "transparent"}`,
                  color: active===t.id ? "#fff" : "#6B7280",
                  fontSize:13, fontWeight: active===t.id ? 600 : 400,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                  textAlign:"left", transition:"all 0.15s",
                }}
              >
                <span style={{ fontSize:15, width:20, textAlign:"center", flexShrink:0 }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex:1, padding:"32px 40px", overflowY:"auto", maxWidth:900 }}>
            <SectionTitle label={activeTab?.label?.toUpperCase() ?? ""} num={tabs.findIndex(t=>t.id===active)+1} />
            <ActiveComponent />
          </div>
        </div>
      </div>
    </>
  );
}
