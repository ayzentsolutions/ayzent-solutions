import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function Logo({ variant = "full", className }: LogoProps) {
  const black = variant === "full" ? "/logo/logo-black.png" : "/logo/mark-black.png";
  const white = variant === "full" ? "/logo/logo-white.png" : "/logo/mark-white.png";
  const width = variant === "full" ? 168 : 40;
  const height = variant === "full" ? 40 : 40;

  return (
    <Link href="/" aria-label="Ayzent Solutions home" className={className}>
      <Image
        src={black}
        alt="Ayzent Solutions"
        width={width}
        height={height}
        priority
        className="block h-auto dark:hidden"
        style={{ width: variant === "full" ? "auto" : width, height }}
      />
      <Image
        src={white}
        alt="Ayzent Solutions"
        width={width}
        height={height}
        priority
        className="hidden h-auto dark:block"
        style={{ width: variant === "full" ? "auto" : width, height }}
      />
    </Link>
  );
}
