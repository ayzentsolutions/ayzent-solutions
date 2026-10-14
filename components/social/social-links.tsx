"use client";
import { useEffect, useState } from "react";
type SocialLink = { label: string; url: string };
export function SocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/api/social-links", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load social links.");
        return data;
      })
      .then((data) => {
        if (active && Array.isArray(data.links)) {
          setLinks(data.links.filter((item: unknown): item is SocialLink => Boolean(item) && typeof item === "object" && typeof (item as SocialLink).label === "string" && typeof (item as SocialLink).url === "string"));
        }
      })
      .catch(() => { if (active) setLinks([]); });
    return () => { active = false; };
  }, []);
  if (!links.length) return null;
  return <div className="flex flex-wrap gap-4 pt-2">{links.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="break-words text-sm text-muted transition-colors hover:text-gold">{social.label}</a>)}</div>;
}
