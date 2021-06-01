const { mergeResolvers } = require('@graphql-tools/merge');
const postsResolver = require('./posts/resolver');
const usersResolver = require('./users/resolver');

const resolvers = [postsResolver, usersResolver];

module.exports = mergeResolvers(resolvers);
