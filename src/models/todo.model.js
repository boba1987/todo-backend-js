// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const todo = sequelizeClient.define('todo', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    done: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: true
      }
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: ''
    },
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
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  todo.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    todo.belongsTo(models.users, {
      foreignKey: {
        name: 'userId'
      }
    });
  };

  return todo;
};
