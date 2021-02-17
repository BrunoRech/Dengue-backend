module.exports = {
  optional: {
    options: (value, { req }) => req.method === 'GET',
  },
  validacaoData: {
    options: async value => {
      const data = new Date(value);
      if (Number.isNaN(data.getTime())) {
        throw new Error('Data Inválida');
      }
      return true;
    },
  },
};
