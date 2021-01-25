const faker = require('faker');

module.exports = {
  agente: {
    nome: faker.name.findName(),
    grupoId: 1,
    senha: faker.internet.password(),
    email: faker.internet.email(),
    telefone: '82828-1111',
    dataNascimento:
      'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)',
    dataIngresso:
      'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)',
  },
  grupo: {
    nome: faker.name.findName(),
  },
  municipio: {
    nome: faker.name.findName(),
  },
  bairro: {
    nome: faker.name.findName(),
    municipioId: 1,
  },
  rua: {
    nome: faker.name.findName(),
    bairroId: 1,
  },
  coordenador: {
    nome: faker.name.findName(),
    senha: faker.internet.password(),
    email: faker.internet.email(),
    telefone: '99999-2222',
  },
};
