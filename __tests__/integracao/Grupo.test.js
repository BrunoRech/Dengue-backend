const request = require('supertest');
const { grupo } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /grupos', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
  });

  it('Deve-se cadastrar um novo grupo', async () => {
    const response = await request(app)
      .post('/grupos')
      .send(grupo)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/grupos')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de grupo com agentes cadastrados', async () => {
    const response = await request(app)
      .delete('/grupos/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/grupos/4')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de grupo inexistente na alteração', async () => {
    const response = await request(app)
      .put('/grupos/999')
      .send({ nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de um grupo', async () => {
    const response = await request(app)
      .put('/grupos/4')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar a listagem dos grupos', async () => {
    const response = await request(app)
      .get('/grupos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um grupo pelo seu id', async () => {
    const response = await request(app)
      .get('/grupos/4')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um grupo pelo seu id', async () => {
    const response = await request(app)
      .delete('/grupos/4')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /grupos sem autenticação', async () => {
    const response = await request(app).get('/grupos');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /grupos/:id sem autenticação', async () => {
    const response = await request(app).get('/grupos/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /grupos sem autenticação', async () => {
    const response = await request(app).post('/grupos').send(grupo);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /grupos/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/grupos/1')
      .send({ ...grupo, nome: 'nome novo' });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /grupos/:id sem autenticação', async () => {
    const response = await request(app).delete('/grupos/1');
    expect(response.status).toBe(401);
  });
});
