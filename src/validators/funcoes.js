module.exports = {
  optional: {
    options: (value, { req }) => req.method === 'GET',
  },
};
