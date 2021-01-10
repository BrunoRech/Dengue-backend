const express = require('express');
const GrupoController = require('./index');

const routes = express.Router();

routes.get('/', GrupoController.index);
routes.post('/', GrupoController.store);
routes.get('/:grupoId', GrupoController.show);
routes.patch('/:grupoId', GrupoController.update);
routes.delete('/:grupoId', GrupoController.destroy);

module.exports = routes;
