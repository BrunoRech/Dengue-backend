const express = require('express');
const { checkSchema } = require('express-validator');
const BairroController = require('./index');
const { Handler, BairroSchema } = require('../../validators');

const routes = express.Router();

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
