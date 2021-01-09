const express = require('express');
const CoordenadorController = require('./controllers/CoordenadorController');
const MunicipioController = require('./controllers/MunicipioController');
const BairroController = require('./controllers/BairroController');
const RuaController = require('./controllers/RuaController');
const GrupoController = require('./controllers/GrupoController');
const AgenteController = require('./controllers/AgenteController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const routes = express.Router();

routes.post('/municipios', MunicipioController.store);
routes.get('/municipios', MunicipioController.index);

routes.post('/municipios/:id/bairros', BairroController.store);
routes.get('/municipios/:id/bairros', BairroController.index);

routes.post('/bairros/:id/ruas', RuaController.store);
routes.get('/bairros/:id/ruas', RuaController.index);

routes.post('/grupos', GrupoController.store);
routes.get('/grupos', GrupoController.index);

routes.post('/grupos/:id/agentes', AgenteController.store);
routes.get('/grupos/:id/agentes', AgenteController.index);

routes.post('/coordenadores', CoordenadorController.store);
routes.get('/coordenadores', CoordenadorController.index);

routes.post('/avaliacoes', AvaliacaoController.store);
routes.get('/avaliacoes', AvaliacaoController.index);

module.exports = routes;
