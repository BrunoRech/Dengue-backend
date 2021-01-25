module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('ruas', [
      {
        nome: 'Rua 1',
        bairroId: 1,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('ruas', null, {});
  },
};
