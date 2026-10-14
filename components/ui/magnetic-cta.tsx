"use client";

import Link from "next/link";
import { useState, type PointerEvent, type ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string; };
export function MagneticCta({ href, children, className = "" }: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: ((event.clientX - rect.left) / rect.width - .5) * 8, y: ((event.clientY - rect.top) / rect.height - .5) * 6 });
  };
  const reset = () => setOffset({ x: 0, y: 0 });
  const props = { onPointerMove: move, onPointerLeave: reset, style: { transform: `translate3d(${offset.x}px,${offset.y}px,0)` }, className: `magnetic inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide ${className}` };
  return href.startsWith("http") || href.startsWith("mailto:") ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>{children}</a> : <Link href={href} {...props}>{children}</Link>;
}
