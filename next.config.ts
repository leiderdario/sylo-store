import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los productos del shop viven en Amazon; el resto de medios (prep center)
    // se sirve desde /lib/media.ts para poder reemplazarlos sin tocar la UI.
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
