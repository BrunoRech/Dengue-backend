const { Model, DataTypes } = require('sequelize');

class Rua extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'ruas',
      },
    );
  }

  static associate({ Bairro }) {
    this.belongsTo(Bairro, {
      foreignKey: 'bairroId',
      as: 'bairro',
    });
  }
}

module.exports = Rua;
