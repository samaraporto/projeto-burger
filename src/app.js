import express from "express";
import { userRouter } from "./controller/user.controller.js";
import { burguerRouter } from "./controller/burguer.controller.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(userRouter);
app.use(burguerRouter);

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
