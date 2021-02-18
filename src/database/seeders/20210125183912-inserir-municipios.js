module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('municipios', [
      {
        nome: 'São Miguel do Oeste',
      },
      {
        nome: 'Ibirama',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('municipios', null, {});
  },
};
