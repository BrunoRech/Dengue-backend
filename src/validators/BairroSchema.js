const Municipio = require('../models/Municipio');
const Bairro = require('../models/Bairro');

module.exports = {
  bairroId: {
    custom: {
      options: async value => {
        if (value) {
          const bairro = await Bairro.findByPk(value);
          if (!bairro) {
            throw new Error('Bairro Inexistente');
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
  municipioId: {
    in: ['body'],
    exists: {
      errorMessage: 'Município Obrigatório',
    },
    custom: {
      options: async value => {
        const municipio = await Municipio.findByPk(value);
        if (!municipio) {
          throw new Error('Município Inexistente');
        }
      },
    },
  },
};
