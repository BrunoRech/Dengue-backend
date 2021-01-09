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
      foreignKey: 'grupo_id',
      as: 'grupo',
    });
  }
}

module.exports = Grupo;
