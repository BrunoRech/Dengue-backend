const express = require('express');
const CoordenadorController = require('./index');

const routes = express.Router();

routes.get('/', CoordenadorController.index);
routes.post('/', CoordenadorController.store);
routes.get('/:coordenadorId', CoordenadorController.show);
routes.put('/:coordenadorId', CoordenadorController.update);
routes.delete('/:coordenadorId', CoordenadorController.destroy);

module.exports = routes;
