const express = require('express');
const { checkSchema } = require('express-validator');
const SessaoAgenteController = require('./index');
const SessaoAgenteSchema = require('../../validators/SessaoAgenteSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.post('/agentes', checkSchema(SessaoAgenteSchema), (req, res) =>
  Handler(req, res, SessaoAgenteController.store),
);
/* routes.post('/coordenador', checkSchema(SessaoAgenteSchema), (req, res) =>
  Handler(req, res, SessaoAgenteController.store),
); */

module.exports = routes;
