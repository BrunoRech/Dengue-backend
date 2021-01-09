const Coordenador = require('../models/Coordenador');

module.exports = {
  async index(req,res){
    const coordenadores = await Coordenador.findAll();
    return res.json(coordenadores);
  },

  async store(req,res){
      const { nome, senha, email, telefone } = req.body;
      const coordenador = await Coordenador.create({nome, senha, email, telefone});
      return res.json(coordenador);
  }
}
