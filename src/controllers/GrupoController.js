const Grupo = require('../models/Grupo');

module.exports = {
  async index(req, res) {
    const grupos = await Grupo.findAll();
    return res.json(grupos);
  },

  async store(req, res) {
    const { nome } = req.body;
    const grupo = await Grupo.create({ nome });
    return res.json(grupo);
  },
};
