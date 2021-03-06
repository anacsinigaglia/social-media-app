import { AuthenticationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export default (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]; //[0] = 'Bearer' //[1] = token
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header token must be provided"); //no auth header
};
