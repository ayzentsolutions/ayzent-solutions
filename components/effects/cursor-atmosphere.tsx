"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; age: number };

export function CursorAtmosphere() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!root || !canvas || !ctx || pathname.startsWith("/admin") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.25), raf = 0, lastTime = 0;
    let points: TrailPoint[] = [];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function render(time: number) {
      raf = 0;
      if (document.hidden) {
        points = []; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        root.classList.remove("is-active"); return;
      }
      const elapsed = Math.min(48, time - (lastTime || time - 16)); lastTime = time;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points.map(p => ({ ...p, age: p.age + elapsed })).filter(p => p.age < 480);
      for (let i = 1; i < points.length; i += 1) {
        const previous = points[i - 1], point = points[i];
        ctx.beginPath(); ctx.moveTo(previous.x, previous.y); ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(103,146,255,${(Math.max(0, 1 - point.age / 480) * 0.16).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.4, 2.2 * (1 - point.age / 480)); ctx.lineCap = "round"; ctx.stroke();
      }
      for (const point of points) {
        ctx.beginPath(); ctx.arc(point.x, point.y, Math.max(0.4, 2.2 * (1 - point.age / 480)), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145,174,255,${(Math.max(0, 1 - point.age / 480) * 0.28).toFixed(3)})`; ctx.fill();
      }
      if (points.length) raf = window.requestAnimationFrame(render);
      else root.classList.remove("is-active");
    }
    function onPointerMove(event: PointerEvent) {
      points.push({ x: event.clientX, y: event.clientY, age: 0 });
      if (points.length > 14) points.splice(0, points.length - 14);
      root.style.setProperty("--cursor-x", `${(event.clientX / Math.max(1, window.innerWidth) * 100).toFixed(2)}%`);
      root.style.setProperty("--cursor-y", `${(event.clientY / Math.max(1, window.innerHeight) * 100).toFixed(2)}%`);
      root.classList.add("is-active");
      if (!raf) raf = window.requestAnimationFrame(render);
    }
    function onPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) root.classList.remove("is-active");
    }
    function onVisibility() {
      if (!document.hidden && points.length && !raf) raf = window.requestAnimationFrame(render);
      else if (document.hidden) {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0; points = []; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        root.classList.remove("is-active");
      }
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;
  return <div ref={rootRef} aria-hidden="true" className="cursor-atmosphere"><canvas ref={canvasRef} /></div>;
}
