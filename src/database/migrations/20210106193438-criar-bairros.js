'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bairros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      municipio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'municipios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('bairros');
  }
};
