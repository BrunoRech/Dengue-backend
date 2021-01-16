const express = require('express');
const { checkSchema } = require('express-validator');
const MunicipioController = require('./index');
const MunicipioSchema = require('../../validators/MunicipioSchema');
const Handler = require('../../validators/Handler');

const routes = express.Router();

routes.get('/', MunicipioController.index);
routes.get('/:municipioId', MunicipioController.show);
routes.delete('/:municipioId', MunicipioController.destroy);
routes.post('/', checkSchema(MunicipioSchema), (req, res) =>
  Handler(req, res, MunicipioController.store),
);
routes.put('/:municipioId', checkSchema(MunicipioSchema), (req, res) =>
  Handler(req, res, MunicipioController.update),
);

module.exports = routes;
