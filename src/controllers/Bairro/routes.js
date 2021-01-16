const express = require('express');
const { checkSchema } = require('express-validator');
const BairroController = require('./index');
const BairroSchema = require('../../validators/BairroSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', BairroController.index);
routes.get('/:bairroId', BairroController.show);
routes.delete('/:bairroId', BairroController.destroy);
routes.post('/', checkSchema(BairroSchema), (req, res) =>
  Handler(req, res, BairroController.store),
);
routes.put('/:bairroId', checkSchema(BairroSchema), (req, res) =>
  Handler(req, res, BairroController.update),
);

module.exports = routes;
