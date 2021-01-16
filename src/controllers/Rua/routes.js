const express = require('express');
const { checkSchema } = require('express-validator');
const RuaController = require('./index');
const RuaSchema = require('../../validators/RuaSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

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
