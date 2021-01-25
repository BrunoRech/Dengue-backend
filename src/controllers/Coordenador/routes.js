const express = require('express');
const { checkSchema } = require('express-validator');
const CoordenadorController = require('./index');
const { Handler, CoordenadorSchema } = require('../../validators');

const routes = express.Router();

routes.get('/', CoordenadorController.index);
routes.delete('/:coordenadorId', CoordenadorController.destroy);
routes.get('/:coordenadorId', checkSchema(CoordenadorSchema), (req, res) =>
  Handler(req, res, CoordenadorController.show),
);
routes.post('/', checkSchema(CoordenadorSchema), (req, res) =>
  Handler(req, res, CoordenadorController.store),
);
routes.put('/:coordenadorId', checkSchema(CoordenadorSchema), (req, res) =>
  Handler(req, res, CoordenadorController.update),
);

module.exports = routes;
