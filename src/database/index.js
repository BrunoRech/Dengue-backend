const Sequelize = require('sequelize');
const config = require('../config/database');

const {
  Coordenador,
  Municipio,
  Avaliacao,
  Bairro,
  Agente,
  Grupo,
  Rua,
} = require('../models');

const conn = new Sequelize(config);

Grupo.init(conn);
Coordenador.init(conn);
Municipio.init(conn);
Avaliacao.init(conn);
Agente.init(conn);
Bairro.init(conn);
Rua.init(conn);

Municipio.associate(conn.models);
Avaliacao.associate(conn.models);
Bairro.associate(conn.models);
Grupo.associate(conn.models);
Agente.associate(conn.models);
Rua.associate(conn.models);

module.exports = conn;
