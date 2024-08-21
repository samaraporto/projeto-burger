import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: "./src/db/store.db",
  driver: sqlite3.Database,
});

const createTableUsers = async () => {
  try {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone_number TEXT
      )
    `);
    console.log("Tabela 'users' criada com sucesso.");
  } catch (error) {
    console.error("Erro ao criar a tabela 'users':", error.message);
  }
};

(async () => {
  await createTableUsers();
})();

export { dbPromise };
