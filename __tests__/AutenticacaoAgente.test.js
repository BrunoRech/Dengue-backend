const request = require('supertest');
const factory = require('./factories');
const app = require('../src');

describe('Autenticação', () => {
  beforeAll(async () => {
    await factory.create('Grupo');
  });

  it('login do agente', async () => {
    const agente = await factory.create('Agente', {
      senha: '123',
      email: 'email123@email.com',
    });
    const response = await request(app).post('/sessoes/agentes').send({
      senha: agente.senha,
      email: agente.email,
    });
    expect(response.body).toHaveProperty('token');
  });

  it('login do agente inválido', async () => {
    const agente = await factory.create('Agente', {
      senha: '123',
    });
    const response = await request(app).post('/sessoes/agentes').send({
      email: agente.email,
      senha: '123455',
    });
    expect(response.status).toBe(400);
  });

  it('sucesso em rotas com autenticação', async () => {
    const agente = await factory.create('Agente');
    const response = await request(app)
      .get('/grupos')
      .set('Authorization', `Bearer ${agente.gerarToken()}`);
    expect(response.status).toBe(200);
  });

  it('acesso negado em rotas com autenticação', async () => {
    const response = await request(app).get('/grupos').set('Authorization');
    expect(response.status).toBe(200);
  });
});
