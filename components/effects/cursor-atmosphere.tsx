"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function CursorAtmosphere() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (!root || pathname.startsWith("/admin") || reduceMotion.matches || coarsePointer.matches || window.innerWidth < 768) return;

    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    let activeMagnet: HTMLElement | null = null;

    const applyPointerPosition = () => {
      frame = 0;
      root.style.setProperty("--cursor-x", `${lastX}px`);
      root.style.setProperty("--cursor-y", `${lastY}px`);
      root.classList.add("is-active");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(applyPointerPosition);

      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".magnetic-cta, [data-magnetic='true'], a[class*='bg-accent'], button[class*='bg-accent']") : null;
      if (target && !target.matches(":disabled") && !target.closest("[data-no-magnetic]")) {
        if (activeMagnet && activeMagnet !== target) activeMagnet.style.removeProperty("--magnetic-x");
        if (activeMagnet && activeMagnet !== target) activeMagnet.style.removeProperty("--magnetic-y");
        activeMagnet = target;
        const rect = target.getBoundingClientRect();
        const strength = target.dataset.magnetic === "strong" ? 0.18 : 0.1;
        target.style.setProperty("--magnetic-x", `${((event.clientX - rect.left - rect.width / 2) * strength).toFixed(1)}px`);
        target.style.setProperty("--magnetic-y", `${((event.clientY - rect.top - rect.height / 2) * strength).toFixed(1)}px`);
      } else if (activeMagnet) {
        activeMagnet.style.removeProperty("--magnetic-x");
        activeMagnet.style.removeProperty("--magnetic-y");
        activeMagnet = null;
      }

      document.querySelectorAll<HTMLElement>(".fx-parallax, .fx-parallax-strong").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) return;
        const amount = element.classList.contains("fx-parallax-strong") ? 8 : 3;
        const x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * amount;
        const y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * amount;
        element.style.setProperty("--fx-parallax-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--fx-parallax-y", `${y.toFixed(2)}px`);
        element.style.setProperty("--fx-parallax-strong-x", `${(x * 2).toFixed(2)}px`);
        element.style.setProperty("--fx-parallax-strong-y", `${(y * 2).toFixed(2)}px`);
      });
    };

    const resetPointerEffects = () => {
      root.classList.remove("is-active");
      if (activeMagnet) {
        activeMagnet.style.removeProperty("--magnetic-x");
        activeMagnet.style.removeProperty("--magnetic-y");
        activeMagnet = null;
      }
      document.querySelectorAll<HTMLElement>(".fx-parallax, .fx-parallax-strong").forEach((element) => {
        element.style.removeProperty("--fx-parallax-x");
        element.style.removeProperty("--fx-parallax-y");
        element.style.removeProperty("--fx-parallax-strong-x");
        element.style.removeProperty("--fx-parallax-strong-y");
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden) resetPointerEffects();
    };
    const onMotionPreference = () => {
      if (reduceMotion.matches || coarsePointer.matches) resetPointerEffects();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", (event) => {
      if (event.relatedTarget === null) resetPointerEffects();
    }, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotion.addEventListener("change", onMotionPreference);
    coarsePointer.addEventListener("change", onMotionPreference);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", onMotionPreference);
      coarsePointer.removeEventListener("change", onMotionPreference);
      resetPointerEffects();
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;
  return <div ref={rootRef} aria-hidden="true" className="cursor-atmosphere" />;
}
