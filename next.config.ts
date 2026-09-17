import type { NextConfig } from "next";

/**
 * Deploy target is Hostinger shared hosting (Apache, no Node runtime), so the
 * site ships as a fully static export. `trailingSlash` makes every route emit
 * `<route>/index.html`, which Apache serves natively — no rewrite needed for
 * the happy path. `images.unoptimized` is required because the export has no
 * image optimisation server.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Add the CMS/asset host here once project photography is served remotely.
    remotePatterns: [],
  },
};

export default nextConfig;
