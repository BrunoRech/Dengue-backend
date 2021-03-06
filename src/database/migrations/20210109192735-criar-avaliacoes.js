module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('avaliacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ruaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ruas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      agenteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agentes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      morador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      focos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataAvaliacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('avaliacoes');
  },
};
