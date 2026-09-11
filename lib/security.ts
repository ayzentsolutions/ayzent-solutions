import { createHash, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

const state = new Map<string, { count: number; reset: number }>();

export function clientIp(request: NextRequest | Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Best-effort in-memory limiter. Use a shared store (Upstash/Redis) when horizontally scaling. */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = state.get(key);
  if (!current || current.reset <= now) {
    state.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  current.count += 1;
  return { allowed: current.count <= limit, retryAfter: Math.ceil((current.reset - now) / 1000) };
}

export function rateLimitedResponse(retryAfter: number) {
  return Response.json({ message: "Too many requests. Please try again later." }, { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfter)) } });
}

export function csrfValid(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  try { return new URL(origin).origin === request.nextUrl.origin; } catch { return false; }
}

export function requestFingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a); const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
