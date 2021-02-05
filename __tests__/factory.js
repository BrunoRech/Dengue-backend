const faker = require('faker');

module.exports = {
  agente: {
    nome: faker.name.findName(),
    grupoId: 1,
    senha: faker.internet.password(),
    email: faker.internet.email(),
    telefone: '82828-1111',
    cpf: 54430578044,
    dataNascimento: new Date(),
    dataIngresso: new Date(),
  },
  avaliacao: {
    ruaId: 1,
    agenteId: 1,
    morador: faker.name.findName(),
    horario: '15:45',
    numero: 10,
    focos: 50,
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
    cpf: 42156351015,
    telefone: '99999-2222',
  },
};
