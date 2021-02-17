const { optional } = require('./funcoes');
const { Rua, Bairro, Municipio } = require('../models');

module.exports = {
  bairroId: {
    custom: {
      options: async (value, { req }) => {
        if (req.method === 'DELETE') {
          const rua = await Rua.findOne({
            where: { bairroId: value },
          });
          if (rua) {
            throw new Error('Este Bairro Possui Ruas Cadastradas!');
          }
        } else if (value) {
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
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Nome Obrigatório',
    },
  },
  municipioId: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
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
