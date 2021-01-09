const { Model, DataTypes } = require('sequelize');

class Municipio extends Model {
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

  static associate({ Bairro }) {
    this.hasMany(Bairro, {
      foreignKey: 'municipioId',
      as: 'municipio',
    });
  }
}

module.exports = Municipio;
