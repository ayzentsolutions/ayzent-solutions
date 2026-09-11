import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const scrypt = promisify(scryptCallback);
const cookieName = "ayzent_admin";
const sessionHours = 8;
export type AdminRole = "SUPER_ADMIN" | "EDITOR";
export type AdminUser = { id: string; email: string; role: AdminRole; name: string };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  return value;
}
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}
export async function verifyPassword(password: string, stored: string) {
  const [salt, savedHash] = stored.split(":");
  if (!salt || !savedHash) return false;
  const candidate = (await scrypt(password, salt, 64)) as Buffer;
  return timingSafeEqual(candidate, Buffer.from(savedHash, "hex"));
}
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
export function createSession(user: AdminUser) {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + sessionHours * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function readSession(value?: string): AdminUser | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  const expected = sign(payload);
  if (!payload || !signature || signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try { const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminUser & { exp: number }; return data.exp > Date.now() ? { id: data.id, email: data.email, role: data.role, name: data.name } : null; } catch { return null; }
}
export function getAdminFromRequest(request: NextRequest) { return readSession(request.cookies.get(cookieName)?.value); }
export function sessionCookie(value: string) { return { name: cookieName, value, options: { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionHours * 60 * 60 } }; }
export function clearSessionCookie() { return { name: cookieName, value: "", options: { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 } }; }
export async function logActivity(user: AdminUser, action: string, detail: string) { await (await getDb()).collection("activityLogs").insertOne({ userId: user.id, userEmail: user.email, action, detail, createdAt: new Date() }); }
export async function requireAdmin(request: NextRequest, allowEditor = true) {
  const session = getAdminFromRequest(request);
  if (!session || !ObjectId.isValid(session.id)) return null;
  const current = await (await getDb()).collection("adminUsers").findOne({ _id: new ObjectId(session.id), disabled: { $ne: true } }, { projection: { email: 1, name: 1, role: 1 } });
  if (!current || (current.role !== "SUPER_ADMIN" && current.role !== "EDITOR")) return null;
  const user: AdminUser = { id: session.id, email: String(current.email), name: String(current.name), role: current.role as AdminRole };
  return !allowEditor && user.role !== "SUPER_ADMIN" ? null : user;
}
