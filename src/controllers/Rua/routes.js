const express = require('express');
const RuaController = require('./index');

const routes = express.Router();

routes.get('/', RuaController.index);
routes.post('/', RuaController.store);
routes.get('/:ruaId', RuaController.show);
routes.patch('/:ruaId', RuaController.update);
routes.delete('/:ruaId', RuaController.destroy);

module.exports = routes;
