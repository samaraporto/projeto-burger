import { insertBurguer, getBurguerById } from "../models/burguer.model.js";

const createBurguer = async (id, name, description, image_url, price) => {
  try {
    const burguer = await insertBurguer(
      id,
      name,
      description,
      image_url,
      price
    );
  } catch (error) {
    console.log(error.message);
  }
};

const getBurguer = async (id) => {
  try {
    const burguer = await getBurguerById(id);
    return burguer;
  } catch (error) {
    console.log(error.message);
  }
};

export { createBurguer, getBurguer };
