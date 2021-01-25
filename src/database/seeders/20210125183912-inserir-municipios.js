module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('municipios', [
      {
        nome: 'Município 1',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('municipios', null, {});
  },
};
