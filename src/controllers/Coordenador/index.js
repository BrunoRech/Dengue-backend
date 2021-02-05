const bcrypt = require('bcryptjs');
const { Coordenador } = require('../../models');

module.exports = {
  async index(req, res) {
    const coordenadores = await Coordenador.findAll();
    return res.json(coordenadores);
  },

  async show(req, res) {
    const { coordenadorId } = req.params;
    const coordenador = await Coordenador.findByPk(coordenadorId);
    return res.json(coordenador);
  },

  async update(req, res) {
    const { coordenadorId } = req.params;
    const { nome, senha, email, telefone, cpf } = req.body;
    const [, coordenadores] = await Coordenador.update(
      {
        nome,
        cpf,
        senha: senha ? await bcrypt.hash(senha, 8) : undefined,
        email,
        telefone,
      },
      {
        returning: true,
        where: {
          id: coordenadorId,
        },
      },
    );
    return res.json(coordenadores[0]);
  },

  async destroy(req, res) {
    const { coordenadorId } = req.params;
    await Coordenador.destroy({
      where: {
        id: coordenadorId,
      },
    });
    return res.send();
  },

  async store(req, res) {
    const { nome, senha, email, telefone, cpf } = req.body;
    const coordenador = await Coordenador.create({
      nome,
      cpf,
      senha: await bcrypt.hash(senha, 8),
      email,
      telefone,
    });
    return res.json(coordenador);
  },
};
