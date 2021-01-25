const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('agentes', [
      {
        nome: 'Agente 1',
        grupoId: 1,
        senha: await bcrypt.hash('123', 8),
        email: 'email@email.com',
        telefone: '99999-2222',
        dataNascimento: new Date(),
        dataIngresso: new Date(),
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('agentes', null, {});
  },
};
