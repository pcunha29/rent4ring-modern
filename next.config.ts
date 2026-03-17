import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/en/rentals-for-the-nordschleife.html",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/rentals-for-the-nordschleife",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/dpn.html",
        destination: "/en/permit-package",
        permanent: true,
      },
      {
        source: "/en/dpn",
        destination: "/en/permit-package",
        permanent: true,
      },
      {
        source: "/de/rennwagen-mieten-fuer-nordschleife.html",
        destination: "/de",
        permanent: true,
      },
      {
        source: "/de/rennwagen-mieten-fuer-nordschleife",
        destination: "/de",
        permanent: true,
      },
      {
        source: "/de/dpn.html",
        destination: "/de/permit-package",
        permanent: true,
      },
      {
        source: "/de/dpn",
        destination: "/de/permit-package",
        permanent: true,
      },
      {
        source: "/en/do/orderform",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
