const express = require('express');
const BairroController = require('./index');

const routes = express.Router();

routes.get('/', BairroController.index);
routes.post('/', BairroController.store);
routes.get('/:bairroId', BairroController.show);
routes.patch('/:bairroId', BairroController.update);
routes.delete('/:bairroId', BairroController.destroy);

module.exports = routes;
