import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        bcrypt: false,
        "node-pre-gyp": false,
      };
    }
    return config;
  },
  // Add any experimental features you need
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};


export default nextConfig;
