"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import type {
  Announcement,
} from "@/lib/content";

export function AnnouncementPopup({
  announcement,
}: {
  announcement?: Announcement;
}) {
  const [
    visible,
    setVisible,
  ] = useState(false);

  useEffect(() => {
    if (!announcement) return;

    const key =
      `ayzent-announcement-${
        announcement._id ||
        announcement.title
      }`;

    if (
      !localStorage.getItem(
        key
      )
    ) {
      setVisible(true);
    }
  }, [announcement]);

  if (
    !announcement ||
    !visible
  ) {
    return null;
  }

  const key =
    `ayzent-announcement-${
      announcement._id ||
      announcement.title
    }`;

  function close() {
    localStorage.setItem(
      key,
      "dismissed"
    );

    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-[60] grid place-items-end bg-ink/40 p-5 sm:place-items-center"
    >

      <section className="relative w-full max-w-md overflow-hidden border border-line bg-background shadow-2xl">

        <button
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-4 top-4 z-10 text-xl text-muted hover:text-gold"
        >
          ×
        </button>

        {announcement.image && (

          <div className="relative aspect-video">

            <Image
              src={
                announcement.image
              }
              alt={
                announcement.title
              }
              fill
              unoptimized
              className="object-cover"
            />

          </div>

        )}

        <div className="p-7">

          <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
            Ayzent update
          </p>

          <h2
            id="announcement-title"
            className="mt-4 max-w-sm font-display text-3xl"
          >
            {
              announcement.title
            }
          </h2>

          <p className="mt-4 leading-relaxed text-muted">
            {
              announcement.content
            }
          </p>

          <div className="mt-7 flex items-center gap-5">

            {announcement.ctaText &&
              announcement.ctaLink && (

                <Link
                  href={
                    announcement.ctaLink
                  }
                  onClick={close}
                  className="text-sm hover:text-gold"
                >
                  {
                    announcement.ctaText
                  } →
                </Link>

              )}

            <button
              onClick={close}
              className="text-sm text-muted hover:text-gold"
            >
              Not now
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}
