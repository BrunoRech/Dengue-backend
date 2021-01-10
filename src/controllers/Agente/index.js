const Agente = require('../../models/Agente');
const Grupo = require('../../models/Grupo');

module.exports = {
  async index(req, res) {
    const agentes = await Agente.findAll({
      include: {
        association: 'grupo',
      },
    });
    return res.json(agentes);
  },

  async show(req, res) {
    const { agenteId } = req.params;
    const agente = await Agente.findByPk(agenteId, {
      include: {
        association: 'grupo',
      },
    });
    return res.json(agente);
  },

  async update(req, res) {
    const { agenteId } = req.params;
    const {
      grupoId,
      nome,
      senha,
      email,
      telefone,
      dataNascimento,
      dataIngresso,
    } = req.body;
    if (grupoId) {
      const grupo = await Grupo.findByPk(grupoId);
      if (!grupo) {
        return res.status(400).json({ mensagem: 'Grupo inexistente' });
      }
    }
    const [, agentes] = await Agente.update(
      { grupoId, nome, senha, email, telefone, dataNascimento, dataIngresso },
      {
        returning: true,
        where: {
          id: agenteId,
        },
        include: {
          association: 'grupo',
        },
      },
    );
    return res.json(agentes[0]);
  },

  async destroy(req, res) {
    const { agenteId } = req.params;
    await Agente.destroy({
      where: {
        id: agenteId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const {
      grupoId,
      nome,
      senha,
      email,
      telefone,
      dataNascimento,
      dataIngresso,
    } = req.body;
    const grupo = await Grupo.findByPk(grupoId);
    if (!grupo) {
      return res.status(400).json({ mensagem: 'Grupo inexistente' });
    }
    const agente = await Agente.create({
      grupoId,
      nome,
      senha,
      email,
      telefone,
      dataNascimento,
      dataIngresso,
    });
    return res.json(agente);
  },
};
