const express = require('express');
const { checkSchema } = require('express-validator');
const MunicipioController = require('./index');
const FocoController = require('../Foco');
const {
  Handler,
  MunicipioSchema,
  MunicipioFocoSchema,
} = require('../../validators');

const routes = express.Router();

routes.get(
  '/:municipioId/focos',
  checkSchema(MunicipioFocoSchema),
  (req, res) => Handler(req, res, FocoController.municipio),
);

routes.get('/', MunicipioController.index);
routes.delete('/:municipioId', MunicipioController.destroy);
routes.get('/:municipioId', checkSchema(MunicipioSchema), (req, res) =>
  Handler(req, res, MunicipioController.show),
);
routes.post('/', checkSchema(MunicipioSchema), (req, res) =>
  Handler(req, res, MunicipioController.store),
);
routes.put('/:municipioId', checkSchema(MunicipioSchema), (req, res) =>
  Handler(req, res, MunicipioController.update),
);

module.exports = routes;
