const { Bairro } = require('../models');

module.exports = {
  bairroId: {
    custom: {
      options: async value => {
        if (value) {
          const bairro = await Bairro.findByPk(value);
          if (!bairro) {
            throw new Error('Bairro Inexistente');
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
