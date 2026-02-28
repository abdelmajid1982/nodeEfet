import express from "express";
import { prisma } from "../lib/prisma.js";

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});
route.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});
route.post("/create-user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user created successfully" });
});
route.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "user deleted successfully" });
});
route.put("/update-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user updated successfully" });
});
route.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ user });
});
route.post("/post/create", async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  console.log(title, content, userId);
  const post = await prisma.post.create({
    data: {
      content: content,
    },
  });
  res.json({ message: "post created successfully" });
});
route.get("/posts", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
});
route.get("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ post });
});
route.delete("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "post deleted successfully" });
});
route.put("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  res.json({ message: "post updated successfully" });
});
export default route;
