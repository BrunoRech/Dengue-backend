const request = require('supertest');
const app = require('../../src');

let token = null;

describe('Testando relatórios de visitas', () => {
  beforeAll(async () => {
    const { body: sessao } = await request(app).post('/sessoes/agentes').send({
      senha: '123',
      email: 'email@email.com',
    });
    token = sessao.token;
  });

  it('Deve-se retornar o um erro no número de visitas de um agente caso o período não for informado', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de visitas de um agente caso o agente não existir', async () => {
    const response = await request(app)
      .get('/agentes/99/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de visitas de um agente caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/agentes/99/visitas')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o número de visitas de um agente no período: Semanal', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um agente no período: Mensal', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um agente no período: Trimestral', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um agente no período: Semestral', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um agente no período: Anual', async () => {
    const response = await request(app)
      .get('/agentes/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o um erro no número de visitas de um grupo caso o período não for informado', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de visitas de um grupo caso o grupo não existir', async () => {
    const response = await request(app)
      .get('/grupos/99/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de visitas de um grupo caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/grupos/99/visitas')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o número de visitas de um grupo no período: Semanal', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um grupo no período: Mensal', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um grupo no período: Trimestral', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um grupo no período: Semestral', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas de um grupo no período: Anual', async () => {
    const response = await request(app)
      .get('/grupos/1/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Hoje', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Hoje');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Semanal', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Mensal', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Trimestral', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Semestral', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos grupos no período: Anual', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Hoje', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Hoje');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Semanal', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semanal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Mensal', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Mensal');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Trimestral', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Trimestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Semestral', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Semestral');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o número de visitas dos agentes no período: Anual', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`)
      .set('periodo', 'Anual');
    expect(response.status).toBe(200);
  });

  it('Deve-se retornar o um erro no número de visitas dos grupos caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o um erro no número de visitas dos agentes caso não tenha autorização', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('periodo', 'Semanal');
    expect(response.status).toBe(401);
  });

  it('Deve-se retornar o um erro no número de visitas dos grupos caso o período não for informado', async () => {
    const response = await request(app)
      .get('/grupos/visitas')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('Deve-se retornar o um erro no número de visitas dos agentes caso o período não for informado', async () => {
    const response = await request(app)
      .get('/agentes/visitas')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});
