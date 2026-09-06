import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin";
export async function POST(_request: NextRequest) { const response = NextResponse.json({ ok: true }); const cookie = clearSessionCookie(); response.cookies.set(cookie.name, cookie.value, cookie.options); return response; }
