const { Op } = require('sequelize');
const { getPeriodo, getPeriodoCompleto } = require('../periodos');
const { Avaliacao, Bairro, Rua, Municipio } = require('../../models');

module.exports = {
  async ruas(req, res) {
    const { periodo } = req.headers;
    const [dataInicial, dataFinal] = getPeriodoCompleto(periodo);
    const ruas = await Rua.findAll();
    const somatorio = ruas.map(async ({ id, nome }) => {
      const soma = await Avaliacao.sum('focos', {
        where: {
          ruaId: id,
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

  async bairros(req, res) {
    const { periodo } = req.headers;
    const [dataInicial, dataFinal] = getPeriodoCompleto(periodo);
    const bairros = await Bairro.findAll();
    const somatorio = bairros.map(async ({ id, nome }) => {
      const soma = await Avaliacao.sum('focos', {
        include: {
          model: Rua,
          as: 'rua',
          where: {
            bairroId: id,
          },
        },
        group: 'rua.id',
        where: {
          '$rua.bairroId$': id,
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

  async municipios(req, res) {
    const { periodo } = req.headers;
    const [dataInicial, dataFinal] = getPeriodoCompleto(periodo);
    const municipios = await Municipio.findAll();
    const somatorio = municipios.map(async ({ id, nome }) => {
      const soma = await Avaliacao.sum('focos', {
        include: {
          model: Rua,
          as: 'rua',
          include: {
            model: Bairro,
            as: 'bairro',
          },
        },
        group: ['rua.id', 'rua.bairro.id'],
        where: {
          '$rua.bairro.municipioId$': id,
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
