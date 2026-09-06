"use client";
import { useEffect, useState } from "react";
type Link = { label: string; url: string };
const fallback: Link[] = [{ label: "LinkedIn", url: "https://www.linkedin.com" }, { label: "Instagram", url: "https://www.instagram.com" }, { label: "X", url: "https://twitter.com" }];
export function SocialLinks() { const [links, setLinks] = useState<Link[]>(fallback); useEffect(() => { fetch("/api/social-links").then((response) => response.json()).then((data) => { if (data.links?.length) setLinks(data.links); }).catch(() => undefined); }, []); return <div className="flex gap-4 pt-2">{links.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-gold">{social.label}</a>)}</div>; }
