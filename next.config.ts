import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

   images: {
    remotePatterns: [
      {
        // https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
        //  "https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg"
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-products/**',
        // ====/** 
        search: '',
      },
    ],
  },

};

export default nextConfig;
