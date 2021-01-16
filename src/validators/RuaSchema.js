module.exports = {
  nome: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome Obrigatório',
    },
  },
  bairroId: {
    in: ['body'],
    exists: {
      errorMessage: 'Bairro Obrigatório',
    },
  },
};
