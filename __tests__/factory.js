const faker = require('faker');

module.exports = {
  agente: {
    nome: faker.name.findName(),
    grupoId: 1,
    senha: faker.internet.password(),
    email: faker.internet.email(),
    telefone: '82828-1111',
    dataNascimento: new Date(),
    dataIngresso: new Date(),
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
