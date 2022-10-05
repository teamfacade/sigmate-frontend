/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'i.seadn.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/user/:path',
        destination: '/user',
        permanent: true,
      },
    ];
  },
};
