"use client";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

export function Magnetic({ children, className = "", strength = 5 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  function move(event: ReactPointerEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) / Math.max(1, bounds.width / 2);
    const y = (event.clientY - bounds.top - bounds.height / 2) / Math.max(1, bounds.height / 2);
    node.style.transition = "transform 90ms cubic-bezier(.2,.75,.25,1)";
    node.style.transform = `translate3d(${(Math.max(-1, Math.min(1, x)) * strength).toFixed(2)}px,${(Math.max(-1, Math.min(1, y)) * strength).toFixed(2)}px,0)`;
  }
  function reset() {
    if (!ref.current) return;
    ref.current.style.transition = "transform 260ms cubic-bezier(.2,.75,.25,1)";
    ref.current.style.transform = "translate3d(0,0,0)";
  }
  return <span ref={ref} className={`magnetic-cta ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</span>;
}
