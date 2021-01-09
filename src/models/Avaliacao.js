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
      foreignKey: 'ruaId',
      as: 'rua',
    });
    this.belongsTo(Agente, {
      foreignKey: 'agenteId',
      as: 'agente',
    });
  }
}

module.exports = Avaliacao;
