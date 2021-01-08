const Rua = require('../models/Rua');

module.exports = {
  async index(req,res){
    const { id : bairro_id } = req.params;
    const ruas = await Rua.findAll({
      where: {
        bairro_id
      },
      include: {
        association: 'bairro'
      }
    });
    return res.json(ruas);
  },

  async store(req,res){
      const { nome } = req.body;
      const { id : bairro_id } = req.params;
      const rua = await Rua.create({nome, bairro_id});
      return res.json(rua);
  }
}
