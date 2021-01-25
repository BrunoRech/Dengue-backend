const { Agente, Coordenador } = require('../../models');

module.exports = {
  async gerarSessaoAgente(req, res) {
    const { senha } = req.body;
    const agente = await Agente.findOne({ where: { senha } });
    const token = await agente.gerarToken();
    return res.json({ token });
  },

  async gerarSessaoCoordenador(req, res) {
    const { senha } = req.body;
    const coordenador = await Coordenador.findOne({ where: { senha } });
    const token = await coordenador.gerarToken();
    return res.json({ token });
  },
};
