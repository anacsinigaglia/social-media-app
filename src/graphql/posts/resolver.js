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
  Post: {
    //parent = data that comes from getPosts
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  }, //any query or mutation that returns the Post must pass thru here, in this modifier
};

export default resolvers;
