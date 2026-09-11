import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export async function GET() { try { await (await getDb()).command({ ping: 1 }); return NextResponse.json({ status: "ok", database: "ready" }, { status: 200 }); } catch { return NextResponse.json({ status: "degraded", database: "unavailable" }, { status: 503 }); } }
