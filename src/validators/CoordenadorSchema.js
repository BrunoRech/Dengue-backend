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
  cpf: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Cpf Obrigatório',
    },
    custom: {
      options: async value => {
        if (value) {
          const coordenador = await Coordenador.findOne({
            where: {
              cpf: value,
            },
          });
          if (coordenador) {
            throw new Error('Cpf já existente');
          }
        }
      },
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
    custom: {
      options: async value => {
        if (value) {
          const coordenador = await Coordenador.findOne({
            where: {
              email: value,
            },
          });
          if (coordenador) {
            throw new Error('E-mail já existente');
          }
        }
      },
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
