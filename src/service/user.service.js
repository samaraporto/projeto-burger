import {
  insertUser,
  getUserByEmail,
  getUserById,
} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (name, email, password, phone_number) => {
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return "usuario ja existe!";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await insertUser(name, email, hashedPassword, phone_number);
    return "User created successfully";
  } catch (e) {
    return `Failed to insert user: ${error.message}`;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: "Invalid email or password" };
    }
    const verifyUser = await bcrypt.compare(password, user.password);
    if (!verifyUser) {
      return { error: "Invalid email or password" };
    }

    const token = jwt.sign({ id: user.id }, "/mtYKEtBeHAWl6CtRBmwA98HRk", {
      expiresIn: "10m",
    });
    return { token: token };
  } catch (e) {
    return { error: "Internal error" };
  }
};

const getUserProfile = async (token) => {
  try {
    const secret = "/mtYKEtBeHAWl6CtRBmwA98HRk";
    const { id } = jwt.verify(token, secret);
    const user = await getUserById(id);
    if (!user) {
      return { message: "User not found" };
    }
    return { user: user.name };
  } catch (error) {
    return { message: error.message };
  }
};

export { createUser, loginUser, getUserProfile };
