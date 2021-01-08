const Sequelize = require('sequelize');
const config = require('../config/database');

const Municipio = require('../models/Municipio');
const Bairro = require('../models/Bairro');
const Rua = require('../models/Rua');

const conn = new Sequelize(config);

Municipio.init(conn);
Bairro.init(conn);
Rua.init(conn);

Municipio.associate(conn.models);
Bairro.associate(conn.models);
Rua.associate(conn.models);

module.exports = conn;
