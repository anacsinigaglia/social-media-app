const {
  createCommentResolver,
  deleteCommentResolver,
} = require('../../services/commentsResolver');

module.exports = {
  Mutation: {
    createComment: createCommentResolver,
    deleteComment: deleteCommentResolver,
  },
};
