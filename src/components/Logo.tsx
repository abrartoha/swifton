import Image from "next/image";
import Link from "next/link";

/**
 * Swifton Group logo — uses the actual brand logo image.
 */
export function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <Image
        src="/images/logo-dark.png"
        alt="Swifton Group"
        width={180}
        height={48}
        priority
        className={variant === "light" ? "brightness-0 invert" : ""}
      />
    </Link>
  );
}
