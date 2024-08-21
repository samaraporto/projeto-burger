import { dbPromise } from "../db/db.js";

const insertUser = async (name, email, password, phone_number) => {
  const db = await dbPromise;
  await db.run("INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?);", [
    name,
    email,
    password,
    phone_number
  ]);
};

const getUserByEmail = async (email) => {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE email = ?;", [email]);
  return user;
};

const getUserById = async (id) => {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE id = ?;", [id]);
  return user;
};

export { insertUser, getUserByEmail, getUserById };
