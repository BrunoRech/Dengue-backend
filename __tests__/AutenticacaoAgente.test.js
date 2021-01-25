const request = require('supertest');
const { agente, grupo, coordenador } = require('./factory');
const app = require('../src');

let token = null;
const senhaAgente = '123';
const emailAgente = 'email@email.com';

describe('Autenticação', () => {
  beforeAll(async () => {
    const { body: coordenadorBody } = await request(app)
      .post('/coordenadores')
      .send({ ...coordenador, senha: '123' });
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: coordenadorBody.email,
      });
    token = sessao.token;
    await request(app)
      .post('/agentes')
      .send({ ...agente, senha: senhaAgente, email: emailAgente })
      .set('Authorization', `Bearer ${token}`);
    await request(app)
      .post('/grupos')
      .send(grupo)
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

  it('acesso negado em rotas com autenticação', async () => {
    const response = await request(app).get('/grupos');
    expect(response.status).toBe(401);
  });
});
