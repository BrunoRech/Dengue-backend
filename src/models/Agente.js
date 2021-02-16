const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Agente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
        dataNascimento: DataTypes.DATE,
        dataIngresso: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'agentes',
      },
    );
    Agente.prototype.validarSenha = async function (senha) {
      const res = await bcrypt.compare(senha, this.senha);
      return res;
    };
    Agente.prototype.gerarToken = async function () {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    };
  }

  static associate({ Grupo }) {
    this.belongsTo(Grupo, {
      foreignKey: 'grupoId',
      as: 'grupo',
    });
  }
}

module.exports = Agente;
