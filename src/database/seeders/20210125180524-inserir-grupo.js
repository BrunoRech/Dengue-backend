module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('grupos', [
      {
        nome: 'Grupo 1',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('grupos', null, {});
  },
};
