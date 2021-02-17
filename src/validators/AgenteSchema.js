const Agente = require('../models/Agente');
const Grupo = require('../models/Grupo');
const { optional, validacaoData } = require('./funcoes');

module.exports = {
  agenteId: {
    custom: {
      options: async value => {
        if (value) {
          const agente = await Agente.findByPk(value);
          if (!agente) {
            throw new Error('Agente Inexistente');
          }
        }
      },
    },
  },
  grupoId: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Grupo Obrigatório',
    },
    custom: {
      options: async value => {
        const grupo = await Grupo.findByPk(value);
        if (!grupo) {
          throw new Error('Grupo Inexistente');
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
  senha: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Senha Obrigatória',
    },
  },
  cpf: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Cpf Obrigatório',
    },
    custom: {
      options: async value => {
        if (value) {
          const agente = await Agente.findOne({
            where: {
              cpf: value,
            },
          });
          if (agente) {
            throw new Error('Cpf já existente');
          }
        }
      },
    },
  },
  email: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'E-mail Obrigatório',
    },
    isEmail: {
      errorMessage: 'Digite um email válido',
    },
    custom: {
      options: async value => {
        if (value) {
          const coordenador = await Agente.findOne({
            where: {
              email: value,
            },
          });
          if (coordenador) {
            throw new Error('E-mail já existente');
          }
        }
      },
    },
  },
  telefone: {
    in: ['body'],
    optional,
    isEmpty: {
      negated: true,
      errorMessage: 'Telefone Obrigatório',
    },
  },
  dataNascimento: {
    in: ['body'],
    optional,
    custom: validacaoData,
    isEmpty: {
      negated: true,
      errorMessage: 'Data de Nascimento Obrigatória',
    },
  },
  dataIngresso: {
    in: ['body'],
    optional,
    custom: validacaoData,
    isEmpty: {
      negated: true,
      errorMessage: 'Data de Ingresso Obrigatória',
    },
  },
};
