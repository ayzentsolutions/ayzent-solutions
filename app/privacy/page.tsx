import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Ayzent Solutions handles information submitted through website forms.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="bg-[#080D18] py-14 text-[#E2E8F0] sm:py-20 lg:py-28">
      <Container className="max-w-3xl">
        <p className="text-sm font-medium text-[#8AA8FF]">Website information</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Privacy notice</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#B0BBD0]">
          This notice explains how information submitted through the Ayzent Solutions website is used.
          It is an operational summary, not a statement of legal certification or compliance.
        </p>

        <div className="mt-10 space-y-8 border-t border-[#27344A] pt-8 text-sm leading-7 text-[#B0BBD0]">
          <section>
            <h2 className="font-display text-2xl text-[#E2E8F0]">Information you submit</h2>
            <p className="mt-3">
              The contact form may collect your name, email address, phone number, company name,
              service preference, budget preference and project description. The newsletter form
              collects your email address.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-[#E2E8F0]">How it is used</h2>
            <p className="mt-3">
              Contact details are used to review and respond to your inquiry and manage follow-up.
              Newsletter addresses are stored to manage subscriptions and send requested updates.
              Please do not submit passwords, payment details or other information that is not needed
              for your request.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-[#E2E8F0]">Storage and service providers</h2>
            <p className="mt-3">
              Form submissions are stored in the website application database. When inquiry email
              notifications are configured, inquiry details may also be sent to the configured email
              delivery provider. Hosting and operational providers may process information as needed
              to deliver the website and its features.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-[#E2E8F0]">Retention and requests</h2>
            <p className="mt-3">
              Information may be retained while it is needed to handle a request, maintain business
              records or operate a subscription. To ask about a submission or request its correction
              or deletion, contact us through the <Link className="underline underline-offset-4 hover:text-white" href="/contact">contact page</Link>.
              A request may need enough detail to identify the relevant record.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-[#E2E8F0]">Updates to this notice</h2>
            <p className="mt-3">
              This page may be updated when the website&apos;s data handling changes. For a question about
              this notice, use the contact page.
            </p>
          </section>
        </div>

        <p className="mt-10 border-t border-[#27344A] pt-5 text-xs leading-6 text-[#94A3B8]">
          This summary does not replace a review of the company&apos;s applicable privacy obligations.
        </p>
      </Container>
    </article>
  );
}
