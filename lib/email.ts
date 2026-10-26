export async function notifyInquiry(inquiry: { name: string; email: string; service: string; description: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  // Email notification is optional. The inquiry itself is saved separately.
  if (!apiKey || !to) return;
  if (!from) throw new Error("RESEND_FROM_EMAIL is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New inquiry from ${inquiry.name}`,
      text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nService: ${inquiry.service}\n\n${inquiry.description}`,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    // Log status only. Provider response bodies may contain account details.
    throw new Error(`Inquiry email provider returned HTTP ${response.status}`);
  }
}
