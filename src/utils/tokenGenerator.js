import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export function generateToken(user) {
  return sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
