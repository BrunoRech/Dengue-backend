const express = require('express');
const MunicipioController = require('./index');

const routes = express.Router();

routes.get('/', MunicipioController.index);
routes.post('/', MunicipioController.store);
routes.get('/:municipioId', MunicipioController.show);
routes.patch('/:municipioId', MunicipioController.update);
routes.delete('/:municipioId', MunicipioController.destroy);

module.exports = routes;
