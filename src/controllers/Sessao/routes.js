const express = require('express');
const { checkSchema } = require('express-validator');
const Handler = require('../../validators/Handler');
const SessaoController = require('./index');
const {
  SessaoAgenteSchema,
  SessaoCoordenadorSchema,
} = require('../../validators');

const routes = express.Router();

routes.post('/agentes', checkSchema(SessaoAgenteSchema), (req, res) =>
  Handler(req, res, SessaoController.gerarSessaoAgente),
);
routes.post(
  '/coordenadores',
  checkSchema(SessaoCoordenadorSchema),
  (req, res) => Handler(req, res, SessaoController.gerarSessaoCoordenador),
);

module.exports = routes;
