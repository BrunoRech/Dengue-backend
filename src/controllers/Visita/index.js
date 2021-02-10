const { Op } = require('sequelize');

const { Agente, Avaliacao } = require('../../models');
const { getPeriodo } = require('../periodos');

module.exports = {
  async agentes(req, res) {
    const { agenteId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(async ({ dia, mes, dataInicial, dataFinal }) => {
      const count = await Avaliacao.count({
        where: {
          agenteId,
          dataAvaliacao: {
            [Op.between]: [dataInicial, dataFinal],
          },
        },
      });
      return { dia, mes, total: count };
    });
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },

  async grupos(req, res) {
    const { grupoId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(async ({ chave, dataInicial, dataFinal }) => {
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
      return { mes: chave, total: count };
    });
    await Promise.all(promises).then(v => {
      return res.json(v);
    });
  },
};
