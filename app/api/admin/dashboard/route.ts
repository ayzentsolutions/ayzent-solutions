import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getDb } from "@/lib/mongodb";
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const db = await getDb();
    const [projects, posts, services, team, testimonials, newInquiries] = await Promise.all([
      db.collection("projects").countDocuments(), db.collection("posts").countDocuments(), db.collection("services").countDocuments(),
      db.collection("team").countDocuments(), db.collection("testimonials").countDocuments(), db.collection("inquiries").countDocuments({ status: "New" }),
    ]);
    const [recentInquiries, activities] = await Promise.all([
      db.collection("inquiries").find().sort({ createdAt: -1 }).limit(5).toArray(), db.collection("activityLogs").find().sort({ createdAt: -1 }).limit(8).toArray(),
    ]);
    return NextResponse.json({ counts: { projects, posts, services, team, testimonials, newInquiries }, recentInquiries, activities });
  } catch (error) { console.error("Dashboard failed", error); return NextResponse.json({ message: "Unable to load dashboard." }, { status: 500 }); }
}
