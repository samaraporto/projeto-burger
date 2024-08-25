import { dbPromise } from "../db/db.js";

const insertBurguer = async (id, name, description, image_url, price) => {
  const db = await dbPromise;
  await db.run(
    "INSERT INTO burguers (id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?);",
    [id, name, description, image_url, price]
  );
};

const getBurguerById = async (id) => {
  const db = await dbPromise;
  const burguer = await db.get("SELECT * FROM burguers WHERE id = ?;", [id]);
  return burguer;
};

export { getBurguerById, insertBurguer };
