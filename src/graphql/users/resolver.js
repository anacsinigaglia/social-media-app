import { loginResolver, registerResolver } from "../../services/usersResolver";

const resolvers = {
  Mutation: {
    login: loginResolver,
    register: registerResolver,
  },
};

export default resolvers;
