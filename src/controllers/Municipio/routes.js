const express = require('express');
const { checkSchema } = require('express-validator');
const { Handler, MunicipioSchema } = require('../../validators');
const MunicipioController = require('./index');

const routes = express.Router();

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
