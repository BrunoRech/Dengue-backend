const { Model, DataTypes } = require('sequelize');

class Bairro extends Model {
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

  static associate({ Municipio, Rua }) {
    this.belongsTo(Municipio, {
      foreignKey: 'municipioId',
      as: 'municipio',
    });
    this.hasMany(Rua, {
      foreignKey: 'bairroId',
      as: 'bairro',
    });
  }
}

module.exports = Bairro;
