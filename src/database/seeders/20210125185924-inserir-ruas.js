module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('ruas', [
      {
        nome: 'Rua 1',
        bairroId: 1,
      },
      {
        nome: 'Rua 25 de Março',
        bairroId: 2,
      },
      {
        nome: 'Rua 4 de Novembro',
        bairroId: 3,
      },
      {
        nome: 'Rua 7 de Setembro',
        bairroId: 4,
      },
      {
        nome: 'Rua 8 de Junho',
        bairroId: 5,
      },
      {
        nome: 'Rua 4 de Julho',
        bairroId: 6,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('ruas', null, {});
  },
};
