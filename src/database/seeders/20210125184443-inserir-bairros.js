module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('bairros', [
      {
        nome: 'Centro',
        municipioId: 1,
      },
      {
        nome: 'Bela Vista',
        municipioId: 2,
      },
      {
        nome: 'Santa Casa',
        municipioId: 2,
      },
      {
        nome: 'Palmeiras',
        municipioId: 1,
      },
      {
        nome: 'Jabuti',
        municipioId: 2,
      },
      {
        nome: 'Rosas',
        municipioId: 1,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('bairros', null, {});
  },
};
