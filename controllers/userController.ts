import crypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({});
  res.json({ users });
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ user });
};
export const updateUser = async (req: Request, res: Response) => {
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
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "user deleted successfully" });
};
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const passwordHash = await crypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });
  res.json({ message: "user created successfully", user });
};
export const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const isPasswordValid = await crypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "invalid password" });
  }
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.json({ message: "authentication successful", token });
};
