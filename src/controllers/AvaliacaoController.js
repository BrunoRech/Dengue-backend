const Avaliacao = require('../models/Avaliacao');

module.exports = {
  async index(req,res){
    const avaliacoes = await Avaliacao.findAll({
      include: {
        association: 'rua'
      }
    });
    return res.json(avaliacoes);
  },

  async store(req,res){
      const { morador, focos, horario, numero, rua_id, agente_id } = req.body;
      const avaliacao = await Avaliacao.create({ morador, focos, horario, numero, rua_id, agente_id });
      return res.json(avaliacao);
  }
}
