const Agente = require('../models/Agente');

module.exports = {
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'E-mail Obrigatório',
    },
  },
  senha: {
    in: ['body'],
    exists: {
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
          const igual = await agente.validarSenha(senha);
          if (!igual) {
            throw new Error('Senha inválida');
          }
        }
      },
    },
  },
};
