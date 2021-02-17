const { Avaliacao, Bairro, Rua } = require('../models');
const { optional } = require('./funcoes');

module.exports = {
  ruaId: {
    custom: {
      options: async (value, { req }) => {
        if (req.method === 'DELETE') {
          const avaliacao = await Avaliacao.findOne({
            where: { ruaId: value },
          });
          if (avaliacao) {
            throw new Error('Esta Rua Possui Avaliações Cadastradas!');
          }
        } else if (value) {
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
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Nome Obrigatório',
    },
  },
  bairroId: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
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
