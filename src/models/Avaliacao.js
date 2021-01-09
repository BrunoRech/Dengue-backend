const { Model, DataTypes } = require('sequelize');

class Avaliacao extends Model {
  static init(sequelize) {
    super.init(
      {
        morador: DataTypes.STRING,
        focos: DataTypes.NUMBER,
        horario: DataTypes.STRING,
        numero: DataTypes.NUMBER,
      },
      {
        sequelize,
        tableName: 'avaliacoes',
      },
    );
  }

  static associate({ Agente, Rua }) {
    this.belongsTo(Rua, {
      foreignKey: 'rua_id',
      as: 'rua',
    });
    this.belongsTo(Agente, {
      foreignKey: 'agente_id',
      as: 'agente',
    });
  }
}

module.exports = Avaliacao;
