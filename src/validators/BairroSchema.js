const Municipio = require('../models/Municipio');

module.exports = {
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
