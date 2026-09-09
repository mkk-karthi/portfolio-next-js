import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karthikeyan M — Senior Full Stack Developer Portfolio",
    short_name: "Karthikeyan M",
    description: "Portfolio of Karthikeyan M, Senior Full Stack Engineer & Freelancer",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1120",
    theme_color: "#0b1120",
    icons: [
      {
        src: "/android-chrome-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
    ],
  };
}
