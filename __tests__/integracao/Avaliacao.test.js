const request = require('supertest');
const { avaliacao } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /avaliacoes', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app).post('/sessoes/agentes').send({
      senha: '123',
      email: 'email@email.com',
    });
    token = sessao.token;
  });

  it('Deve-se cadastrar uma nova avaliação', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send(avaliacao)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('agenteId');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ ...avaliacao, agenteId: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de rua inexistente no cadastro', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ ...avaliacao, ruaId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de agente inexistente no cadastro', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ ...avaliacao, agenteId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de rua inexistente na alteração', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ ...avaliacao, ruaId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de agente inexistente na alteração', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ ...avaliacao, agenteId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/avaliacoes/2')
      .send({ ...avaliacao, agenteId: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de avaliação inexistente na alteração', async () => {
    const response = await request(app)
      .put('/avaliacoes/999')
      .send({ ...avaliacao, focos: 15 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o número de focos de uma avaliação', async () => {
    const response = await request(app)
      .put('/avaliacoes/2')
      .send({ ...avaliacao, focos: 15 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('agenteId');
  });

  it('Deve-se retornar a listagem das avaliações', async () => {
    const response = await request(app)
      .get('/avaliacoes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um avaliação pelo seu id', async () => {
    const response = await request(app)
      .get('/avaliacoes/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('agenteId');
  });

  it('Deve-se deletar um avaliação pelo seu id', async () => {
    const response = await request(app)
      .delete('/avaliacoes/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /avaliacoes sem autenticação', async () => {
    const response = await request(app).get('/avaliacoes');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /avaliacoes/:id sem autenticação', async () => {
    const response = await request(app).get('/avaliacoes/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /avaliacoes sem autenticação', async () => {
    const response = await request(app).post('/avaliacoes').send(avaliacao);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /avaliacoes/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/avaliacoes/1')
      .send({ ...avaliacao, focos: 35 });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /avaliacoes/:id sem autenticação', async () => {
    const response = await request(app).delete('/avaliacoes/1');
    expect(response.status).toBe(401);
  });
});
