import {
  getPostsResolver,
  getPostResolver,
  createPostResolver,
  deletePostResolver,
  createCommentResolver,
  deleteCommentResolver,
} from "../../services/postsResolver";

const resolvers = {
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

export default resolvers;
