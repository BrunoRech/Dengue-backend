const express = require('express');
const AgenteController = require('./index');

const routes = express.Router();

routes.get('/', AgenteController.index);
routes.post('/', AgenteController.store);
routes.get('/:agenteId', AgenteController.show);
routes.put('/:agenteId', AgenteController.update);
routes.delete('/:agenteId', AgenteController.destroy);

module.exports = routes;
