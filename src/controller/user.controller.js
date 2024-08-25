import {
  createUser,
  loginUser,
  getUserProfile,
  validadeToken,
} from "../service/user.service.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/user/create-user", async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    const result = await createUser(name, email, password, phone_number);
    if (result === "usuario ja existe!") {
      return res.status(400).json({ message: result });
    }
    return res.status(201).json({ message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await loginUser(email, password);
    if (loggedUser.token) {
      return res.status(200).json(loggedUser);
    }
    // Se não houver token, é um erro de login
    return res
      .status(401)
      .json({ message: loggedUser.error || "falha no login" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/user/profile", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const token = authorization.split(" ")[1];
    const loggedUserByToken = await getUserProfile(token);
    // Verifica se a resposta contém o perfil do usuário
    if (!loggedUserByToken) {
      return res.status(404).json(loggedUserByToken);
    }
    return res.status(200).json(loggedUserByToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/user/verify", async (req, res) => {
  try {
    const token = req.body;
    const validated = await validadeToken(token.token);
    if (validated) {
      return res.status(200).json({ token: "valid" });
    }
    return res.status(500).json({ token: "invalid" });
  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
});

export { userRouter };
