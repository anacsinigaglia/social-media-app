const { mergeTypeDefs } = require('@graphql-tools/merge');
const postsSchema = require('./posts/typedefs');
const usersSchema = require('./users/typedefs');

const types = [postsSchema, usersSchema];

module.exports = mergeTypeDefs(types);
