const request = require('supertest');
const { municipio } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /municipios', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
  });

  it('Deve-se cadastrar um novo municipio', async () => {
    const response = await request(app)
      .post('/municipios')
      .send(municipio)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/municipios')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/municipios/2')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de municipio inexistente na alteração', async () => {
    const response = await request(app)
      .put('/municipios/999')
      .send({ nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de um municipio', async () => {
    const response = await request(app)
      .put('/municipios/2')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar erro em rotas sem autenticação', async () => {
    const response = await request(app).get('/municipios');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar a listagem dos municipios', async () => {
    const response = await request(app)
      .get('/municipios')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um municipio pelo seu id', async () => {
    const response = await request(app)
      .get('/municipios/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um municipio pelo seu id', async () => {
    const response = await request(app)
      .delete('/municipios/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
