const Bairro = require('../models/Bairro');

module.exports = {
  nome: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome Obrigatório',
    },
  },
  bairroId: {
    in: ['body'],
    exists: {
      errorMessage: 'Bairro Obrigatório',
    },
    custom: {
      options: async value => {
        const bairro = await Bairro.findByPk(value);
        if (!bairro) {
          throw new Error('Bairro Inexistente');
        }
      },
    },
  },
};
