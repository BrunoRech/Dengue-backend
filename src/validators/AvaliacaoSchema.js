const Agente = require('../models/Agente');
const Rua = require('../models/Rua');
const Avaliacao = require('../models/Avaliacao');
const { optional, validacaoData } = require('./funcoes');

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
    custom: {
      options: async value => {
        if (value.length !== 5) {
          throw new Error('Horário Inválido');
        }
        const [horas, minutos] = value.split(':');
        if (
          Number(horas) > 24 ||
          Number(horas) < 0 ||
          Number(minutos) > 59 ||
          Number(minutos) < 0
        ) {
          throw new Error('Horário Inválido');
        }
        return true;
      },
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
  dataAvaliacao: {
    in: ['body'],
    optional,
    custom: validacaoData,
    isEmpty: {
      negated: true,
      errorMessage: 'Data da Avaliação Obrigatória',
    },
  },
};
