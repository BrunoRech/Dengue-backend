const request = require('supertest');
const app = require('../../src');

let token = null;

describe('Testando relatórios de focos', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app).post('/sessoes/agentes').send({
      senha: '123',
      email: 'email@email.com',
    });
    token = sessao.token;
  });

  it('Deve-se retornar o um erro no número de focos de uma rua caso o período não for informado', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de um bairro caso o período não for informado', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de um município caso o período não for informado', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de um agente caso a rua não existir', async () => {
    const response = await request(app)
      .get('/ruas/99/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de um agente caso o bairro não existir', async () => {
    const response = await request(app)
      .get('/bairros/99/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de um agente caso o município não existir', async () => {
    const response = await request(app)
      .get('/municipios/99/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de focos de uma rua caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o um erro no número de focos de um bairro caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o um erro no número de focos de um município caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o número de focos de uma rua no período: Semanal', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um bairro no período: Semanal', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um município no período: Semanal', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de uma rua no período: Mensal', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um bairro no período: Mensal', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um município no período: Mensal', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de uma rua no período: Trimestral', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um bairro no período: Trimestral', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um município no período: Trimestral', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de uma rua no período: Semestral', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um bairro no período: Semestral', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um município no período: Semestral', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de uma rua no período: Anual', async () => {
    const response = await request(app)
      .get('/ruas/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um bairro no período: Anual', async () => {
    const response = await request(app)
      .get('/bairros/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de focos de um município no período: Anual', async () => {
    const response = await request(app)
      .get('/municipios/1/focos')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });
});
