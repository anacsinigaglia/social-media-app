import { mergeResolvers } from "@graphql-tools/merge";

import postsResolver from "./posts/resolver";
import usersResolver from "./users/resolver";

export default mergeResolvers([postsResolver, usersResolver]);
