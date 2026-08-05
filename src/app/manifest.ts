import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swifton Group — Family of Brands",
    short_name: "Swifton Group",
    description:
      "A Melbourne-based family of independent Australian brands spanning vehicle rental, hospitality, cleaning, security and mobility.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfcfa",
    theme_color: "#1a2d5a",
    icons: [
      {
        src: "/images/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/logo-square.png",
        sizes: "1080x1080",
        type: "image/png",
      },
    ],
  };
}
