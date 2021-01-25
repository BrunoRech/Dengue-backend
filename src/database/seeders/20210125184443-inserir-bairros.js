module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('bairros', [
      {
        nome: 'Bairro 1',
        municipioId: 1,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('bairros', null, {});
  },
};
