const Coordenador = require('../models/Coordenador');
const { optional } = require('./funcoes');

module.exports = {
  coordenadorId: {
    custom: {
      options: async value => {
        if (value) {
          const coordenador = await Coordenador.findByPk(value);
          if (!coordenador) {
            throw new Error('Coordenador Inexistente');
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
  senha: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Senha Obrigatória',
    },
  },
  email: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'E-mail Obrigatório',
    },
    isEmail: {
      errorMessage: 'Digite um email válido',
    },
  },
  telefone: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Telefone Obrigatório',
    },
  },
};
