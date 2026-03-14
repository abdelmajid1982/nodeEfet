import express from "express";

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

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});
//*route de cours*/
route.post("/cours/create", createCours);
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
