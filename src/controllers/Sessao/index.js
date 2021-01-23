const Agente = require('../../models/Agente');

module.exports = {
  async store(req, res) {
    const token = await Agente.gerarToken();
    return res.json({ token });
  },
};
