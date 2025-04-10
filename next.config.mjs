// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "i.pinimg.com",
//       "lh3.googleusercontent.com",
//       "s3-media0.fl.yelpcdn.com",
//       "127.0.0.1",
//       "localhost",
//       "media-cdn.tripadvisor.com",
//     ], // Add the domain here
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
      {
        protocol: "http",
        hostname: "**", // Allows images from any domain (including localhost)
      },
    ],
  },
};

export default nextConfig;
