import { dbPromise } from "../db/db.js";

const insertUser = async (name, password) => {
  const db = await dbPromise;
  await db.run("INSERT INTO users (name, password) VALUES (? ,?);", [
    name,
    password,
  ]);
};

const getUserByName = async (name) => {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE name = ?;", [name]);
  return user;
};

const getUserById = async (id) => {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE id = ?;", [id]);
  return user;
};

export { insertUser, getUserByName, getUserById };
