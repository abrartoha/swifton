import Image from "next/image";
import Link from "next/link";

/**
 * Swifton Group logo — uses the actual brand logo image.
 *
 * Two real assets rather than one filtered asset: the "light" variant keeps the
 * four brand-colour figures and paints only the navy wordmark white, so it stays
 * legible on navy backgrounds. Filtering the dark logo with `brightness-0 invert`
 * would flatten the whole mark to a solid white silhouette and lose the colour.
 */
export function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <Image
        src={variant === "light" ? "/images/logo-light.png" : "/images/logo-dark.png"}
        alt="Swifton Group"
        width={180}
        height={48}
        priority
      />
    </Link>
  );
}
