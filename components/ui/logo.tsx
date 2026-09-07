import Image from "next/image";

import Link from "next/link";

type LogoProps = {
  variant?: "full" | "mark";

  className?: string;

  logo?: string;

  companyName?: string;
};

export function Logo({
  variant = "full",
  className,
  logo,
  companyName = "Ayzent Solutions",
}: LogoProps) {
  const fallbackBlack =
    variant === "full"
      ? "/logo/logo-black.png"
      : "/logo/mark-black.png";

  const fallbackWhite =
    variant === "full"
      ? "/logo/logo-white.png"
      : "/logo/mark-white.png";

  const width =
    variant === "full"
      ? 168
      : 40;

  const height =
    variant === "full"
      ? 40
      : 40;

  /*
  |--------------------------------------------------------------------------
  | CMS LOGO
  |--------------------------------------------------------------------------
  */

  if (logo) {
    return (
      <Link
        href="/"
        aria-label={`${companyName} home`}
        className={className}
      >

        <Image
          src={logo}
          alt={companyName}
          width={width}
          height={height}
          priority
          className="h-10 w-auto object-contain"
          style={{
            width: "auto",
          }}
        />

      </Link>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | DEFAULT LOGO
  |--------------------------------------------------------------------------
  */

  return (
    <Link
      href="/"
      aria-label={`${companyName} home`}
      className={className}
    >

      <Image
        src={fallbackBlack}
        alt={companyName}
        width={width}
        height={height}
        priority
        className="block h-auto dark:hidden"
        style={{
          width:
            variant === "full"
              ? "auto"
              : width,

          height,
        }}
      />

      <Image
        src={fallbackWhite}
        alt={companyName}
        width={width}
        height={height}
        priority
        className="hidden h-auto dark:block"
        style={{
          width:
            variant === "full"
              ? "auto"
              : width,

          height,
        }}
      />

    </Link>
  );
}
