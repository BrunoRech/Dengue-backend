const bcrypt = require('bcryptjs');
const { Agente } = require('../../models');

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
    const [, agentes] = await Agente.update(
      {
        grupoId,
        nome,
        senha: senha ? await bcrypt.hash(senha, 8) : undefined,
        email,
        telefone,
        dataNascimento,
        dataIngresso,
      },
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
    const agente = await Agente.create({
      grupoId,
      nome,
      senha: await bcrypt.hash(senha, 8),
      email,
      telefone,
      dataNascimento,
      dataIngresso,
    });
    return res.json(agente);
  },
};
