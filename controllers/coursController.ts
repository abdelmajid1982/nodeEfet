import { prisma } from "../lib/prisma.js";
export const createCours = async (req: Request, res: Response) => {
  const { title, description, teacherId } = req.body;

  const cours = await prisma.cours.create({
    data: {
      title,
      description,
      teacherId: parseInt(teacherId),
    },
  });
  res.json({ message: "cours created successfully" });
};
export const getCours = async (req: Request, res: Response) => {
  const cours = await prisma.cours.findMany();
  res.json({ cours });
};
export const getCoursById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cours = await prisma.cours.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ cours });
};
export const updateCours = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, teacherId } = req.body;
  await prisma.cours.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      teacherId: parseInt(teacherId),
    },
  });
  res.json({ message: "cours updated successfully" });
};
export const deleteCours = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.cours.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "cours deleted successfully" });
};
