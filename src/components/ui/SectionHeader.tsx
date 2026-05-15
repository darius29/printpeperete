interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  inView?: boolean;
}

export default function SectionHeader({ label, title, subtitle, inView = true }: SectionHeaderProps) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: "opacity .7s, transform .7s",
        marginBottom: 56,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
        <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
          {label}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px,5vw,60px)",
          letterSpacing: "0.02em",
          lineHeight: 0.95,
          marginBottom: subtitle ? 12 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 520 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
