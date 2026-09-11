import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cleanText, validEmail } from "@/lib/validation";
import { notifyInquiry } from "@/lib/email";
import { clientIp, rateLimit, rateLimitedResponse } from "@/lib/security";

const allowedServices = ["Website Development", "Digital Marketing", "SEO", "Website & Software Maintenance", "UI/UX Design", "Deployment & Cloud Services"];
const allowedBudgets = ["Under $5,000", "$5,000 – $15,000", "$15,000+"];

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`inquiry:${clientIp(request)}`, 5, 60 * 60 * 1000);
    if (!limited.allowed) return rateLimitedResponse(limited.retryAfter);
    const body = await request.json();
    const inquiry = {
      name: cleanText(body.name, 100), email: cleanText(body.email, 254).toLowerCase(), phone: cleanText(body.phone, 40), company: cleanText(body.company, 120),
      service: cleanText(body.service, 80), budget: cleanText(body.budget, 40), description: cleanText(body.description, 4000),
    };
    if (!inquiry.name || !validEmail(inquiry.email) || !inquiry.description || !allowedServices.includes(inquiry.service) || !allowedBudgets.includes(inquiry.budget)) return NextResponse.json({ message: "Please complete all required fields with valid details." }, { status: 400 });
    const collection = (await getDb()).collection("inquiries");
    const recentDuplicate = await collection.findOne({ email: inquiry.email, description: inquiry.description, createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } });
    if (recentDuplicate) return NextResponse.json({ message: "We already received this inquiry. We’ll be in touch shortly." });
    await collection.insertOne({ ...inquiry, status: "New", createdAt: new Date(), updatedAt: new Date() });
    void notifyInquiry(inquiry).catch((error) => console.error("Inquiry notification failed", error));
    return NextResponse.json({ message: "Thank you—your inquiry is with our team. We’ll be in touch shortly." }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ message: "We couldn’t send your inquiry. Please try again or email us directly." }, { status: 500 });
  }
}
