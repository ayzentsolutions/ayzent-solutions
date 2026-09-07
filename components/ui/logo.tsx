
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  logo?: string;
  companyName?: string;
  className?: string;
  imageClassName?: string;
};

export function Logo({
  logo,
  companyName = "Ayzent Solutions",
  className = "",
  imageClassName = "",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label={`${companyName} home`}
    >
      {logo ? (
        <Image
          src={logo}
          alt={companyName}
          width={180}
          height={56}
          priority
          className={`h-10 w-auto object-contain ${imageClassName}`}
        />
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            {companyName}
          </span>
        </div>
      )}
    </Link>
  );
}

