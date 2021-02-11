const { Rua } = require('../models');

module.exports = {
  ruaId: {
    custom: {
      options: async value => {
        if (value) {
          const rua = await Rua.findByPk(value);
          if (!rua) {
            throw new Error('Rua Inexistente');
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
