/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pic.code-nav.cn", "mianshiya.com", "www.mianshiya.com"],
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.2.197:8001/api/:path*",
        // destination: "http://gu01.natapp1.cc/api/:path*",
      },
    ];
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/home" },
    };
  },
};

export default nextConfig;
