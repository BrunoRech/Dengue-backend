const { Model, DataTypes } = require('sequelize');

class Coordenador extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      senha: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'coordenadores'
    });
  };
};

module.exports = Coordenador;
