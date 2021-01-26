const express = require('express');
const { checkSchema } = require('express-validator');
const { Handler, AgenteSchema } = require('../../validators');
const AgenteController = require('./index');

const routes = express.Router();

routes.get('/', AgenteController.index);
routes.delete('/:agenteId', AgenteController.destroy);
routes.get('/:agenteId', checkSchema(AgenteSchema), (req, res) =>
  Handler(req, res, AgenteController.show),
);
routes.post('/', checkSchema(AgenteSchema), (req, res) =>
  Handler(req, res, AgenteController.store),
);
routes.put('/:agenteId', checkSchema(AgenteSchema), (req, res) =>
  Handler(req, res, AgenteController.update),
);

module.exports = routes;
