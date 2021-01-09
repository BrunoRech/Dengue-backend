module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ruas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bairro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bairros',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('ruas');
  },
};
