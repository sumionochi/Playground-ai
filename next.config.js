/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      );
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        },
      );
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
  
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'seo-heist.s3.amazonaws.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'github.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'ansubkhan.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/**',
        },
      ],
    },
};
  
module.exports = nextConfig;