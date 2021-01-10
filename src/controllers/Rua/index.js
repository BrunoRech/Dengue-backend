const Rua = require('../../models/Rua');
const Bairro = require('../../models/Bairro');

module.exports = {
  async index(req, res) {
    const ruas = await Rua.findAll({
      include: {
        association: 'bairro',
      },
    });
    return res.json(ruas);
  },

  async show(req, res) {
    const { ruaId } = req.params;
    const bairro = await Rua.findByPk(ruaId, {
      include: {
        association: 'bairro',
      },
    });
    return res.json(bairro);
  },

  async update(req, res) {
    const { ruaId } = req.params;
    const { nome, bairroId } = req.body;
    if (bairroId) {
      const bairro = await Bairro.findByPk(bairroId);
      if (!bairro) {
        return res.status(400).json({ mensagem: 'Bairro inexistente' });
      }
    }
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
    const bairro = await Bairro.findByPk(bairroId);
    if (!bairro) {
      return res.status(400).json({ mensagem: 'Bairro inexistente' });
    }
    const rua = await Rua.create({ nome, bairroId });
    return res.json(rua);
  },
};
