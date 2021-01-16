const Agente = require('../models/Agente');
const Rua = require('../models/Rua');

module.exports = {
  agenteId: {
    in: ['body'],
    exists: {
      errorMessage: 'Agente Obrigatório',
    },
    custom: {
      options: async value => {
        const agente = await Agente.findByPk(value);
        if (!agente) {
          throw new Error('Agente Inexistente');
        }
      },
    },
  },
  ruaId: {
    in: ['body'],
    exists: {
      errorMessage: 'Rua Obrigatória',
    },
    custom: {
      options: async value => {
        const rua = await Rua.findByPk(value);
        if (!rua) {
          throw new Error('Rua Inexistente');
        }
      },
    },
  },
  morador: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome do Morador Obrigatório',
    },
  },
  focos: {
    in: ['body'],
    exists: {
      errorMessage: 'Número de Focos Obrigatório',
    },
  },
  horario: {
    in: ['body'],
    exists: {
      errorMessage: 'Horário Obrigatório',
    },
  },
  numero: {
    in: ['body'],
    exists: {
      errorMessage: 'Número da Residência Obrigatório',
    },
  },
};
