module.exports = {
  nome: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome Obrigatório',
    },
  },
  municipioId: {
    in: ['body'],
    exists: {
      errorMessage: 'Município Obrigatório',
    },
  },
};
