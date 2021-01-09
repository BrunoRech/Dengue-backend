const { Model, DataTypes } = require('sequelize');

class Municipio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'municipios',
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
