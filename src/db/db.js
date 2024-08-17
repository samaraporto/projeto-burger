import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: "./src/db/store.db",
  driver: sqlite3.Database,
});

const createTableUsers = async () => {
  const db = await dbPromise;
  await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
};

await createTableUsers();

export { dbPromise };
