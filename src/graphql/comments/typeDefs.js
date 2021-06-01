const { gql } = require('apollo-server');

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Mutation {
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;
