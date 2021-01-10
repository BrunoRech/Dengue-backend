const Avaliacao = require('../../models/Avaliacao');
const Agente = require('../../models/Agente');
const Rua = require('../../models/Rua');

module.exports = {
  async index(req, res) {
    const avaliacoes = await Avaliacao.findAll({
      include: {
        association: 'rua',
      },
    });
    return res.json(avaliacoes);
  },

  async show(req, res) {
    const { avaliacaoId } = req.params;
    const agente = await Avaliacao.findByPk(avaliacaoId, {
      include: {
        association: 'agente',
      },
    });
    return res.json(agente);
  },

  async update(req, res) {
    const { avaliacaoId } = req.params;
    const { morador, focos, horario, numero, ruaId, agenteId } = req.body;
    if (ruaId) {
      const rua = await Rua.findByPk(ruaId);
      if (!rua) {
        return res.status(400).json({ mensagem: 'Rua inexistente' });
      }
    }
    if (agenteId) {
      const agente = await Agente.findByPk(agenteId);
      if (!agente) {
        return res.status(400).json({ mensagem: 'Agente inexistente' });
      }
    }
    const [, avaliacoes] = await Avaliacao.update(
      { morador, focos, horario, numero, ruaId, agenteId },
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
    const { morador, focos, horario, numero, ruaId, agenteId } = req.body;
    const rua = await Rua.findByPk(ruaId);
    if (!rua) {
      return res.status(400).json({ mensagem: 'Rua inexistente' });
    }
    const agente = await Agente.findByPk(agenteId);
    if (!agente) {
      return res.status(400).json({ mensagem: 'Agente inexistente' });
    }
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
