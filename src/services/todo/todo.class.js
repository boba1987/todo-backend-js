const { Service } = require('feathers-sequelize');
const { NotFound } = require('@feathersjs/errors');

exports.Todo = class Todo extends Service {
  async find(params) {
    return super.find({
      query: {
        userId: params.user.id
      }
    });
  }

  async get(id, params) {
    const data = await super.get(id);
    if (data && params.user.id === data.userId) {
      return data;
    }

    return new NotFound('Not found');
  }
};
