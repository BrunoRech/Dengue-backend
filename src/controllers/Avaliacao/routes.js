const express = require('express');
const { checkSchema } = require('express-validator');
const AvaliacaoController = require('./index');
const { Handler, AvaliacaoSchema } = require('../../validators');

const routes = express.Router();

routes.get('/', AvaliacaoController.index);
routes.delete('/:avaliacaoId', AvaliacaoController.destroy);
routes.get('/:avaliacaoId', checkSchema(AvaliacaoSchema), (req, res) =>
  Handler(req, res, AvaliacaoController.show),
);
routes.post('/', checkSchema(AvaliacaoSchema), (req, res) =>
  Handler(req, res, AvaliacaoController.store),
);
routes.put('/:avaliacaoId', checkSchema(AvaliacaoSchema), (req, res) =>
  Handler(req, res, AvaliacaoController.update),
);

module.exports = routes;
