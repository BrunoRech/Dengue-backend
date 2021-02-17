const request = require('supertest');
const { agente } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /agentes', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app).post('/sessoes/agentes').send({
      senha: '123',
      email: 'email@email.com',
    });
    token = sessao.token;
  });

  it('Deve-se retornar um erro ao logar com um e-mail inválido', async () => {
    const response = await request(app).post('/sessoes/agentes').send({
      senha: '567890',
      email: 'email@email.com',
    });
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro ao logar com uma senha incorreta', async () => {
    const response = await request(app).post('/sessoes/agentes').send({
      senha: '123',
      email: 'emailInvalido123@email.com',
    });
    expect(response.status).toBe(400);
  });

  it('Deve-se cadastrar um novo agente', async () => {
    const response = await request(app)
      .post('/agentes')
      .send(agente)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/agentes')
      .send({ ...agente, nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de agente com avaliações cadastradas', async () => {
    const response = await request(app)
      .delete('/agentes/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de grupo inexistente no cadastro', async () => {
    const response = await request(app)
      .post('/agentes')
      .send({ ...agente, nome: 'Nome teste', grupoId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de grupo inexistente na alteração', async () => {
    const response = await request(app)
      .post('/agentes')
      .send({ ...agente, nome: 'Nome teste', grupoId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/agentes/2')
      .send({ ...agente, nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de agente inexistente na alteração', async () => {
    const response = await request(app)
      .put('/agentes/999')
      .send({ ...agente, nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de email já existente na alteração', async () => {
    const response = await request(app)
      .put('/agentes/2')
      .send({ email: agente.email })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de email já existente no cadastro', async () => {
    const response = await request(app)
      .post('/agentes')
      .send({ ...agente, cpf: 12345678901 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de cpf já existente na alteração', async () => {
    const response = await request(app)
      .put('/agentes/2')
      .send({ cpf: agente.cpf })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de cpf já existente no cadastro', async () => {
    const response = await request(app)
      .post('/agentes')
      .send({ ...agente, email: 'email25@email.com' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de um agente', async () => {
    const response = await request(app)
      .put('/agentes/2')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar a listagem dos agentes', async () => {
    const response = await request(app)
      .get('/agentes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um agente pelo seu id', async () => {
    const response = await request(app)
      .get('/agentes/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um agente pelo seu id', async () => {
    const response = await request(app)
      .delete('/agentes/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /agentes sem autenticação', async () => {
    const response = await request(app).get('/agentes');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /agentes/:id sem autenticação', async () => {
    const response = await request(app).get('/agentes/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /agentes sem autenticação', async () => {
    const response = await request(app).post('/agentes').send(agente);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /agentes/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/agentes/1')
      .send({ ...agente, nome: 'nome novo' });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /agentes/:id sem autenticação', async () => {
    const response = await request(app).delete('/agentes/1');
    expect(response.status).toBe(401);
  });
});
