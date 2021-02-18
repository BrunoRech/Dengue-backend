const request = require('supertest');
const { bairro } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /bairros', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
  });

  it('Deve-se cadastrar um novo bairro', async () => {
    const response = await request(app)
      .post('/bairros')
      .send(bairro)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/bairros')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de bairro com ruas cadastradas', async () => {
    const response = await request(app)
      .delete('/bairros/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de município inexistente no cadastro', async () => {
    const response = await request(app)
      .post('/bairros')
      .send({ nome: 'Nome teste', municipioId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/bairros/7')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de bairro inexistente na alteração', async () => {
    const response = await request(app)
      .put('/bairros/999')
      .send({ nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de município inexistente na alteração', async () => {
    const response = await request(app)
      .put('/bairros/1')
      .send({ nome: 'nome2', municipioId: 999 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de um bairro', async () => {
    const response = await request(app)
      .put('/bairros/7')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar a listagem dos bairros', async () => {
    const response = await request(app)
      .get('/bairros')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um bairro pelo seu id', async () => {
    const response = await request(app)
      .get('/bairros/7')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um bairro pelo seu id', async () => {
    const response = await request(app)
      .delete('/bairros/7')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /bairros sem autenticação', async () => {
    const response = await request(app).get('/bairros');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /bairros/:id sem autenticação', async () => {
    const response = await request(app).get('/bairros/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /bairros sem autenticação', async () => {
    const response = await request(app).post('/bairros').send(bairro);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /bairros/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/bairros/1')
      .send({ ...bairro, nome: 'nome novo' });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /agentes/:id sem autenticação', async () => {
    const response = await request(app).delete('/agentes/1');
    expect(response.status).toBe(401);
  });
});
