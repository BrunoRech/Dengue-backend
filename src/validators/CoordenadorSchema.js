module.exports = {
  nome: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome Obrigatório',
    },
  },
  senha: {
    in: ['body'],
    exists: {
      errorMessage: 'Senha Obrigatória',
    },
  },
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'Email Obrigatório',
    },
    isEmail: {
      errorMessage: 'Digite um email válido',
    },
  },
  telefone: {
    in: ['body'],
    exists: {
      errorMessage: 'Telefone Obrigatório',
    },
  },
};
