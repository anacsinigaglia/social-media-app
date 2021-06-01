const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(id: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
