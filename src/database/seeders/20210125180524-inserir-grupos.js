module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('grupos', [
      {
        nome: 'Grupo 1',
      },
      {
        nome: 'Grupo 2',
      },
      {
        nome: 'Grupo 3',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('grupos', null, {});
  },
};
