const request = require('supertest');
const { agente } = require('../factory');
const app = require('../../src');

let token = null;
const senhaAgente = '123';
const emailAgente = 'agente@email.com';

describe('Autenticação', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
    await request(app)
      .post('/agentes')
      .send({ ...agente, senha: senhaAgente, email: emailAgente })
      .set('Authorization', `Bearer ${token}`);
  });

  it('login do agente', async () => {
    const response = await request(app).post('/sessoes/agentes').send({
      senha: senhaAgente,
      email: emailAgente,
    });
    expect(response.body).toHaveProperty('token');
  });

  it('login do agente inválido', async () => {
    const response = await request(app).post('/sessoes/agentes').send({
      email: emailAgente,
      senha: '123455',
    });
    expect(response.status).toBe(400);
  });

  it('sucesso em rotas com autenticação', async () => {
    const response = await request(app)
      .get('/grupos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
