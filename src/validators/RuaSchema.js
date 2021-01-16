const Bairro = require('../models/Bairro');
const Rua = require('../models/Rua');

module.exports = {
  ruaId: {
    custom: {
      options: async value => {
        if (value) {
          const rua = await Rua.findByPk(value);
          if (!rua) {
            throw new Error('Rua Inexistente');
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
