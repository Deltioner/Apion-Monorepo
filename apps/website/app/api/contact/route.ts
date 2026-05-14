import { NextResponse } from "next/server";

import { getDb, schema } from "@repo/db";

import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const locale =
    typeof (payload as { locale?: unknown }).locale === "string"
      ? ((payload as { locale: string }).locale as string)
      : "en";

  try {
    const db = getDb();
    const [row] = await db
      .insert(schema.contactSubmissions)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        message: parsed.data.message,
        locale,
        source: "website",
      })
      .returning({ id: schema.contactSubmissions.id });

    return NextResponse.json({ ok: true, id: row?.id }, { status: 201 });
  } catch (err) {
    console.error("[contact] insert failed", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 },
    );
  }
}
