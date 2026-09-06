export async function notifyInquiry(inquiry: { name: string; email: string; service: string; description: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;
  await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: "Ayzent Website <onboarding@resend.dev>", to: [to], subject: `New inquiry from ${inquiry.name}`, text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nService: ${inquiry.service}\n\n${inquiry.description}` }) });
}
