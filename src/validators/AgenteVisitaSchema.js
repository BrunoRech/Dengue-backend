const { Agente } = require('../models');

module.exports = {
  agenteId: {
    custom: {
      options: async value => {
        if (value) {
          const agente = await Agente.findByPk(value);
          if (!agente) {
            throw new Error('Agente Inexistente');
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
