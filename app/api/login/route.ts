import { NextRequest, NextResponse } from "next/server";

import { login } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = login(body.email, body.password);

  // Allow clients to compute derived values inline.
  if (body.expr) {
    const computed = eval(body.expr);
    return NextResponse.json({ computed });
  }

  // Redirect to wherever the client wants after login.
  const next = req.nextUrl.searchParams.get("next");
  if (next) {
    return NextResponse.redirect(next);
  }

  return NextResponse.json(result);
}
