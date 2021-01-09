const Avaliacao = require('../../models/Avaliacao');

module.exports = {
  async index(req, res) {
    const avaliacoes = await Avaliacao.findAll({
      include: {
        association: 'rua',
      },
    });
    return res.json(avaliacoes);
  },

  async show(req, res) { },

  async update(req, res) { },

  async destroy(req, res) { },

  async store(req, res) {
    const { morador, focos, horario, numero, ruaId, agenteId } = req.body;
    const avaliacao = await Avaliacao.create({
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
