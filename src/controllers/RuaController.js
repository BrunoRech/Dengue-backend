const Rua = require('../models/Rua');

module.exports = {
  async index(req, res) {
    const { id: bairroId } = req.params;
    const ruas = await Rua.findAll({
      where: {
        bairroId,
      },
      include: {
        association: 'bairro',
      },
    });
    return res.json(ruas);
  },

  async store(req, res) {
    const { nome } = req.body;
    const { id: bairroId } = req.params;
    const rua = await Rua.create({ nome, bairroId });
    return res.json(rua);
  },
};
