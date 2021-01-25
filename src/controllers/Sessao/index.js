const { Agente, Coordenador } = require('../../models');

module.exports = {
  async gerarSessaoAgente(req, res) {
    const { email } = req.body;
    const agente = await Agente.findOne({ where: { email } });
    const token = await agente.gerarToken();
    return res.json({ token });
  },

  async gerarSessaoCoordenador(req, res) {
    const { email } = req.body;
    const coordenador = await Coordenador.findOne({ where: { email } });
    const token = await coordenador.gerarToken();
    return res.json({ token });
  },
};
