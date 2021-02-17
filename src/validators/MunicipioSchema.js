const { Bairro, Municipio } = require('../models');
const { optional } = require('./funcoes');

module.exports = {
  municipioId: {
    custom: {
      options: async (value, { req }) => {
        if (req.method === 'DELETE') {
          const bairro = await Bairro.findOne({
            where: { municipioId: value },
          });
          if (bairro) {
            throw new Error('Este Município Possui Bairros Cadastrados!');
          }
        } else if (value) {
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
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Nome Obrigatório',
    },
  },
};
