const express = require('express');
const { checkSchema } = require('express-validator');
const AvaliacaoController = require('./index');
const AvaliacaoSchema = require('../../validators/AvaliacaoSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', AvaliacaoController.index);
routes.get('/:avaliacaoId', AvaliacaoController.show);
routes.delete('/:avaliacaoId', AvaliacaoController.destroy);
routes.post('/', checkSchema(AvaliacaoSchema), (req, res) =>
  Handler(req, res, AvaliacaoController.store),
);
routes.put('/:avaliacaoId', checkSchema(AvaliacaoSchema), (req, res) =>
  Handler(req, res, AvaliacaoController.update),
);

module.exports = routes;
