const Agente = require('../models/Agente');
const Rua = require('../models/Rua');
const Avaliacao = require('../models/Avaliacao');
const { optional } = require('./funcoes');

module.exports = {
  avaliacaoId: {
    custom: {
      options: async value => {
        if (value) {
          const avaliacao = await Avaliacao.findByPk(value);
          if (!avaliacao) {
            throw new Error('Avaliação Inexistente');
          }
        }
      },
    },
  },
  agenteId: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
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
    optional,
    isEmpty: {
      negated: true,
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
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Nome do Morador Obrigatório',
    },
  },
  focos: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Número de Focos Obrigatório',
    },
  },
  horario: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Horário Obrigatório',
    },
  },
  numero: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Número da Residência Obrigatório',
    },
  },
};
