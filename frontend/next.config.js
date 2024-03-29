/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.ulta.com",
        port: "",
        pathname: "/i/ulta/**",
      },
      {
        protocol: "https",
        hostname: "foodinnetwork.websites.co.in",
        port: "",
        pathname: "/touche/img/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
