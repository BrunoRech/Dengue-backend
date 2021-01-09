const { Model, DataTypes } = require('sequelize');

class Agente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
        data_nascimento: DataTypes.DATE,
        data_ingresso: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate({ Grupo }) {
    this.belongsTo(Grupo, {
      foreignKey: 'grupo_id',
      as: 'grupo',
    });
  }
}

module.exports = Agente;
