import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServices } from "@/lib/content";
import { inquiryBudgetOptions } from "@/lib/site-data";
import { cleanText, validEmail } from "@/lib/validation";
import { notifyInquiry } from "@/lib/email";
import { clientIp, rateLimit, rateLimitedResponse } from "@/lib/security";

const genericSuccess = "Thank you—your inquiry is with our team. We’ll be in touch shortly.";

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`inquiry:${clientIp(request)}`, 5, 60 * 60 * 1000);
    if (!limited.allowed) return rateLimitedResponse(limited.retryAfter);

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ message: "Please submit the form with valid details." }, { status: 400 });
    }

    const values = body as Record<string, unknown>;
    // Honeypot: respond normally to automated submissions without storing them.
    if (cleanText(values.website, 200)) {
      return NextResponse.json({ message: genericSuccess }, { status: 201 });
    }

    const inquiry = {
      name: cleanText(values.name, 100),
      email: cleanText(values.email, 254).toLowerCase(),
      phone: cleanText(values.phone, 40),
      company: cleanText(values.company, 120),
      service: cleanText(values.service, 120),
      budget: cleanText(values.budget, 40),
      description: cleanText(values.description, 4000),
    };

    const [services] = await Promise.all([getServices()]);
    const allowedServices = new Set([...services.map((service) => service.title), "Not sure yet"]);
    const allowedBudgets = new Set<string>(inquiryBudgetOptions);

    if (
      !inquiry.name ||
      !validEmail(inquiry.email) ||
      !inquiry.description ||
      !allowedServices.has(inquiry.service) ||
      !allowedBudgets.has(inquiry.budget)
    ) {
      return NextResponse.json({ message: "Please complete the required fields with valid details." }, { status: 400 });
    }

    const collection = (await getDb()).collection("inquiries");
    const recentDuplicate = await collection.findOne({
      email: inquiry.email,
      description: inquiry.description,
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
    });
    if (recentDuplicate) {
      return NextResponse.json({ message: "We already received this inquiry. We’ll be in touch shortly." });
    }

    await collection.insertOne({
      ...inquiry,
      status: "New",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    void notifyInquiry(inquiry).catch((error) => {
      console.error("Inquiry notification failed", error);
    });

    return NextResponse.json({ message: genericSuccess }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json(
      { message: "We couldn’t send your inquiry. Please try again or use the contact options shown on this site." },
      { status: 500 },
    );
  }
}
