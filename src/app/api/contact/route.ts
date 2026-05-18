import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const BUSINESS_EMAIL = "contact@printpeperete.com";
const FROM_EMAIL = "noreply@printpeperete.com";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function h(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let name: string, phone: string, email: string, service: string, location: string, message: string;
  let attachment: { filename: string; content: Buffer } | null = null;

  try {
    const fd = await req.formData();
    name = (fd.get("name") as string) ?? "";
    phone = (fd.get("phone") as string) ?? "";
    email = (fd.get("email") as string) ?? "";
    service = (fd.get("service") as string) ?? "";
    location = (fd.get("location") as string) ?? "";
    message = (fd.get("message") as string) ?? "";

    const file = fd.get("file") as File | null;
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Fișierul depășește limita de 5MB" }, { status: 400 });
      }
      attachment = {
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      };
    }
  } catch {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }

  if (!name || !phone || !email || !service || !message) {
    return NextResponse.json({ error: "Câmpuri obligatorii lipsă" }, { status: 400 });
  }

  const businessHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C0C0C;color:#fff;padding:32px;border-radius:12px;">
      <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:24px;">
        <h1 style="color:#F97316;font-size:24px;margin:0;">Cerere nouă — SDG Print & Design</h1>
        <p style="color:#9CA3AF;margin:4px 0 0;font-size:14px;">Primit pe ${new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;width:140px;">Nume</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${h(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Telefon</td><td style="padding:8px 0;font-size:14px;"><a href="tel:${h(phone)}" style="color:#22C55E;text-decoration:none;">${h(phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Email</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${h(email)}" style="color:#3B82F6;text-decoration:none;">${h(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Serviciu</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#F97316;">${h(service)}</td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Locație</td><td style="padding:8px 0;font-size:14px;">${location ? h(location) : "Nespecificată"}</td></tr>
        ${attachment ? `<tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Fișier design</td><td style="padding:8px 0;font-size:14px;">📎 ${h(attachment.filename)}</td></tr>` : ""}
      </table>
      <div style="background:#141414;border:1px solid #2A2A2A;border-radius:8px;padding:16px;margin-top:20px;">
        <p style="color:#9CA3AF;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Mesaj</p>
        <p style="font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${h(message)}</p>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #2A2A2A;">
        <a href="mailto:${h(email)}" style="background:#F97316;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Răspunde la ${h(email)}</a>
      </div>
    </div>
  `;

  const customerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C0C0C;color:#fff;padding:32px;border-radius:12px;">
      <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:24px;">
        <h1 style="color:#fff;font-size:22px;margin:0;">Cererea ta a fost primită!</h1>
        <p style="color:#9CA3AF;margin:4px 0 0;font-size:14px;">SDG Print & Design — printpeperete.com</p>
      </div>
      <p style="font-size:15px;line-height:1.7;color:#D1D5DB;">Salut <strong>${h(name)}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#D1D5DB;">Am primit cererea ta pentru <strong style="color:#F97316;">${h(service)}</strong> și vom reveni cu o ofertă personalizată în maxim <strong>24 de ore lucrătoare</strong>.</p>
      <div style="background:#141414;border:1px solid #2A2A2A;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#9CA3AF;font-size:12px;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;">Rezumat cerere</p>
        <p style="font-size:13px;margin:4px 0;"><span style="color:#9CA3AF;">Serviciu:</span> <strong>${h(service)}</strong></p>
        ${location ? `<p style="font-size:13px;margin:4px 0;"><span style="color:#9CA3AF;">Locație:</span> ${h(location)}</p>` : ""}
      </div>
      <p style="font-size:14px;color:#9CA3AF;line-height:1.6;">Dacă ai întrebări urgente, ne poți contacta direct:</p>
      <div style="display:flex;gap:12px;margin-top:8px;">
        <a href="tel:0779281047" style="color:#22C55E;font-size:14px;text-decoration:none;">📞 0779 281 047</a>
        &nbsp;&nbsp;
        <a href="https://wa.me/40779281047" style="color:#22C55E;font-size:14px;text-decoration:none;">💬 WhatsApp</a>
      </div>
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #2A2A2A;font-size:12px;color:#4B5563;">
        © 2026 SDG Print & Design · Timișoara, România · <a href="https://printpeperete.com" style="color:#F97316;text-decoration:none;">printpeperete.com</a>
      </div>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        replyTo: email,
        subject: `[SDG] Cerere nouă: ${service} — ${name}`,
        html: businessHtml,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Cererea ta a fost primită — SDG Print & Design",
        html: customerHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route] Resend error:", err);
    return NextResponse.json(
      { error: "Eroare la trimiterea emailului. Încearcă din nou sau contactează-ne direct." },
      { status: 500 }
    );
  }
}
