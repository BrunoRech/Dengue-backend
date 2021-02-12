const { Op } = require('sequelize');
const moment = require('moment');
const { Avaliacao } = require('../../models');

const findConfig = {
  attributes: ['id', 'morador', 'focos', 'numero', 'horario', 'dataAvaliacao'],
  include: [
    {
      attributes: ['id', 'nome'],
      association: 'rua',
      include: {
        association: 'bairro',
        attributes: ['id', 'nome'],
        include: {
          attributes: ['id', 'nome'],
          association: 'municipio',
        },
      },
    },
    {
      association: 'agente',
      attributes: [
        'id',
        'nome',
        'email',
        'telefone',
        'dataNascimento',
        'dataIngresso',
      ],
      include: {
        association: 'grupo',
      },
    },
  ],
};

module.exports = {
  async index(req, res) {
    const { dataAvaliacao } = req.query;
    const [dataInicial, dataFinal] = [
      moment(dataAvaliacao, 'DD-MM-YYYY').startOf('day').toString(),
      moment(dataAvaliacao, 'DD-MM-YYYY').endOf('day').toString(),
    ];
    const avaliacoes = await Avaliacao.findAll({
      ...findConfig,
      where: dataAvaliacao
        ? {
            dataAvaliacao: {
              [Op.between]: [dataInicial, dataFinal],
            },
          }
        : null,
    });
    return res.json(avaliacoes);
  },

  async show(req, res) {
    const { avaliacaoId } = req.params;
    const agente = await Avaliacao.findByPk(avaliacaoId, findConfig);
    return res.json(agente);
  },

  async update(req, res) {
    const { avaliacaoId } = req.params;
    const {
      morador,
      focos,
      horario,
      numero,
      ruaId,
      agenteId,
      dataAvaliacao,
    } = req.body;
    const [, avaliacoes] = await Avaliacao.update(
      { morador, focos, horario, numero, ruaId, dataAvaliacao, agenteId },
      {
        returning: true,
        where: {
          id: avaliacaoId,
        },
        include: {
          association: 'agente',
        },
      },
    );
    return res.json(avaliacoes[0]);
  },

  async destroy(req, res) {
    const { avaliacaoId } = req.params;
    await Avaliacao.destroy({
      where: {
        id: avaliacaoId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const {
      morador,
      focos,
      horario,
      numero,
      ruaId,
      agenteId,
      dataAvaliacao,
    } = req.body;
    const avaliacao = await Avaliacao.create({
      dataAvaliacao,
      morador,
      focos,
      horario,
      numero,
      ruaId,
      agenteId,
    });
    return res.json(avaliacao);
  },
};
