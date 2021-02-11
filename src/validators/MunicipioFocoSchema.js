const { Municipio } = require('../models');

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
  periodo: {
    in: ['headers'],
    isEmpty: {
      negated: true,
      errorMessage: 'Período Obrigatório',
    },
  },
};
