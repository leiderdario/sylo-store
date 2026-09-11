import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  topic: z.enum([
    "Prep Center — Request a Quote",
    "Shop / Product Question",
    "Wholesale / Collaboration",
    "Other",
  ]),
  message: z.string().min(6),
  units: z.string().optional(),
  servicesNeeded: z.array(z.string()).optional(),
});


// Ventana simple de rate-limit en memoria (por IP) para frenar spam básico
// de bots sin necesitar un servicio externo. Se resetea si la instancia se
// reinicia — para producción a escala, mover a Upstash/Redis.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Probá de nuevo en un minuto." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, phone, topic, message } = parsed.data;

  // --- Entrega real: conectá tu proveedor acá -----------------------------
  // Ejemplo con Resend (npm i resend), usando RESEND_API_KEY en .env.local:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Sylo <contacto@tudominio.com>",
  //     to: "ventas@tudominio.com",
  //     replyTo: email,
  //     subject: `[Sylo] ${topic} — ${name}`,
  //     text: `${message}\n\nTel: ${phone || "—"}\nEmail: ${email}`,
  //   });
  //
  // Mientras no haya credenciales configuradas, dejamos constancia en el
  // log del servidor para no perder el lead durante el desarrollo.
  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] nuevo mensaje (sin proveedor de email configurado):", {
      name,
      email,
      phone,
      topic,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
