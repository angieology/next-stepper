module.exports = {
  async redirects() {
    return [
      {
        source: "/albus/nested/:slug",
        destination: "/albus",
        permanent: false,
      },
      {
        source: "/albus/:slug",
        destination: "/albus",
        permanent: false,
      },
      {
        source: "/albus-polyfill/nested/:slug",
        destination: "/albus-polyfill",
        permanent: false,
      },
      {
        source: "/albus-polyfill/:slug",
        destination: "/albus-polyfill",
        permanent: false,
      },
    ];
  },
};
