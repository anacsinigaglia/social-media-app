const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const { MONGODB } = require('./config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), //we destructure the request body and pass it on, then we just call the context in the third argument
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
