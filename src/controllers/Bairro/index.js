const Bairro = require('../../models/Bairro');

module.exports = {
  async index(req, res) {
    const bairros = await Bairro.findAll({
      include: {
        association: 'municipio',
      },
    });
    return res.json(bairros);
  },

  async show(req, res) {
    const { bairroId } = req.params;
    const bairro = await Bairro.findByPk(bairroId, {
      include: {
        association: 'municipio',
      },
    });
    return res.json(bairro);
  },

  async update(req, res) {
    const { bairroId } = req.params;
    const { nome, municipioId } = req.body;
    const [, bairros] = await Bairro.update(
      { nome, municipioId },
      {
        returning: true,
        where: {
          id: bairroId,
        },
        include: {
          association: 'municipio',
        },
      },
    );
    return res.json(bairros[0]);
  },

  async destroy(req, res) {
    const { bairroId } = req.params;
    await Bairro.destroy({
      where: {
        id: bairroId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const { nome, municipioId } = req.body;
    const bairro = await Bairro.create({ nome, municipioId });
    return res.json(bairro);
  },
};
