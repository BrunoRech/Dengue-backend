const express = require('express');
const { checkSchema } = require('express-validator');
const GrupoController = require('./index');
const GrupoSchema = require('../../validators/GrupoSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', GrupoController.index);
routes.delete('/:grupoId', GrupoController.destroy);
routes.get('/:grupoId', checkSchema(GrupoSchema), (req, res) =>
  Handler(req, res, GrupoController.show),
);
routes.post('/', checkSchema(GrupoSchema), (req, res) =>
  Handler(req, res, GrupoController.store),
);
routes.put('/:grupoId', checkSchema(GrupoSchema), (req, res) =>
  Handler(req, res, GrupoController.update),
);

module.exports = routes;
