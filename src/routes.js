const express = require('express');
const  MunicipioController = require('./controllers/MunicipioController');
const  BairroController = require('./controllers/BairroController');
const  RuaController = require('./controllers/RuaController');
const routes = express.Router();

routes.post('/municipios', MunicipioController.store);
routes.get('/municipios', MunicipioController.index);

routes.post('/municipios/:id/bairros', BairroController.store);
routes.get('/municipios/:id/bairros', BairroController.index);

routes.post('/bairros/:id/ruas', RuaController.store);
routes.get('/bairros/:id/ruas', RuaController.index);

module.exports = routes;
