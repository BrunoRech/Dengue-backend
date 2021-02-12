const { Op } = require('sequelize');
const { Rua } = require('../../models');

const findConfig = {
  attributes: ['id', 'nome'],
  include: {
    association: 'bairro',
    attributes: ['id', 'nome'],
    include: {
      attributes: ['id', 'nome'],
      association: 'municipio',
    },
  },
};

module.exports = {
  async index(req, res) {
    const { nome } = req.query;
    const ruas = await Rua.findAll({
      ...findConfig,
      where: nome
        ? {
            nome: { [Op.iLike]: `%${nome}%` },
          }
        : null,
    });
    return res.json(ruas);
  },

  async show(req, res) {
    const { ruaId } = req.params;
    const rua = await Rua.findByPk(ruaId, findConfig);
    return res.json(rua);
  },

  async update(req, res) {
    const { ruaId } = req.params;
    const { nome, bairroId } = req.body;
    const [, ruas] = await Rua.update(
      { nome, bairroId },
      {
        returning: true,
        where: {
          id: ruaId,
        },
        include: {
          association: 'bairro',
        },
      },
    );
    return res.json(ruas[0]);
  },

  async destroy(req, res) {
    const { ruaId } = req.params;
    await Rua.destroy({
      where: {
        id: ruaId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const { nome, bairroId } = req.body;
    const rua = await Rua.create({ nome, bairroId });
    return res.json(rua);
  },
};
