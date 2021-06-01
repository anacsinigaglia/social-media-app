const {
  loginResolver,
  registerResolver,
} = require('../../services/usersResolver');

module.exports = {
  Mutation: {
    login: loginResolver,
    register: registerResolver,
  },
};
