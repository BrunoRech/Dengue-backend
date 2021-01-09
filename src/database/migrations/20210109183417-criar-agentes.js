module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agentes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'grupos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_ingresso: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('agentes');
  },
};