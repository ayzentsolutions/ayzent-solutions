import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) { if (request.nextUrl.pathname === "/admin/login") return NextResponse.next(); if (request.cookies.get("ayzent_admin")?.value) return NextResponse.next(); const url = new URL("/admin/login", request.url); url.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(url); }
export const config = { matcher: ["/admin/:path*"] };
