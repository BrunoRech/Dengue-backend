const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Coordenador extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        cpf: DataTypes.BIGINT,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'coordenadores',
      },
    );
    Coordenador.prototype.validarSenha = async function (senha) {
      return bcrypt.compare(senha, this.senha);
    };
    Coordenador.prototype.gerarToken = async function () {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    };
  }
}

module.exports = Coordenador;
