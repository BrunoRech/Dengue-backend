const express = require('express');
const middlewareAutenticacao = require('./middlewares/autenticacao');

const routes = express.Router();

routes.use('/sessoes', require('./controllers/Sessao/routes'));

routes.use(middlewareAutenticacao);

routes.use('/coordenadores', require('./controllers/Coordenador/routes'));

routes.use('/municipios', require('./controllers/Municipio/routes'));

routes.use('/bairros', require('./controllers/Bairro/routes'));

routes.use('/ruas', require('./controllers/Rua/routes'));

routes.use('/grupos', require('./controllers/Grupo/routes'));

routes.use('/agentes', require('./controllers/Agente/routes'));

routes.use('/avaliacoes', require('./controllers/Avaliacao/routes'));

module.exports = routes;
