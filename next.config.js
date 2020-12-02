module.exports = {
  async redirects() {
    return [
      {
        source: "/albus-sample/manage/:slug",
        destination: "/albus-sample",
        permanent: false,
      },
      {
        source: "/albus-sample/:slug",
        destination: "/albus-sample",
        permanent: false,
      },
    ];
  },
};
