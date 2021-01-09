const Rua = require('../../models/Rua');

module.exports = {
  async index(req, res) {
    // const { id: bairroId } = req.params;
    const ruas = await Rua.findAll(/* {
      where: {
        bairroId,
      },
      include: {
        association: 'bairro',
      },
    } */);
    return res.json(ruas);
  },

  async show(req, res) { },

  async update(req, res) { },

  async destroy(req, res) { },

  async store(req, res) {
    const { nome, bairroId } = req.body;
    const rua = await Rua.create({ nome, bairroId });
    return res.json(rua);
  },
};
