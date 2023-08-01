import express from "express";
import { addUser, verifyUser, logIn } from "./user.service.js";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/user/register", verifyUser, addUser);

//? Log in user

router.get("/user/login", logIn);

//? authenticate User

router.get("/users", async (req, res) => {
  //! securing routess
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: "Something went wrong" });
  const token = authHeader.split(" ");
  const userToken = token[1];

  try {
    const payLoad = jwt.verify(userToken, "nischal1234ejhgegoe");
    const user = await User.findOne({ _id: payLoad._id });
    if (!user)
      return res
        .status(401)
        .send({ message: "You are not authorized to use this service" });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "You are not authorized to use this service" });
  }

  const users = await User.find();
  res.status(201).send(users);
});
export default router;
