import { NextResponse, type NextRequest } from "next/server";

// Route handlers verify the signed, expiring session. This proxy only keeps
// unauthenticated browser navigation away from the admin shell.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (request.cookies.get("ayzent_admin")?.value) return NextResponse.next();
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/admin/:path*"] };
