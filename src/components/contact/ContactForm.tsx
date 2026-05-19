"use client";

import { useRef, useState, type RefObject } from "react";
import { useInView } from "@/hooks/useInView";

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

export default function ContactForm() {
  const [refRaw, inView] = useInView(0.06);
  const ref = refRaw as RefObject<HTMLDivElement>;
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const setValidatedFile = (f: File | null) => {
    if (!f) { setFile(null); setFileError(null); return; }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("Fișierul depășește limita de 5MB");
      setFile(null);
    } else {
      setFileError(null);
      setFile(f);
    }
  };

  const set = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof FormErrors]) {
      setErrors((p) => ({ ...p, [k]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (form.name.trim().length < 2) e.name = "Numele trebuie să aibă cel puțin 2 caractere";
    if (!/^(\+4|0)[0-9]{9}$/.test(form.phone.trim())) e.phone = "Număr de telefon invalid (ex: 0712345678)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalid";
    if (!form.service) e.service = "Selectează un serviciu";
    if (form.message.trim().length < 10) e.message = "Mesajul trebuie să aibă cel puțin 10 caractere";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateField = (key: keyof FormErrors) => {
    const e: FormErrors = { ...errors };
    if (key === "name") {
      if (form.name.trim().length < 2) e.name = "Numele trebuie să aibă cel puțin 2 caractere";
      else delete e.name;
    }
    if (key === "phone") {
      if (!/^(\+4|0)[0-9]{9}$/.test(form.phone.trim())) e.phone = "Număr de telefon invalid (ex: 0712345678)";
      else delete e.phone;
    }
    if (key === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalid";
      else delete e.email;
    }
    if (key === "service") {
      if (!form.service) e.service = "Selectează un serviciu";
      else delete e.service;
    }
    if (key === "message") {
      if (form.message.trim().length < 10) e.message = "Mesajul trebuie să aibă cel puțin 10 caractere";
      else delete e.message;
    }
    setErrors(e);
  };

  const isFormValid =
    form.name.trim().length >= 2 &&
    /^(\+4|0)[0-9]{9}$/.test(form.phone.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    !!form.service &&
    form.message.trim().length >= 10 &&
    Object.keys(errors).every((k) => !errors[k as keyof FormErrors]);

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("service", form.service);
      fd.append("location", form.location);
      fd.append("message", form.message);
      if (file) fd.append("file", file);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare necunoscută");
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Eroare la trimitere. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setValidatedFile(f);
  };

  const getInputClass = (k: keyof FormErrors) => {
    if (errors[k]) return "field-input error";
    if (form[k as keyof FormState]) return "field-input success";
    return "field-input";
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "var(--bg-elevated, #141414)",
          border: "1px solid #22C55E",
          borderRadius: 20,
          padding: "64px 48px",
          textAlign: "center",
          animation: "fadeUp .6s ease",
          boxShadow: "0 0 60px rgba(34,197,94,.08)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(34,197,94,.12)",
            border: "2px solid #22C55E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 32,
            animation: "checkPop .5s .2s both",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: 36,
            letterSpacing: "0.03em",
            marginBottom: 12,
            color: "#fff",
          }}
        >
          Cerere trimisă!
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary, #9CA3AF)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Mulțumim! Vom reveni cu o ofertă personalizată în maxim 24 de ore.
          Verifică și inbox-ul de spam dacă nu primești răspuns.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              background: "rgba(34,197,94,.08)",
              border: "1px solid rgba(34,197,94,.2)",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 13,
              color: "#22C55E",
            }}
          >
            Confirmare trimisă pe {form.email}
          </div>
          <button
            className="btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
            onClick={() => setSubmitted(false)}
          >
            Trimite altă cerere
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        background: "var(--bg-elevated, #141414)",
        border: "1px solid var(--bg-border, #2A2A2A)",
        borderRadius: 16,
        padding: 36,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: "opacity .7s, transform .7s",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: 28,
          letterSpacing: "0.03em",
          marginBottom: 8,
        }}
      >
        Cere ofertă personalizată
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-secondary, #9CA3AF)",
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        Completează formularul și îți pregătim o ofertă adaptată proiectului
        tău.
      </p>

      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        {/* Name + Phone */}
        <div className="grid-2-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {(
            [
              ["name", "Nume *", "Ion Popescu"],
              ["phone", "Telefon *", "07xx xxx xxx"],
            ] as [keyof FormState, string, string][]
          ).map(([k, l, ph]) => (
            <div key={k}>
              <label
                htmlFor={`cf-${k}`}
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary, #6B7280)",
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {l}
              </label>
              <input
                id={`cf-${k}`}
                type={k === "phone" ? "tel" : "text"}
                className={getInputClass(k as keyof FormErrors)}
                placeholder={ph}
                value={form[k]}
                onChange={(e) => set(k, e.target.value)}
                onBlur={() => validateField(k as keyof FormErrors)}
                aria-invalid={!!errors[k as keyof FormErrors]}
                aria-describedby={errors[k as keyof FormErrors] ? `cf-${k}-error` : undefined}
              />
              {errors[k as keyof FormErrors] && (
                <span
                  id={`cf-${k}-error`}
                  role="alert"
                  style={{
                    fontSize: 11,
                    color: "#EF4444",
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  {errors[k as keyof FormErrors]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="cf-email"
            style={{
              fontSize: 11,
              color: "var(--text-tertiary, #6B7280)",
              display: "block",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            className={getInputClass("email")}
            placeholder="email@firma.ro"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => validateField("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
          />
          {errors.email && (
            <span
              id="cf-email-error"
              role="alert"
              style={{
                fontSize: 11,
                color: "#EF4444",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="cf-service"
            style={{
              fontSize: 11,
              color: "var(--text-tertiary, #6B7280)",
              display: "block",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Tip serviciu *
          </label>
          <select
            id="cf-service"
            className={getInputClass("service")}
            style={{ cursor: "pointer", colorScheme: "dark" }}
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            onBlur={() => validateField("service")}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "cf-service-error" : undefined}
          >
            <option value="">Selectează serviciul...</option>
            <option>Wall Print UV</option>
            <option>Gravare laser CO₂</option>
            <option>Tricouri &amp; Hanorace</option>
            <option>Obiecte personalizate</option>
            <option>Design personalizat</option>
            <option>Pachet combinat</option>
          </select>
          {errors.service && (
            <span
              id="cf-service-error"
              role="alert"
              style={{
                fontSize: 11,
                color: "#EF4444",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.service}
            </span>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="cf-location"
            style={{
              fontSize: 11,
              color: "var(--text-tertiary, #6B7280)",
              display: "block",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Locație proiect
          </label>
          <input
            id="cf-location"
            className="field-input"
            placeholder="Timișoara, Arad, Cluj..."
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="cf-message"
            style={{
              fontSize: 11,
              color: "var(--text-tertiary, #6B7280)",
              display: "block",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Mesaj / Detalii *
          </label>
          <textarea
            id="cf-message"
            className={getInputClass("message")}
            style={{ resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
            placeholder="Dimensiunile peretelui, suprafața, cantitate, termen dorit..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => validateField("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
          />
          {errors.message && (
            <span
              id="cf-message-error"
              role="alert"
              style={{
                fontSize: 11,
                color: "#EF4444",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.message}
            </span>
          )}
        </div>

        {/* File upload */}
        <div>
          <label
            htmlFor="cf-file"
            style={{
              fontSize: 11,
              color: "var(--text-tertiary, #6B7280)",
              display: "block",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Fișier design (opțional)
          </label>
          <div
            role="button"
            tabIndex={0}
            aria-label="Încarcă fișier design"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileRef.current?.click();
              }
            }}
            style={{
              border: `1px dashed ${
                dragging ? "#F97316" : file ? "#22C55E" : "#2A2A2A"
              }`,
              borderRadius: 10,
              padding: "20px 16px",
              textAlign: "center",
              cursor: "pointer",
              background: dragging
                ? "rgba(249,115,22,.04)"
                : file
                ? "rgba(34,197,94,.04)"
                : "#0C0C0C",
              transition: "all .2s",
              outline: "none",
            }}
          >
            <input
              ref={fileRef}
              id="cf-file"
              type="file"
              accept=".pdf,.ai,.png,.jpg,.jpeg,.svg"
              style={{ display: "none" }}
              onChange={(e) => setValidatedFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <div>
                <div style={{ fontSize: 24, marginBottom: 6 }}>✓</div>
                <div style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>
                  {file.name}
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setValidatedFile(null);
                  }}
                  style={{
                    marginTop: 8,
                    background: "none",
                    border: "1px solid #2A2A2A",
                    color: "#9CA3AF",
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 5,
                    cursor: "pointer",
                    fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
                  }}
                >
                  Șterge
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary, #9CA3AF)" }}>
                  Trage fișierul aici sau{" "}
                  <span style={{ color: "var(--accent, #F97316)" }}>
                    selectează
                  </span>
                </div>
                <div
                  style={{ fontSize: 11, color: "#4B5563", marginTop: 4 }}
                >
                  PDF, AI, PNG, JPG, SVG — max 5MB
                </div>
              </div>
            )}
          </div>
          {fileError && (
            <span style={{ fontSize: 11, color: "#EF4444", marginTop: 4, display: "block" }}>
              {fileError}
            </span>
          )}
        </div>

        {/* Submit */}
        {apiError && (
          <div
            style={{
              background: "rgba(239,68,68,.08)",
              border: "1px solid rgba(239,68,68,.3)",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 13,
              color: "#EF4444",
            }}
          >
            {apiError}
          </div>
        )}
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !isFormValid}
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: 16,
            padding: "15px 24px",
            opacity: loading || !isFormValid ? 0.75 : 1,
            cursor: loading ? "wait" : !isFormValid ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(255,255,255,.3)",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin .7s linear infinite",
                }}
              />
              Se trimite...
            </>
          ) : (
            "Trimite cererea →"
          )}
        </button>

        <p
          style={{ fontSize: 11, color: "#6B7280", textAlign: "center" }}
        >
          Prin trimitere accepți{" "}
          <a href="/termeni-si-conditii" style={{ color: "var(--accent, #F97316)", textDecoration: "none" }}>
            Termenii și condițiile
          </a>
        </p>
      </form>
    </div>
  );
}
