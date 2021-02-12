const { Op } = require('sequelize');
const { Municipio } = require('../../models');

module.exports = {
  async index(req, res) {
    const { nome } = req.query;
    const municipios = await Municipio.findAll({
      where: nome
        ? {
            nome: { [Op.iLike]: `%${nome}%` },
          }
        : null,
    });
    return res.json(municipios);
  },

  async show(req, res) {
    const { municipioId } = req.params;
    const municipio = await Municipio.findByPk(municipioId);
    return res.json(municipio);
  },

  async update(req, res) {
    const { municipioId } = req.params;
    const { nome } = req.body;
    const [, municipios] = await Municipio.update(
      { nome, municipioId },
      {
        returning: true,
        where: {
          id: municipioId,
        },
      },
    );
    return res.json(municipios[0]);
  },

  async destroy(req, res) {
    const { municipioId } = req.params;
    await Municipio.destroy({
      where: {
        id: municipioId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const { nome } = req.body;
    const municipio = await Municipio.create({ nome });
    return res.json(municipio);
  },
};
