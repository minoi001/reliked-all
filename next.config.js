/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_DOMAIN: process.env.SHOPIFY_STOREFRONT_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
    SHOPIFY_ADMIN_ACCESSTOKEN: process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
    SHOPIFY_ADMIN_API_VERSION: process.env.SHOPIFY_ADMIN_API_VERSION,
    SHOPIFY_LOCATION_ID: process.env.SHOPIFY_LOCATION_ID,
    SHEETY_URL: process.env.SHEETY_URL,
    SHEETY_BEARER_TOKEN: process.env.SHEETY_BEARER_TOKEN,
    UPLOADCARE_PUBLIC_KEY: process.env.UPLOADCARE_PUBLIC_KEY,
    PRODUCTS_SPREADSHEET_ID: process.env.PRODUCTS_SPREADSHEET_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    RELIKED_API_KEY: process.env.RELIKED_API_KEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ANALYZE: process.env.ANALYZE,
    SWYM_API_KEY: process.env.SWYM_API_KEY,
    SWYM_ENDPOINT: process.env.SWYM_ENDPOINT,
    SWYM_PID: process.env.SWYM_PID,
  },
  images: {
    domains: [
      `cdn.shopify.com`,
      `tailwindui.com`,
      `ucarecdn.com`,
      `images.hardlyeverwornit.com`,
    ],
  },
  async redirects() {
    return [
      {
        source: "/collectionss",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/female-vibs",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/kids-vibs",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/male-vibs",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/brands",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/female-brands",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/mens-brands",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/luxury-brands",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/pages/beauty-brands",
        destination: "/collections",
        permanent: true,
      },
    ];
  },
});
