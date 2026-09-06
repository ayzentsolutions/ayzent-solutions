import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cleanText, validEmail } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const { email: rawEmail } = await request.json();
    const email = cleanText(rawEmail, 254).toLowerCase();
    if (!validEmail(email)) return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    const subscribers = (await getDb()).collection("newsletterSubscribers");
    const result = await subscribers.updateOne({ email }, { $setOnInsert: { email, status: "active", createdAt: new Date() } }, { upsert: true });
    return NextResponse.json({ message: result.upsertedCount ? "You’re on the list. Thank you." : "You’re already on the list—thank you." });
  } catch (error) {
    console.error("Newsletter subscription failed", error);
    return NextResponse.json({ message: "We couldn’t save your subscription. Please try again." }, { status: 500 });
  }
}
