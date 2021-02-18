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
        cpf: '353.165.260-58',
        dataNascimento: new Date(),
        dataIngresso: new Date(),
      },
      {
        nome: 'Agente Bruno',
        senha: await bcrypt.hash('123', 8),
        cpf: '085.676.920-75',
        email: 'emailabs@email.com',
        telefone: '99999-2222',
        dataNascimento: '1984-02-16T00:00:00.000Z',
        dataIngresso: '2021-02-16T00:00:00.000Z',
        grupoId: 1,
      },
      {
        nome: 'Agente 2',
        senha: await bcrypt.hash('123', 8),
        cpf: '630.893.740-13',
        email: 'email65@email.com',
        telefone: '828281-82828',
        dataNascimento: '2021-02-10T13:40:26.000Z',
        dataIngresso: '2021-01-09T18:56:59.000Z',
        grupoId: 2,
      },
      {
        nome: 'Agente 3',
        grupoId: 3,
        senha: await bcrypt.hash('123', 8),
        cpf: '131.313.131-31',
        email: 'emailk5@email.com.br',
        telefone: '13113-7776',
        dataNascimento: '2021-02-15T00:00:00.000Z',
        dataIngresso: '2021-02-27T00:00:00.000Z',
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('agentes', null, {});
  },
};
