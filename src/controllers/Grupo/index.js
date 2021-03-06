const { Op } = require('sequelize');
const { Grupo } = require('../../models');

module.exports = {
  async index(req, res) {
    const { nome } = req.query;
    const grupos = await Grupo.findAll({
      where: nome
        ? {
            nome: { [Op.iLike]: `%${nome}%` },
          }
        : null,
    });
    return res.json(grupos);
  },

  async show(req, res) {
    const { grupoId } = req.params;
    const grupo = await Grupo.findByPk(grupoId);
    return res.json(grupo);
  },

  async update(req, res) {
    const { grupoId } = req.params;
    const { nome } = req.body;
    const [, grupos] = await Grupo.update(
      { nome },
      {
        returning: true,
        where: {
          id: grupoId,
        },
      },
    );
    return res.json(grupos[0]);
  },

  async destroy(req, res) {
    const { grupoId } = req.params;
    await Grupo.destroy({
      where: {
        id: grupoId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const { nome } = req.body;
    const grupo = await Grupo.create({ nome });
    return res.json(grupo);
  },
};
