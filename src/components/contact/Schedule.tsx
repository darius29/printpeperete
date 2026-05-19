export default function Schedule() {
  const rows = [
    { day: "Luni – Vineri", hours: "09:00 – 18:00", active: true },
    { day: "Sâmbătă", hours: "10:00 – 14:00", active: true },
    { day: "Duminică", hours: "Închis", active: false },
  ];

  return (
    <div
      style={{
        background: "var(--bg-elevated, #141414)",
        border: "1px solid var(--bg-border, #2A2A2A)",
        borderRadius: 14,
        padding: 24,
      }}
    >
      <h4
        style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: 18,
          letterSpacing: "0.04em",
          marginBottom: 16,
        }}
      >
        Program
      </h4>

      {rows.map((r) => (
        <div
          key={r.day}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-secondary, #9CA3AF)" }}>
            {r.day}
          </span>
          <span
            style={{
              fontSize: 13,
              color: r.active ? "var(--success)" : "var(--error)",
              fontWeight: 600,
            }}
          >
            {r.hours}
          </span>
        </div>
      ))}
    </div>
  );
}
