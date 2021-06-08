import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";

import User from "../models/User";
import { validateRegisterInput, validateLoginInput } from "../utils/validators";
import { generateToken } from "../utils/tokenGenerator";

export const loginResolver = async (_, { username, password }) => {
  const { errors, valid } = validateLoginInput(username, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }

  const token = generateToken(user);

  return {
    ...user._doc, //where our document is stored
    id: user._id,
    token,
  };
};

export const registerResolver = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  //pass thru all validations
  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  // verifies if the username is already taken
  const user = await User.findOne({ username });
  if (user) {
    throw new UserInputError("Username is taken", {
      errors: {
        // this part is a payload that will be displayed on frontend
        username: "This username is taken",
      },
    });
  }

  // hash password (to be impossible to read)
  password = await bcryptjs.hash(password, 12);

  // create new user
  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  });

  // save new user
  const res = await newUser.save();

  // create auth token
  const token = generateToken(res);

  //return the data
  return {
    ...res._doc, //where out document is stored
    id: res._id,
    token,
  };
};
