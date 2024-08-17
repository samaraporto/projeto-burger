import {
  insertUser,
  getUserByName,
  getUserById,
} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (name, password) => {
  try {
    const user = await getUserByName(name);
    if (user == undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await insertUser(name, hashedPassword);
      return "user created successfully";
    }
  } catch (error) {
    return "Failed to insert user";
  }
};

const loginUser = async (name, password) => {
  try {
    const user = await getUserByName(name);
    const verifyUser = await bcrypt.compare(password, user.password);
    if (!user) {
      return { error: "invalid email or password" };
    } else if (!verifyUser) {
      return { error: "invalid email or password" };
    }
    if (verifyUser) {
      const token = jwt.sign({ id: user.id }, "/mtYKEtBeHAWl6CtRBmwA98HRk", {
        expiresIn: "10m",
      });
      return { token: token };
    }
  } catch (e) {
    return { error: "internal error" };
  }
};

const getUserProfile = async (token) => {
  try {
    const secret = "/mtYKEtBeHAWl6CtRBmwA98HRk";
    const { id } = jwt.verify(token, secret);
    const user = await getUserById(id);
    return { user: user.name };
  } catch (error) {
    return { message: error.message };
  }
};

export { createUser, loginUser, getUserProfile };
