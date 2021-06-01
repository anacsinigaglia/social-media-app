const {
  getPostsResolver,
  getPostResolver,
  createPostResolver,
  deletePostResolver,
  createCommentResolver,
  deleteCommentResolver,
} = require('../../services/postsResolver');

module.exports = {
  Query: {
    getPosts: getPostsResolver,
    getPost: getPostResolver,
  },

  Mutation: {
    createPost: createPostResolver,
    deletePost: deletePostResolver,
    createComment: createCommentResolver,
    deleteComment: deleteCommentResolver,
  },
};
