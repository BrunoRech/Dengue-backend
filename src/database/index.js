const Sequelize = require('sequelize');
const config = require('../config/database');

const Coordenador = require('../models/Coordenador');
const Municipio = require('../models/Municipio');
const Avaliacao = require('../models/Avaliacao');
const Bairro = require('../models/Bairro');
const Agente = require('../models/Agente');
const Grupo = require('../models/Grupo');
const Rua = require('../models/Rua');

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
