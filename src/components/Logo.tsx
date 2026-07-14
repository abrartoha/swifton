import Link from "next/link";

/**
 * Swifton Group wordmark. A simple, elegant monogram "S" inside a ring —
 * the ring signalling the family the group encircles — plus the name.
 */
export function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const nameColor = variant === "light" ? "text-white" : "text-navy-900";
  const subColor = variant === "light" ? "text-navy-200" : "text-navy-500";

  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span
        aria-hidden
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/70"
      >
        <span className="font-serif text-xl font-semibold text-gold-500">
          S
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-lg font-semibold tracking-wide ${nameColor}`}
        >
          Swifton Group
        </span>
        <span
          className={`text-[0.62rem] font-medium uppercase tracking-[0.28em] ${subColor}`}
        >
          Family of Brands
        </span>
      </span>
    </Link>
  );
}
