const { Model, DataTypes } = require('sequelize');

class Grupo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate({ Agente }) {
    this.hasMany(Agente, {
      foreignKey: 'grupoId',
      as: 'grupo',
    });
  }
}

module.exports = Grupo;
