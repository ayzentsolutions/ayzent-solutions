"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PublicSiteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingRoute = pathname === "/" || pathname === "/contact";

  if (pathname.startsWith("/admin") || isStandaloneLandingRoute) return null;
  return children;
}
