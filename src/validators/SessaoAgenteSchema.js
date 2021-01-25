const Agente = require('../models/Agente');

module.exports = {
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'E-mail Obrigatório',
    },
  },
  senha: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Senha Obrigatória',
    },
    custom: {
      options: async (senha, { req }) => {
        if (senha) {
          const { email } = req.body;
          const agente = await Agente.findOne({ where: { email } });
          if (!agente) {
            throw new Error('E-mail Inexistente');
          }
          if (!(await agente.validarSenha(senha))) {
            throw new Error('Senha inválida');
          }
        }
      },
    },
  },
};
