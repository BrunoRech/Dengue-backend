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
      .send({ ...coordenador, nome: null })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de campo em branco na alteração', async () => {
    const response = await request(app)
      .put('/coordenadores/3')
      .send({ ...coordenador, nome: null })
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
      .put('/coordenadores/3')
      .send({ nome: 'nome novo' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se retornar a listagem dos coordenadores', async () => {
    const response = await request(app)
      .get('/coordenadores')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar um erro de email já existente na alteração', async () => {
    const response = await request(app)
      .put('/coordenadores/3')
      .send({ email: coordenador.email })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de email já existente no cadastro', async () => {
    const response = await request(app)
      .post('/coordenadores')
      .send({ ...coordenador, cpf: 12345678901 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de cpf já existente na alteração', async () => {
    const response = await request(app)
      .put('/coordenadores/3')
      .send({ cpf: coordenador.cpf })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um erro de cpf já existente no cadastro', async () => {
    const response = await request(app)
      .post('/coordenadores')
      .send({ ...coordenador, email: 'email25@email.com' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar um coordenador pelo seu id', async () => {
    const response = await request(app)
      .get('/coordenadores/3')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('nome');
  });

  it('Deve-se deletar um coordenador pelo seu id', async () => {
    const response = await request(app)
      .delete('/coordenadores/3')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar erro em GET /coordenadores sem autenticação', async () => {
    const response = await request(app).get('/coordenadores');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em GET /coordenadores/:id sem autenticação', async () => {
    const response = await request(app).get('/coordenadores/1');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em POST /coordenadores sem autenticação', async () => {
    const response = await request(app)
      .post('/coordenadores')
      .send(coordenador);
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em PUT /coordenadores/:id sem autenticação', async () => {
    const response = await request(app)
      .put('/coordenadores/1')
      .send({ ...coordenador, nome: 'nome novo' });
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar erro em DELETE /coordenadores/:id sem autenticação', async () => {
    const response = await request(app).delete('/coordenadores/1');
    expect(response.status).toBe(401);
  });
});
