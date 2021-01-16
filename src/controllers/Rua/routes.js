const express = require('express');
const { checkSchema } = require('express-validator');
const RuaController = require('./index');
const RuaSchema = require('../../validators/RuaSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', RuaController.index);
routes.get('/:ruaId', RuaController.show);
routes.delete('/:ruaId', RuaController.destroy);
routes.post('/', checkSchema(RuaSchema), (req, res) =>
  Handler(req, res, RuaController.store),
);
routes.put('/:ruaId', checkSchema(RuaSchema), (req, res) =>
  Handler(req, res, RuaController.update),
);

module.exports = routes;
