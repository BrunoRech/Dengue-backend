const { Model, DataTypes } = require('sequelize');

class Rua extends Model {
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
    this.belongsTo(Bairro, {
      foreignKey: 'bairro_id',
      as: 'bairro',
    });
  }
}

module.exports = Rua;
