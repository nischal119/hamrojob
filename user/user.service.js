import { User } from "./user.model.js";
import { userSchema } from "./user.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const verifyUser = async (req, res, next) => {
  let newUser = req.body;
  try {
    await userSchema.validateAsync(newUser);
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  let newUser = req.body;
  const user = await User.findOne({ email: newUser.email });
  console.log(user);
  if (user) return res.status(401).send("User already exists");
  newUser.password = await bcrypt.hash(newUser.password, 8);
  try {
    await User.create(newUser);
    res.status(201).send({ message: "User is registerd successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const logIn = async (req, res) => {
  const loginCredentials = req.body;
  const user = await User.findOne({ email: loginCredentials.email });
  // console.log(user.password);
  if (!user) return res.status(401).send({ message: "Invalid Credentials" });

  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  //! Remove password from response
  user.password = undefined;
  if (passwordMatch) return res.status(201).send(user);
  res.status(401).send({ message: "Invalid Credentials" });

  //? Generate access token
  const accessToken = jwt.sign({ _id: user._id }, "nischal1234ejhgegoe", {
    expiresIn: "1d",
  });
  console.log(accessToken);
};
