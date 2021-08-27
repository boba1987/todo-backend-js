// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const todo = sequelizeClient.define('todo', {
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
        name: 'id'
      }
    });
  };

  return todo;
};
