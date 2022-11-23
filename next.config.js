/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'i.seadn.io',
      'sigmate-user.s3.ap-northeast-2.amazonaws.com',
    ],
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
