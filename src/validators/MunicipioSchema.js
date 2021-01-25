const Municipio = require('../models/Municipio');
const { optional } = require('./funcoes');

module.exports = {
  municipioId: {
    custom: {
      options: async value => {
        if (value) {
          const municipio = await Municipio.findByPk(value);
          if (!municipio) {
            throw new Error('Município Inexistente');
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
