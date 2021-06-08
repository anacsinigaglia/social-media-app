import { AuthenticationError, UserInputError } from "apollo-server-errors";
import Post from "../models/Post";
import checkAuth from "../utils/checkAuth";

export const getPostsResolver = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); //mongoose understands -1 to put the newests posts above
    return posts;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPostResolver = async (_, { id }) => {
  try {
    const post = await Post.findById(id);
    if (post) {
      return post;
    } else {
      throw new Error("Post not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const createPostResolver = async (_, { body }, context) => {
  const user = checkAuth(context);

  const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString(),
  });

  const post = await newPost.save();
  context.pubsub.publish("NEW_POST", { newPost: post });
  return post;
};

export const deletePostResolver = async (_, { id }, context) => {
  const user = checkAuth(context);

  try {
    const post = await Post.findById(id);
    if (post) {
      if (user.username === post.username) {
        await post.delete();
        return "Post deleted successfully";
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const createCommentResolver = async (_, { postId, body }, context) => {
  const { username } = checkAuth(context);

  if (body.trim() === "") {
    throw new UserInputError("Empty comment", {
      errors: { body: "Comment body must not be empty" },
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
  } else throw new UserInputError("Post not found");
};

export const deleteCommentResolver = async (
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
      throw new AuthenticationError("Action not allowed");
    }
  } else {
    throw new UserInputError("User not found");
  }
};

export const likePostResolver = async (_, { postId }, context) => {
  const { username } = checkAuth(context);

  const post = await Post.findById(postId);
  if (post) {
    if (post.likes.find((like) => like.username === username)) {
      post.likes = post.likes.filter((like) => like.username !== username);
    } else {
      post.likes.push({ username, createdAt: new Date().toISOString() });
    }
    await post.save();
    return post;
  } else throw new UserInputError("Post not found");
};

export const newPostResolver = async (_, __, { pubsub }) =>
  pubsub.asyncIterator("NEW_POST");
