import express from "express";
import cors from "cors";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  auth,
} from "../controllers/userController.js";

import { authorisationJWT } from "../midlware/authorisationJWT.js";
import {
  createCours,
  getCours,
  updateCours,
  deleteCours,
} from "../controllers/coursController.js";
import { getCoursById } from "../controllers/coursController.js";
import {
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { createNote } from "../controllers/noteController.js";

import multer from "multer";
import path from "path";
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
route.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});
//*route de cours*/
route.post("/cours/create", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.json({ message: "file not existe" });
  } else {
    console.log("ok");
    res.status(201).json({ message: "bien ajouter" });
  }
});
route.get("/cours", getCours);
route.get("/cours/:id", getCoursById);
route.delete("/cours/:id", deleteCours);
route.put("/cours/:id", updateCours);
//*route de note*/
route.post("/notes/create", createNote);
route.get("/notes", getNotes);
route.get("/notes/:id", getNoteById);
route.delete("/notes/:id", deleteNote);
route.put("/notes/:id", updateNote);

/*route de user*/
route.get("/users", getUsers);
route.post("/create-user", authorisationJWT, createUser);
route.delete("/delete-user/:id", authorisationJWT, deleteUser);
route.put("/update-user/:id", authorisationJWT, updateUser);
route.get("/user/:id", getUserById);
route.post("/login", auth);
/* route de post*/

export default route;
