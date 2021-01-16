module.exports = {
  agenteId: {
    in: ['body'],
    exists: {
      errorMessage: 'Agente Obrigatório',
    },
  },
  ruaId: {
    in: ['body'],
    exists: {
      errorMessage: 'Rua Obrigatória',
    },
  },
  morador: {
    in: ['body'],
    exists: {
      errorMessage: 'Nome do Morador Obrigatório',
    },
  },
  focos: {
    in: ['body'],
    exists: {
      errorMessage: 'Número de Focos Obrigatório',
    },
  },
  horario: {
    in: ['body'],
    exists: {
      errorMessage: 'Horário Obrigatório',
    },
  },
  numero: {
    in: ['body'],
    exists: {
      errorMessage: 'Número da Residência Obrigatório',
    },
  },
};
