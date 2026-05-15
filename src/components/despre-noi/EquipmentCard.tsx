interface EquipmentCardProps {
  tag: string;
  name: string;
  subtitle: string;
  icon: string;
  specs: [string, string][];
  inView: boolean;
  delay: number;
}

export default function EquipmentCard({ tag, name, subtitle, icon, specs, inView, delay }: EquipmentCardProps) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--bg-border)",
        borderRadius: 16,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity .7s ${delay}s, transform .7s ${delay}s`,
      }}
    >
      {/* Visual header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a, #111)",
          padding: "32px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderBottom: "1px solid var(--bg-border)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            background: "rgba(249,115,22,.1)",
            border: "1px solid rgba(249,115,22,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              color: "var(--accent)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            {tag}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              letterSpacing: "0.03em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{subtitle}</div>
        </div>
      </div>

      {/* Specs list */}
      <div style={{ padding: "20px 24px" }}>
        {specs.map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>{k}</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
