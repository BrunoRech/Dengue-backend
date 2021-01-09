const Bairro = require('../models/Bairro');

module.exports = {
  async index(req, res) {
    const { id: municipio_id } = req.params;
    const bairros = await Bairro.findAll({
      where: {
        municipio_id,
      },
      include: {
        association: 'municipio',
      },
    });
    return res.json(bairros);
  },

  async store(req, res) {
    const { nome } = req.body;
    const { id: municipio_id } = req.params;
    const bairro = await Bairro.create({ nome, municipio_id });
    return res.json(bairro);
  },
};
