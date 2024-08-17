import {
  createUser,
  loginUser,
  getUserProfile,
} from "../service/user.service.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/user/create-user", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await createUser(name, password);
    if (user == undefined) {
      return res.status(500).json({ message: "User already exists" });
    }
    return res.status(201).json({ message: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/user/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const loggedUser = await loginUser(name, password);
    return res.status(200).json(loggedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/user/profile", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ messeage: "Not authorized" });
    }
    const token = authorization.split(" ")[1];
    const loggedUserByToken = await getUserProfile(token);
    if (!loggedUserByToken) {
      return res.status(404).json(loggedUserByToken);
    }
    return res.status(200).json(loggedUserByToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { userRouter };
