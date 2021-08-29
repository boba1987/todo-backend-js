const { authenticate } = require('@feathersjs/authentication').hooks;
const { NotFound } = require('@feathersjs/errors');

const attachUserId = context => {
  context.data.userId = context.params.user.id;
  return context;
};

const belongsToUser = async context => {
  const todo = await context.service.get(context.id, context.params);
  if (todo.userId !== context.params.user.id) {
    throw new NotFound('Not found');
  }

  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [attachUserId],
    update: [attachUserId, belongsToUser],
    patch: [attachUserId, belongsToUser],
    remove: [belongsToUser]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
