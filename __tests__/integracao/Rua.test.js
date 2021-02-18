const request = require('supertest');
const { rua } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /ruas', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
  });

  it('Deve-se cadastrar uma nova rua', async () => {
    const response = await request(app)
      .post('/ruas')
      .send(rua)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/ruas')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de bairro inexistente no cadastro', async () => {
    const response = await request(app)
      .post('/ruas')
      .send({ nome: 'Nome teste', bairroId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de rua com avaliações cadastradas', async () => {
    const response = await request(app)
      .delete('/ruas/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/ruas/7')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de rua inexistente na alteração', async () => {
    const response = await request(app)
      .put('/ruas/999')
      .send({ nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de bairro inexistente na alteração', async () => {
    const response = await request(app)
      .put('/ruas/1')
      .send({ nome: 'nome2', bairroId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de uma rua', async () => {
    const response = await request(app)
      .put('/ruas/7')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar a listagem das ruas', async () => {
    const response = await request(app)
      .get('/ruas')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar uma rua pelo seu id', async () => {
    const response = await request(app)
      .get('/ruas/7')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar uma rua pelo seu id', async () => {
    const response = await request(app)
      .delete('/ruas/7')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /ruas sem autenticação', async () => {
    const response = await request(app).get('/ruas');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /ruas/:id sem autenticação', async () => {
    const response = await request(app).get('/ruas/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /ruas sem autenticação', async () => {
    const response = await request(app).post('/ruas').send(rua);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /ruas/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/ruas/1')
      .send({ ...rua, nome: 'nome novo' });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /ruas/:id sem autenticação', async () => {
    const response = await request(app).delete('/ruas/1');
    expect(response.status).toBe(401);
  });
});
