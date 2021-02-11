const express = require('express');
const { checkSchema } = require('express-validator');
const { Handler, BairroSchema, BairroFocoSchema } = require('../../validators');
const BairroController = require('./index');
const FocoController = require('../Foco');

const routes = express.Router();

routes.get('/:bairroId/focos', checkSchema(BairroFocoSchema), (req, res) =>
  Handler(req, res, FocoController.bairro),
);

routes.get('/', BairroController.index);
routes.delete('/:bairroId', BairroController.destroy);
routes.get('/:bairroId', checkSchema(BairroSchema), (req, res) =>
  Handler(req, res, BairroController.show),
);
routes.post('/', checkSchema(BairroSchema), (req, res) =>
  Handler(req, res, BairroController.store),
);
routes.put('/:bairroId', checkSchema(BairroSchema), (req, res) =>
  Handler(req, res, BairroController.update),
);

module.exports = routes;
