const { Grupo, Agente } = require('../models');
const { optional } = require('./funcoes');

module.exports = {
  grupoId: {
    custom: {
      options: async (value, { req }) => {
        if (req.method === 'DELETE') {
          const agente = await Agente.findOne({
            where: { grupoId: value },
          });
          if (agente) {
            throw new Error('Este Grupo Possui Agentes Cadastrados!');
          }
        } else if (value) {
          const municipio = await Grupo.findByPk(value);
          if (!municipio) {
            throw new Error('Grupo Inexistente');
          }
        }
      },
    },
  },
  nome: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Nome Obrigatório',
    },
  },
};
