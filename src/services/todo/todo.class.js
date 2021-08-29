const { Service } = require('feathers-sequelize');

exports.Todo = class Todo extends Service {
  async find(params) {
    return super.find({
      query: {
        userId: params.user.id
      }
    });
  }
};
