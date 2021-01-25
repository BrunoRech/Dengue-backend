module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('avaliacoes', [
      {
        ruaId: 1,
        agenteId: 1,
        morador: 'Morador X',
        focos: 50,
        horario: '13:45',
        numero: 10,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('avaliacoes', null, {});
  },
};
