interface Result {
  val: string;
  label: string;
}

export default function SliderResults({ results }: { results: Result[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14 }}>
      {results.map((r) => (
        <div key={r.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--accent)", letterSpacing: "0.02em" }}>{r.val}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{r.label}</div>
        </div>
      ))}
    </div>
  );
}
