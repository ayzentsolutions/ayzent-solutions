import {
  Container,
} from "@/components/ui/container";

import {
  PageHero,
} from "@/components/sections/page-hero";

import {
  ContactForm,
} from "@/components/forms/contact-form";

import {
  SocialLinks,
} from "@/components/social/social-links";

import {
  getSiteSettings,
} from "@/lib/content";

export const dynamic =
  "force-dynamic";

export default async function ContactPage() {
  const settings =
    await getSiteSettings();

  const whatsappLink =
    settings.whatsapp
      ? `https://wa.me/${settings.whatsapp.replace(
          /\D/g,
          ""
        )}`
      : undefined;

  return (
    <>
      <PageHero
        eyebrow={
          settings.contactEyebrow ||
          "Contact"
        }
        title={
          settings.contactTitle ||
          "Tell us what you’re working towards."
        }
        text={
          settings.contactText ||
          ""
        }
      />

      <section className="py-16 sm:py-24">

        <Container className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">

          <aside className="space-y-7 text-sm">

            {settings.email && (

              <div>

                <p className="text-muted">
                  Email
                </p>

                <a
                  className="mt-1 block hover:text-gold"
                  href={`mailto:${settings.email}`}
                >

                  {
                    settings.email
                  }

                </a>

              </div>

            )}

            {whatsappLink && (

              <div>

                <p className="text-muted">
                  WhatsApp
                </p>

                <a
                  className="mt-1 block hover:text-gold"
                  target="_blank"
                  rel="noreferrer"
                  href={
                    whatsappLink
                  }
                >
                  Chat on WhatsApp
                </a>

              </div>

            )}

            {settings.phone && (

              <div>

                <p className="text-muted">
                  Phone
                </p>

                <a
                  className="mt-1 block hover:text-gold"
                  href={`tel:${settings.phone}`}
                >

                  {
                    settings.phone
                  }

                </a>

              </div>

            )}

            {settings.location && (

              <div>

                <p className="text-muted">
                  Working from
                </p>

                <p className="mt-1">

                  {
                    settings.location
                  }

                </p>

              </div>

            )}

            <SocialLinks />

          </aside>

          <ContactForm />

        </Container>

      </section>
    </>
  );
}
