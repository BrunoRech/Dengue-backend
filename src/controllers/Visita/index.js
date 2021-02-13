const { Op } = require('sequelize');

const { Agente, Avaliacao, Grupo } = require('../../models');
const { getPeriodo, getPeriodoCompleto } = require('../periodos');

module.exports = {
  async agente(req, res) {
    const { agenteId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(
      async ({ dia, mes, ano, dataInicial, dataFinal }) => {
        const count = await Avaliacao.count({
          where: {
            agenteId,
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          },
        });
        return { dia, mes, ano, total: count };
      },
    );
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },

  async grupo(req, res) {
    const { grupoId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(
      async ({ dia, mes, ano, dataInicial, dataFinal }) => {
        const count = await Avaliacao.count({
          include: {
            model: Agente,
            as: 'agente',
            where: {
              grupoId,
            },
          },
          where: {
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          },
        });
        return { dia, mes, ano, total: count };
      },
    );
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },

  async grupos(req, res) {
    const { periodo } = req.headers;
    const [dataInicial, dataFinal] = getPeriodoCompleto(periodo);
    const grupos = await Grupo.findAll();
    const somatorio = grupos.map(async ({ id, nome }) => {
      const soma = await Avaliacao.count({
        include: {
          model: Agente,
          as: 'agente',
          where: {
            grupoId: id,
          },
        },
        where: {
          dataAvaliacao: {
            [Op.between]: [dataInicial, dataFinal],
          },
        },
      });
      return { nome, total: Number(soma) };
    });
    await Promise.all(somatorio).then(values => {
      return res.json(values);
    });
  },

  async agentes(req, res) {
    const { periodo } = req.headers;
    const [dataInicial, dataFinal] = getPeriodoCompleto(periodo);
    const agentes = await Agente.findAll();
    const somatorio = agentes.map(async ({ id, nome }) => {
      const soma = await Avaliacao.count({
        where: {
          agenteId: id,
          dataAvaliacao: {
            [Op.between]: [dataInicial, dataFinal],
          },
        },
      });
      return { nome, total: Number(soma) };
    });
    await Promise.all(somatorio).then(values => {
      return res.json(values);
    });
  },
};
