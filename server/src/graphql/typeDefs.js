import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const typeArray = fileLoader(path.join(__dirname, "**", "*.graphql"));

export default mergeTypes(typeArray);
