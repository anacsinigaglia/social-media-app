import {
  getPostsResolver,
  getPostResolver,
  createPostResolver,
  deletePostResolver,
  createCommentResolver,
  deleteCommentResolver,
  likePostResolver,
  newPostResolver,
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
    likePost: likePostResolver,
  },
  Subscription: {
    newPost: {
      subscribe: newPostResolver,
    },
  },
};

export default resolvers;
