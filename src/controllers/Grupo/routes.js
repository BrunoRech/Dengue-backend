const express = require('express');
const { checkSchema } = require('express-validator');
const GrupoController = require('./index');
const GrupoSchema = require('../../validators/GrupoSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', GrupoController.index);
routes.get('/:grupoId', GrupoController.show);
routes.delete('/:grupoId', GrupoController.destroy);
routes.post('/', checkSchema(GrupoSchema), (req, res) =>
  Handler(req, res, GrupoController.store),
);
routes.put('/:grupoId', checkSchema(GrupoSchema), (req, res) =>
  Handler(req, res, GrupoController.update),
);

module.exports = routes;
