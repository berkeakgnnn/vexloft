import { SITE_EMAIL } from "@/lib/site";

// Contact form → email via Resend's REST API. The old form posted to the
// panel backend over plain http, which browsers block on an https page.

const SERVICE_LABELS: Record<string, string> = {
  web: "Web Platformu",
  mobil: "Mobil Uygulama",
  crm: "CRM",
  eticaret: "E-Ticaret",
  diger: "Diğer",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  company: string; // honeypot — real visitors never see or fill it
}

function asText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parsePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const payload: ContactPayload = {
    name: asText(b.name, 100),
    email: asText(b.email, 200),
    phone: asText(b.phone, 30),
    serviceType: asText(b.serviceType, 20),
    message: asText(b.message, 5000),
    company: asText(b.company, 200),
  };
  if (!payload.name || !payload.message) return null;
  if (!EMAIL_PATTERN.test(payload.email)) return null;
  if (!(payload.serviceType in SERVICE_LABELS)) return null;
  return payload;
}

function json(
  body: Record<string, string | boolean>,
  status: number,
): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const payload = parsePayload(raw);
  if (!payload) {
    return json(
      { error: "Lütfen ad, geçerli bir e-posta, proje türü ve mesaj girin." },
      400,
    );
  }

  // Bot filled the hidden field: pretend success, send nothing.
  if (payload.company) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      {
        error: `Form şu an mesaj gönderemiyor. Lütfen ${SITE_EMAIL} adresine yazın.`,
      },
      503,
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Vexloft Form <onboarding@resend.dev>";
  const service = SERVICE_LABELS[payload.serviceType];

  // Plain text only: visitor input never ends up as HTML in the inbox.
  const text = [
    `Ad soyad: ${payload.name}`,
    `E-posta: ${payload.email}`,
    `Telefon: ${payload.phone || "-"}`,
    `Proje türü: ${service}`,
    "",
    payload.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Yeni proje talebi: ${service} — ${payload.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error(
      "Resend send failed",
      res.status,
      await res.text().catch(() => ""),
    );
    return json(
      { error: `Mesaj gönderilemedi. Lütfen ${SITE_EMAIL} adresine yazın.` },
      502,
    );
  }

  return json({ ok: true }, 200);
}
