const { Op } = require('sequelize');
const { Avaliacao, Bairro, Rua } = require('../../models');
const { getPeriodo } = require('../periodos');

module.exports = {
  async rua(req, res) {
    const { ruaId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(
      async ({ dia, mes, ano, dataInicial, dataFinal }) => {
        const avaliacoes = await Avaliacao.findAll({
          where: {
            ruaId,
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          },
        });

        return {
          dia,
          mes,
          ano,
          total: avaliacoes.reduce(
            (total, avaliacao) => total + avaliacao.focos,
            0,
          ),
        };
      },
    );
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },

  async bairro(req, res) {
    const { bairroId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(
      async ({ dia, mes, ano, dataInicial, dataFinal }) => {
        const avaliacoes = await Avaliacao.findAll({
          include: {
            model: Rua,
            as: 'rua',
            where: {
              bairroId,
            },
          },
          where: {
            '$rua.bairroId$': bairroId,
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          },
        });

        return {
          dia,
          mes,
          ano,
          total: avaliacoes.reduce(
            (total, avaliacao) => total + avaliacao.focos,
            0,
          ),
        };
      },
    );
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },

  async municipio(req, res) {
    const { municipioId } = req.params;
    const { periodo } = req.headers;
    const datas = getPeriodo(periodo);
    const promises = datas.map(
      async ({ dia, mes, ano, dataInicial, dataFinal }) => {
        const avaliacoes = await Avaliacao.findAll({
          include: {
            model: Rua,
            as: 'rua',
            include: {
              model: Bairro,
              as: 'bairro',
            },
          },
          where: {
            '$rua.bairro.municipioId$': municipioId,
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          },
        });

        return {
          dia,
          mes,
          ano,
          total: avaliacoes.reduce(
            (total, avaliacao) => total + avaliacao.focos,
            0,
          ),
        };
      },
    );
    await Promise.all(promises).then(values => {
      return res.json(values);
    });
  },
};
