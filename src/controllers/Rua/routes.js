const express = require('express');
const { checkSchema } = require('express-validator');
const { Handler, RuaSchema, RuaFocoSchema } = require('../../validators');
const RuaController = require('./index');
const FocoController = require('../Foco');

const routes = express.Router();

routes.get('/:ruaId/focos', checkSchema(RuaFocoSchema), (req, res) =>
  Handler(req, res, FocoController.rua),
);

routes.get('/', RuaController.index);
routes.delete('/:ruaId', RuaController.destroy);
routes.get('/:ruaId', checkSchema(RuaSchema), (req, res) =>
  Handler(req, res, RuaController.show),
);
routes.post('/', checkSchema(RuaSchema), (req, res) =>
  Handler(req, res, RuaController.store),
);
routes.put('/:ruaId', checkSchema(RuaSchema), (req, res) =>
  Handler(req, res, RuaController.update),
);

module.exports = routes;
