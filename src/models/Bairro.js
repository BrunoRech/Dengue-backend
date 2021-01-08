const { Model, DataTypes } = require('sequelize');

class Bairro extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING
    }, {
      sequelize
    });
  };

  static associate({Municipio, Rua}){
    this.belongsTo(Municipio, {
      foreignKey: 'municipio_id',
      as: 'municipio'
    });
    this.hasMany(Rua, {
      foreignKey: 'bairro_id',
      as: 'bairro'
    });
  };
};

module.exports = Bairro;
