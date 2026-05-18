import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const BUSINESS_EMAIL = "contact@printpeperete.com";
const FROM_EMAIL = "noreply@printpeperete.com";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: {
    name: string;
    phone: string;
    email: string;
    service: string;
    location: string;
    message: string;
    fileName?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }

  const { name, phone, email, service, location, message, fileName } = body;

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
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;width:140px;">Nume</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Telefon</td><td style="padding:8px 0;font-size:14px;"><a href="tel:${phone}" style="color:#22C55E;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Email</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#3B82F6;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Serviciu</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#F97316;">${service}</td></tr>
        <tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Locație</td><td style="padding:8px 0;font-size:14px;">${location || "Nespecificată"}</td></tr>
        ${fileName ? `<tr><td style="padding:8px 0;color:#9CA3AF;font-size:13px;">Fișier design</td><td style="padding:8px 0;font-size:14px;">${fileName}</td></tr>` : ""}
      </table>
      <div style="background:#141414;border:1px solid #2A2A2A;border-radius:8px;padding:16px;margin-top:20px;">
        <p style="color:#9CA3AF;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Mesaj</p>
        <p style="font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #2A2A2A;">
        <a href="mailto:${email}" style="background:#F97316;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Răspunde la ${email}</a>
      </div>
    </div>
  `;

  const customerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C0C0C;color:#fff;padding:32px;border-radius:12px;">
      <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:24px;">
        <h1 style="color:#fff;font-size:22px;margin:0;">Cererea ta a fost primită!</h1>
        <p style="color:#9CA3AF;margin:4px 0 0;font-size:14px;">SDG Print & Design — printpeperete.com</p>
      </div>
      <p style="font-size:15px;line-height:1.7;color:#D1D5DB;">Salut <strong>${name}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#D1D5DB;">Am primit cererea ta pentru <strong style="color:#F97316;">${service}</strong> și vom reveni cu o ofertă personalizată în maxim <strong>24 de ore lucrătoare</strong>.</p>
      <div style="background:#141414;border:1px solid #2A2A2A;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="color:#9CA3AF;font-size:12px;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;">Rezumat cerere</p>
        <p style="font-size:13px;margin:4px 0;"><span style="color:#9CA3AF;">Serviciu:</span> <strong>${service}</strong></p>
        ${location ? `<p style="font-size:13px;margin:4px 0;"><span style="color:#9CA3AF;">Locație:</span> ${location}</p>` : ""}
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
