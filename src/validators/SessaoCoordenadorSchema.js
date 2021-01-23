const Coordenador = require('../models/Coordenador');

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
          const coordenador = await Coordenador.findOne({ where: { email } });
          if (!coordenador) {
            throw new Error('E-mail Inexistente');
          }
          if (!(await coordenador.validarSenha(senha))) {
            throw new Error('Senha inválida');
          }
        }
      },
    },
  },
};
