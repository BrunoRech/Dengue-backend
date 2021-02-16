require('./database');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(5555, () => console.log('Servidor rodando na porta 5555'));

module.exports = app;
