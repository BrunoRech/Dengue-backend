const { factory } = require('factory-girl');
const faker = require('faker');
const Agente = require('../src/models/Agente');
const Grupo = require('../src/models/Grupo');

factory.define('Agente', Agente, {
  nome: faker.name.findName(),
  grupoId: 1,
  senha: faker.internet.password(),
  email: faker.internet.email(),
  telefone: '82828-1111',
  dataNascimento:
    'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)',
  dataIngresso:
    'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)',
});

factory.define('Grupo', Grupo, {
  nome: faker.name.findName(),
});

module.exports = factory;
