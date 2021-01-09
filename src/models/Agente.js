const { Model, DataTypes } = require('sequelize');

class Agente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
        dataNascimento: DataTypes.DATE,
        dataIngresso: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate({ Grupo }) {
    this.belongsTo(Grupo, {
      foreignKey: 'grupoId',
      as: 'grupo',
    });
  }
}

module.exports = Agente;
