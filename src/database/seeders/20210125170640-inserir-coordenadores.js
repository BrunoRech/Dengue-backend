const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('coordenadores', [
      {
        nome: 'Coordenador 1',
        senha: await bcrypt.hash('123', 8),
        email: 'email@email.com',
        telefone: '99999-2222',
        cpf: '125.577.459-11',
      },
      {
        nome: 'Coordenador 2',
        senha: await bcrypt.hash('123', 8),
        email: 'coordenador@email.com',
        telefone: '99999-2222',
        cpf: '179.437.620-88',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('coordenadores', null, {});
  },
};
