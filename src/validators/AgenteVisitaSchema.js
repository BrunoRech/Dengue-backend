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
    /*     custom: {
      options: value => {
        if (value) {
          switch (value) {
            case 'Semanal':
            case 'Mensal':
            case 'Trimestral':
            case 'Semestral':
            case 'Anual':
              break;
            default:
              throw new Error('Período Inválido');
          }
        }
      },
    }, */
  },
};
