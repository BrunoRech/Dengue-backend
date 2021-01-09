const Agente = require('../models/Agente');

module.exports = {
  async index(req, res) {
    const agentes = await Agente.findAll();
    return res.json(agentes);
  },

  async store(req, res) {
    const { id: grupoId } = req.params;
    const {
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
      senha,
      email,
      telefone,
      dataNascimento,
      dataIngresso,
    });
    return res.json(agente);
  },
};
