const Agente = require('../models/Agente');

module.exports = {
  async index(req,res){
    const agentes = await Agente.findAll();
    return res.json(agentes);
  },

  async store(req,res){
    const {id: grupo_id} = req.params;
    const { nome, senha, email, telefone, data_nascimento, data_ingresso } = req.body;
    const agente = await Agente.create({grupo_id, nome, senha, email, telefone, data_nascimento, data_ingresso});
    return res.json(agente);
  }
}
