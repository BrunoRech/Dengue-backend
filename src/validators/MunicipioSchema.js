const Municipio = require('../models/Municipio');

module.exports = {
  municipioId: {
    custom: {
      options: async value => {
        if (value) {
          const municipio = await Municipio.findByPk(value);
          if (!municipio) {
            throw new Error('Município Inexistente');
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
};
