import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-ink text-paper dark:bg-paper dark:text-ink hover:bg-gold hover:text-ink dark:hover:bg-gold",
  secondary:
    "border border-line text-foreground hover:border-gold hover:text-gold",
  ghost: "text-foreground hover:text-gold",
} as const;

type Variant = keyof typeof variants;

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide transition-colors duration-200 whitespace-nowrap";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

export function ButtonLink({ className, variant = "primary", href, ...props }: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props} />
  );
}
