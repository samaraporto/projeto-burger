import { getAllBurguers } from "../models/burguer.model.js";
import { createBurguer, getBurguer } from "../service/burguer.service.js";
import { Router } from "express";

const burguerRouter = Router();

burguerRouter.post("/burguer/insert", async (req, res) => {
  try {
    const { id, name, description, image_url, price } = req.body;
    const burguer = await createBurguer(
      id,
      name,
      description,
      image_url,
      price
    );
    if (!burguer) {
      return res.status(500).json({ error: "burguer já existe" });
    }
    return res.status(201).json({ message: "created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

burguerRouter.get("/burguer/recuperar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const burguer = await getBurguer(id);
    if (!burguer) {
      return res.status(500).json({ error: "burguer nn existe" });
    }
    return res.status(200).json(burguer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


burguerRouter.get("/burguers", async (req, res)=>{
  try{
    const burguers = await getAllBurguers()
    if(!burguers) return res.status(500).json({error: "deu errado pegar todos os burguers"})
    return res.status(200).json(burguers)
  }catch(e){
    return res.status(500).json({error: e})
  }
})

export { burguerRouter };
