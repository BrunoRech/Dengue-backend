const express = require('express');
const { checkSchema } = require('express-validator');
const CoordenadorController = require('./index');
const CoordenadorSchema = require('../../validators/CoordenadorSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', CoordenadorController.index);
routes.get('/:coordenadorId', CoordenadorController.show);
routes.delete('/:coordenadorId', CoordenadorController.destroy);
routes.post('/', checkSchema(CoordenadorSchema), (req, res) =>
  Handler(req, res, CoordenadorController.store),
);
routes.put('/:coordenadorId', checkSchema(CoordenadorSchema), (req, res) =>
  Handler(req, res, CoordenadorController.update),
);

module.exports = routes;
