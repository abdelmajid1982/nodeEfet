import express from "express";
import route from "./routes/apiRoute.js";

const app = express();

app.use("/", route);

app.listen(5000, () => {
  console.log("serveur running on 5000");
});
