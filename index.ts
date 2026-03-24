import express from "express";
import route from "./routes/apiRoute.js";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/", route);
app.listen(5000, () => {
  console.log("serveur running on 5000");
});
