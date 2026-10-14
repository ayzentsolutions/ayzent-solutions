import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("returnTo");
  const returnTo = requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set("ayzent-cms-preview", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
