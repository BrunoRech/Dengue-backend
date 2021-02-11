const { Grupo } = require('../models');

module.exports = {
  grupoId: {
    custom: {
      options: async value => {
        if (value) {
          const grupo = await Grupo.findByPk(value);
          if (!grupo) {
            throw new Error('Grupo Inexistente');
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
