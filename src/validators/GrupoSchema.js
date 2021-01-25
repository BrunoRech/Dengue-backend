const Grupo = require('../models/Grupo');
const { optional } = require('./funcoes');

module.exports = {
  grupoId: {
    custom: {
      options: async value => {
        if (value) {
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
