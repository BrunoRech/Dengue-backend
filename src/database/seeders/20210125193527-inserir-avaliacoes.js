module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('avaliacoes', [
      {
        ruaId: 1,
        agenteId: 1,
        morador: 'Morador X',
        focos: 50,
        horario: '13:45',
        dataAvaliacao: new Date(),
        numero: 10,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('avaliacoes', null, {});
  },
};
