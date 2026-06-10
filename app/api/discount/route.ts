import { NextRequest, NextResponse } from "next/server";

import { applyDiscount, formatPrice } from "@/lib/pricing";

// GET /api/discount?price=100&percent=20
export function GET(req: NextRequest) {
  const price = Number(req.nextUrl.searchParams.get("price"));
  const percent = Number(req.nextUrl.searchParams.get("percent"));

  const final = applyDiscount(price, percent);

  return NextResponse.json({
    price,
    percent,
    final,
    formatted: formatPrice(final),
  });
}
