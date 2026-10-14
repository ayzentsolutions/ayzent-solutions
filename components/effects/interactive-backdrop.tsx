"use client";
import { useEffect, useRef } from "react";

type Variant = "hero" | "ambient";
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number };

export function InteractiveBackdrop({ variant = "ambient" }: { variant?: Variant }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const section = root?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!root || !canvas || !section || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const count = variant === "hero" ? (coarse ? 16 : 54) : (coarse ? 8 : 24);
    const maxLink = variant === "hero" ? 150 : 112;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.000016, vy: (Math.random() - 0.5) * 0.000016,
      radius: Math.random() * 1.3 + 0.55, alpha: Math.random() * 0.22 + 0.09,
    }));
    let width = 1, height = 1, dpr = 1, raf = 0, lastFrame = 0;
    let running = false, visible = true, pointerActive = false;
    let targetX = 0, targetY = 0, pointerX = 0, pointerY = 0, dxCurrent = 0, dyCurrent = 0;

    function updateStyles() {
      section.style.setProperty("--fx-pointer-x", pointerActive ? `${Math.max(0, Math.min(100, pointerX / width * 100)).toFixed(2)}%` : "50%");
      section.style.setProperty("--fx-pointer-y", pointerActive ? `${Math.max(0, Math.min(100, pointerY / height * 100)).toFixed(2)}%` : "45%");
      const dx = pointerActive ? (pointerX / width - 0.5) * 12 : 0;
      const dy = pointerActive ? (pointerY / height - 0.5) * 12 : 0;
      dxCurrent += (dx - dxCurrent) * 0.12;
      dyCurrent += (dy - dyCurrent) * 0.12;
      section.style.setProperty("--fx-parallax-x", `${dxCurrent.toFixed(2)}px`);
      section.style.setProperty("--fx-parallax-y", `${dyCurrent.toFixed(2)}px`);
      section.style.setProperty("--fx-parallax-strong-x", `${(dxCurrent * 1.65).toFixed(2)}px`);
      section.style.setProperty("--fx-parallax-strong-y", `${(dyCurrent * 1.65).toFixed(2)}px`);
    }

    function paint(delta: number, advance: boolean) {
      ctx.clearRect(0, 0, width, height);
      const points = particles.map(p => {
        if (advance) {
          p.x += p.vx * delta; p.y += p.vy * delta;
          if (p.x < -0.02) p.x = 1.02;
          if (p.x > 1.02) p.x = -0.02;
          if (p.y < -0.02) p.y = 1.02;
          if (p.y > 1.02) p.y = -0.02;
        }
        return { x: p.x * width, y: p.y * height, p };
      });

      if (variant === "hero") {
        for (let i = 0; i < points.length; i += 1) for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i], b = points[j], x = a.x - b.x, y = a.y - b.y;
          const dist = Math.sqrt(x * x + y * y);
          if (dist > maxLink) continue;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(103,146,255,${((1 - dist / maxLink) * 0.105).toFixed(3)})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }
      for (const point of points) {
        ctx.beginPath(); ctx.arc(point.x, point.y, point.p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,207,255,${point.p.alpha.toFixed(3)})`; ctx.fill();
        if (variant === "hero" && point.p.radius > 1.45) {
          ctx.beginPath(); ctx.arc(point.x, point.y, point.p.radius * 3.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(71,123,255,${(point.p.alpha * 0.13).toFixed(3)})`; ctx.fill();
        }
      }
      if (pointerActive && !coarse && !reduced) {
        const glow = ctx.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, variant === "hero" ? 220 : 155);
        glow.addColorStop(0, "rgba(71,123,255,0.055)"); glow.addColorStop(1, "rgba(71,123,255,0)");
        ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      }
    }

    function frame(time: number) {
      if (!running) return;
      if (time - lastFrame >= 1000 / 45) {
        const delta = Math.min(32, lastFrame ? time - lastFrame : 16);
        lastFrame = time;
        pointerX += (targetX - pointerX) * 0.16; pointerY += (targetY - pointerY) * 0.16;
        updateStyles(); paint(delta, true);
      }
      raf = window.requestAnimationFrame(frame);
    }
    function start() {
      if (running || !visible || document.hidden || reduced || coarse) return;
      running = true; raf = window.requestAnimationFrame(frame);
    }
    function stop() {
      running = false; if (raf) window.cancelAnimationFrame(raf); raf = 0;
    }
    function resize() {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      targetX = pointerX = width * 0.5; targetY = pointerY = height * 0.45;
      paint(16, false); start();
    }
    function onPointerMove(event: PointerEvent) {
      if (coarse || reduced || event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      pointerActive = event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;
      targetX = pointerActive ? event.clientX - rect.left : width * 0.5;
      targetY = pointerActive ? event.clientY - rect.top : height * 0.45;
      if (!pointerActive) {
        section.style.setProperty("--fx-pointer-x", "50%");
        section.style.setProperty("--fx-pointer-y", "45%");
      }
    }
    function onVisibility() { if (document.hidden) stop(); else start(); }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { if (reduced || coarse) paint(16, false); else start(); } else stop();
    }, { rootMargin: "80px" });
    intersectionObserver.observe(root);
    if (!coarse && !reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      stop(); resizeObserver.disconnect(); intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const key of ["--fx-pointer-x", "--fx-pointer-y", "--fx-parallax-x", "--fx-parallax-y", "--fx-parallax-strong-x", "--fx-parallax-strong-y"]) section.style.removeProperty(key);
    };
  }, [variant]);

  return <div ref={rootRef} aria-hidden="true" className={`fx-backdrop fx-backdrop--${variant}`}><canvas ref={canvasRef} className="fx-backdrop-canvas" /></div>;
}
