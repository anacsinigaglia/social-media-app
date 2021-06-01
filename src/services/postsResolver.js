const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const Post = require('../models/Post');
const checkAuth = require('../utils/checkAuth');

module.exports.getPostsResolver = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); //mongoose understands -1 to put the newests posts above
    return posts;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPostResolver = async (_, { id }) => {
  try {
    const post = await Post.findById(id);
    if (post) {
      return post;
    } else {
      throw new Error('Post not found');
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.createPostResolver = async (_, { body }, context) => {
  const user = checkAuth(context);

  const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString(),
  });

  const post = await newPost.save();
  return post;
};

module.exports.deletePostResolver = async (_, { id }, context) => {
  const user = checkAuth(context);

  try {
    const post = await Post.findById(id);
    if (post) {
      if (user.username === post.username) {
        await post.delete();
        return 'Post deleted successfully';
      } else {
        throw new AuthenticationError('Action not allowed');
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.createCommentResolver = async (_, { postId, body }, context) => {
  const { username } = checkAuth(context);

  if (body.trim() === '') {
    throw new UserInputError('Empty comment', {
      errors: { body: 'Comment body must not be empty' },
    });
  }

  const post = await Post.findById(postId);
  if (post) {
    post.comments.unshift({
      body,
      username,
      createdAt: new Date().toISOString(),
    });
    await post.save();
    return post;
  } else throw new UserInputError('Post not found');
};

module.exports.deleteCommentResolver = async (
  _,
  { postId, commentId },
  context
) => {
  const { username } = checkAuth(context);
  const post = await Post.findById(postId);

  if (post) {
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (post.comments[commentIndex].username === username) {
      post.comments.splice(commentIndex, 1); //splice removes, I chose to remove 1
      await post.save();
      return post;
    } else {
      throw new AuthenticationError('Action not allowed');
    }
  } else {
    throw new UserInputError('User not found');
  }
};
