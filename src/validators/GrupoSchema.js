const Grupo = require('../models/Grupo');

module.exports = {
  grupoId: {
    custom: {
      options: async value => {
        if (value) {
          const municipio = await Grupo.findByPk(value);
          if (!municipio) {
            throw new Error('Grupo Inexistente');
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
