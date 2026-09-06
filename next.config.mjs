/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: [
      "image/avif",
      "image/webp",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname:
          "images.unsplash.com",
      },
    ],

    deviceSizes: [
      320,
      420,
      640,
      768,
      1024,
      1280,
      1536,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  compress: true,

  poweredByHeader: false,
};

export default nextConfig;
