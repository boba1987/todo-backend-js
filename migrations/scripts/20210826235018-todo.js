'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todo', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },  
      done: Sequelize.DataTypes.BOOLEAN,
      title: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.STRING,
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('todo');
  }
};
