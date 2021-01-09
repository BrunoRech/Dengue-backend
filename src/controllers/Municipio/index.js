const Municipio = require('../../models/Municipio');

module.exports = {
  async index(req, res) {
    const municipios = await Municipio.findAll();
    return res.json(municipios);
  },

  async show(req, res) { },

  async update(req, res) { },

  async destroy(req, res) { },

  async store(req, res) {
    const { nome } = req.body;
    const municipio = await Municipio.create({ nome });
    return res.json(municipio);
  },
};
