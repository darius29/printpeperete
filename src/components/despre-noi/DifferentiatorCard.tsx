interface DifferentiatorCardProps {
  icon: string;
  val: string;
  title: string;
  desc: string;
  inView: boolean;
  delay: number;
}

export default function DifferentiatorCard({ icon, val, title, desc, inView, delay }: DifferentiatorCardProps) {
  return (
    <div
      className="diff-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity .6s ${delay}s, transform .6s ${delay}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            color: "var(--accent)",
            letterSpacing: "0.04em",
          }}
        >
          {val}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          letterSpacing: "0.03em",
          marginBottom: 10,
          color: "#fff",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}
