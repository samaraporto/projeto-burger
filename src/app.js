import express from "express";
import { userRouter } from "./controller/user.controller.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(userRouter);

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
