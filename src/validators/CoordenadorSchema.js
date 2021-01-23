const Coordenador = require('../models/Coordenador');

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
    exists: {
      errorMessage: 'Nome Obrigatório',
    },
  },
  senha: {
    in: ['body'],
    exists: {
      errorMessage: 'Senha Obrigatória',
    },
  },
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'E-mail Obrigatório',
    },
    isEmail: {
      errorMessage: 'Digite um email válido',
    },
  },
  telefone: {
    in: ['body'],
    exists: {
      errorMessage: 'Telefone Obrigatório',
    },
  },
};
