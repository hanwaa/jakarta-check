import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kompresi respons gzip/brotli otomatis
  compress: true,

  // Optimasi build & cache
  poweredByHeader: false,

  // Headers untuk security & caching static assets
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Static assets di-cache 1 tahun
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
