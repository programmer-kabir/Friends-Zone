/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // শুধুমাত্র i.ibb.co allow করবে
        pathname: "/**",       // সব path allow
      },
    ],
  },
};

export default nextConfig;
