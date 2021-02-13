const express = require('express');
const { checkSchema } = require('express-validator');
const { Handler, GrupoSchema, GrupoVisitaSchema } = require('../../validators');
const GrupoController = require('./index');
const VisitaController = require('../Visita');

const routes = express.Router();

routes.get('/:grupoId/visitas', checkSchema(GrupoVisitaSchema), (req, res) =>
  Handler(req, res, VisitaController.grupo),
);
routes.get('/visitas', checkSchema(GrupoVisitaSchema), (req, res) =>
  Handler(req, res, VisitaController.grupos),
);

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
