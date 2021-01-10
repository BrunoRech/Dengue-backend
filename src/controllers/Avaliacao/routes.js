const express = require('express');
const AvaliacaoController = require('./index');

const routes = express.Router();

routes.get('/', AvaliacaoController.index);
routes.post('/', AvaliacaoController.store);
routes.get('/:avaliacaoId', AvaliacaoController.show);
routes.patch('/:avaliacaoId', AvaliacaoController.update);
routes.delete('/:avaliacaoId', AvaliacaoController.destroy);

module.exports = routes;
