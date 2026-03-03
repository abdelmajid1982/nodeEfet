import express from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  auth,
} from "../controllers/userController.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { authorisationJWT } from "../midlware/authorisationJWT.js";

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});
/*route de user*/
route.get("/users", getUsers);
route.post("/create-user", authorisationJWT, createUser);
route.delete("/delete-user/:id", authorisationJWT, deleteUser);
route.put("/update-user/:id", authorisationJWT, updateUser);
route.get("/user/:id", getUserById);
route.post("/login", auth);
/* route de post*/
route.post("/post/create", createPost);
route.get("/posts", getPosts);
route.get("/post/:id", getPostById);
route.delete("/post/:id", deletePost);
route.put("/post/:id", updatePost);
export default route;
