import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { MONGODB } from "./config.js";

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }), //we destructure the request body and pass it on, then we just call the context in the third argument
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
