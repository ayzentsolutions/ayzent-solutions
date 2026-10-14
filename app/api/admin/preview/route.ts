import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { canEditCollection, isCmsCollection, validateCmsData } from "@/lib/cms";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin";
import { csrfValid } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const previewableCollections = new Set([
  "siteSettings", "heroSlides", "pageSections", "pageContent", "navigation", "homeSections", "process", "aboutContent",
  "services", "projects", "products", "posts", "categories", "tags", "jobs", "team", "testimonials", "clientLogos", "faqs",
  "announcements", "socialLinks",
]);

function cleanData(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([key, item]) =>
      !key.startsWith("$") &&
      key !== "_id" &&
      (item === null || ["string", "number", "boolean"].includes(typeof item) || (Array.isArray(item) && item.every((entry) => typeof entry === "string")))
  );
  return Object.fromEntries(entries);
}

function previewPath(collection: string, data: Record<string, unknown>) {
  const pageKey = typeof data.pageKey === "string" ? data.pageKey : "";
  const slug = typeof data.slug === "string" ? data.slug.trim() : "";
  if (collection === "pageContent" || collection === "pageSections") {
    return pageKey === "search" ? "/search" : pageKey ? `/${pageKey}` : "/";
  }
  if (collection === "projects" && slug) return `/projects/${encodeURIComponent(slug)}`;
  if (collection === "products" && slug) return `/products/${encodeURIComponent(slug)}`;
  if (collection === "posts" && slug) return `/blog/${encodeURIComponent(slug)}`;
  if (collection === "services" && slug) return `/services/${encodeURIComponent(slug)}`;
  if (collection === "services") return "/services";
  if (collection === "jobs") return "/careers";
  if (collection === "team" || collection === "aboutContent") return "/about";
  if (collection === "socialLinks") return "/contact";
  if (collection === "categories" || collection === "tags" || collection === "comments") return "/blog";
  return "/";
}

export async function POST(request: NextRequest) {
  if (!csrfValid(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();
    const collection = typeof body.collection === "string" ? body.collection : "";
    const id = typeof body.id === "string" ? body.id : undefined;
    if (!isCmsCollection(collection) || !previewableCollections.has(collection) || !canEditCollection(collection, user.role)) {
      return NextResponse.json({ message: "This content cannot be previewed with your account." }, { status: 403 });
    }

    const data = cleanData(body.data);
    if (!data) return NextResponse.json({ message: "Invalid preview data." }, { status: 400 });
    const errors = validateCmsData(collection, data);
    if (errors.length) return NextResponse.json({ message: errors.join(" ") }, { status: 400 });

    const db = await getDb();
    if (id) {
      if (!ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid entry." }, { status: 400 });
      const existing = await db.collection(collection).findOne({ _id: new ObjectId(id) });
      if (!existing) return NextResponse.json({ message: "This entry no longer exists. Reload the CMS and try again." }, { status: 404 });
    }

    await db.collection("cmsPreviews").deleteMany({ expiresAt: { $lte: new Date() } });
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await db.collection("cmsPreviews").insertOne({
      token,
      collection,
      ...(id ? { id } : {}),
      data,
      createdAt: new Date(),
      expiresAt,
      createdBy: user.email,
    });

    const response = NextResponse.json({
      success: true,
      url: previewPath(collection, data),
      expiresAt: expiresAt.toISOString(),
    });
    response.cookies.set("ayzent-cms-preview", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 60,
    });
    return response;
  } catch (error) {
    console.error("CMS preview failed", error);
    return NextResponse.json({ message: "Unable to create a preview. Please save or validate the content and try again." }, { status: 500 });
  }
}
