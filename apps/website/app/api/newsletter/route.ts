import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email().max(320),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  // TODO: forward to your ESP (Resend audiences, ConvertKit, Mailchimp, etc.)
  console.info("[newsletter] subscribe", parsed.data.email);

  return NextResponse.json({ ok: true }, { status: 201 });
}
