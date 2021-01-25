const request = require('supertest');
const { coordenador } = require('../factory');
const app = require('../../src');

let token = null;

describe('Testando operações das rotas /coordenadores', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app)
      .post('/sessoes/coordenadores')
      .send({
        senha: '123',
        email: 'email@email.com',
      });
    token = sessao.token;
  });

  it('Deve-se retornar um erro ao logar com um e-mail inválido', async () => {
    const response = await request(app).post('/sessoes/coordenadores').send({
      senha: '567890',
      email: 'email@email.com',
    });
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro ao logar com uma senha incorreta', async () => {
    const response = await request(app).post('/sessoes/coordenadores').send({
      senha: '123',
      email: 'emailInvalido123@email.com',
    });
    expect(response.status).toBe(400);
  });

  it('Deve-se cadastrar um novo coordenador', async () => {
    const response = await request(app)
      .post('/coordenadores')
      .send(coordenador)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar um erro de campo em branco no cadastro', async () => {
    const response = await request(app)
      .post('/coordenadores')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/coordenadores/2')
      .send({ nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de coordenador inexistente na alteração', async () => {
    const response = await request(app)
      .put('/coordenadores/999')
      .send({ nome: 'nome2' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se alterar o nome de um coordenador', async () => {
    const response = await request(app)
      .put('/coordenadores/2')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar erro em rotas sem autenticação', async () => {
    const response = await request(app).get('/coordenadores');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar a listagem dos coordenadores', async () => {
    const response = await request(app)
      .get('/coordenadores')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um coordenador pelo seu id', async () => {
    const response = await request(app)
      .get('/coordenadores/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um coordenador pelo seu id', async () => {
    const response = await request(app)
      .delete('/coordenadores/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
