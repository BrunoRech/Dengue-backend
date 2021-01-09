const Bairro = require('../models/Bairro');

module.exports = {
  async index(req, res) {
    const { id: municipioId } = req.params;
    const bairros = await Bairro.findAll({
      where: {
        municipioId,
      },
      include: {
        association: 'municipio',
      },
    });
    return res.json(bairros);
  },

  async store(req, res) {
    const { nome } = req.body;
    const { id: municipioId } = req.params;
    const bairro = await Bairro.create({ nome, municipioId });
    return res.json(bairro);
  },
};
