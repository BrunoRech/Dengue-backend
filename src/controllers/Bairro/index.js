const Bairro = require('../../models/Bairro');

module.exports = {
  async index(req, res) {
    //  const { id: municipioId } = req.params;
    const bairros = await Bairro.findAll(/* {
      where: {
        municipioId,
      },
      include: {
        association: 'municipio',
      },
    } */);
    return res.json(bairros);
  },

  async show(req, res) { },

  async update(req, res) { },

  async destroy(req, res) { },

  async store(req, res) {
    const { nome, municipioId } = req.body;
    const bairro = await Bairro.create({ nome, municipioId });
    return res.json(bairro);
  },
};
